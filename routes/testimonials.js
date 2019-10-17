const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
const testimonials = [
  {
    id: 1,
    title: 'Testimonial 1'
  },
  {
    id: 2,
    title: 'Testimonial 2'
  },
  {
    id: 3,
    title: 'Testimonial 3'
  }
]

/**
 * Get testimonials
 */
router.get('/', function(req, res, next) {
  // Return testimonials to the client
  res.send(testimonials);
});

/**
 * Get a testimonial
 */
router.get('/:id', function(req, res, next) {
  const testimonial = testimonials.find(t => t.id === parseInt(req.params.id));
  if (!testimonial) res.status(404).send('"id" was not found')

  // Return testimonial to the client
  res.send(testimonial)
});


/**
 * Create a testimonial
 */
router.post('/', function (req, res) {
  // Validate testimonial
  const { error } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

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
  // Check if testimonial exists
  const testimonial = testimonials.find(a => a.id === parseInt(req.params.id));
  if (!testimonial) res.status(404).send('"id" was not found')

  // Validate testimonial
  const { error } = validateArticle(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

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
// router.delete('/testimonials', function (req, res) {
//   res.send('Delete a testimonial');
// });

function validate(testimonial) {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  return schema.validate(testimonial)
}

module.exports = router;
