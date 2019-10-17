const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
const testimonials = [
  {
    id: 1,
    title: 'Hello World'
  },
  {
    id: 2,
    title: 'All Around the World'
  },
  {
    id: 3,
    title: 'The World is a Vampire'
  }
]

/**
 * Get testimonials
 */
router.get('/', function(req, res, next) {
  // Sort testimonials
  const sortBy = req.query.sortBy
  if (sortBy) testimonials.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

  // Return testimonials to the client
  res.send(testimonials);
});

/**
 * Get a testimonial
 */
router.get('/:id', function(req, res, next) {
  // Check if testimonial exists
  const testimonial = testimonials.find(t => t.id === parseInt(req.params.id));
  if (!testimonial) return res.status(404).send('"id" was not found')

  // Return testimonial to the client
  res.send(testimonial)
});


/**
 * Create a testimonial
 */
router.post('/', function (req, res) {
  // Auth

  // Validate testimonial
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create testimonial
  const testimonial = {
    // TODO: Set id in database
    id: testimonials.length + 1,
    title: req.body.title
  }

  // Add testimonial to the database
  // TODO: Replace this with real database code
  testimonials.push(testimonial)

  // Return testimonial to the client
  res.send(testimonial)
});

/**
 * Update a testimonial
 */
router.put('/:id', function (req, res) {
  // Auth

  // Check if testimonial exists
  const testimonial = testimonials.find(a => a.id === parseInt(req.params.id));
  if (!testimonial) return res.status(404).send('"id" was not found')

  // Validate testimonial
  const { error } = validateArticle(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Update testimonial
  testimonial.title = req.body.title

  // Update testimonial in the database
  // TODO: Replace this with real database code
  testimonials[testimonial.id - 1] = testimonial

  // Return updated testimonial to client
  res.send(testimonial)
});

/**
 * Delete a testimonial
 */
router.delete('/:id', function (req, res) {
  // Auth

  // Check if testimonial exists
  const testimonial = testimonials.find(a => a.id === parseInt(req.params.id));
  if (!testimonial) return res.status(404).send('"id" was not found')

  // Delete testimonial from the database
  // TODO: Replace this with real database code
  const index = testimonials.indexOf(testimonial)
  testimonials.splice(index, 1)

  // Return deleted testimonial to client
  res.send(testimonial)
});

function validate(testimonial) {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  return schema.validate(testimonial)
}

module.exports = router;
