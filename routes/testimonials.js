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
  // Check if testimonial already exists
  const testimonialExists = testimonials.find(p => p.id === parseInt(req.body.id))

  if (testimonialExists) {
    res.status(400).send('"id" already exists')
    return
  }

  // Validate testimonial
  const schema = Joi.object({
    id: Joi.number()
      .required(),

    title: Joi.string()
      .required()
  })

  const { error, value } = schema.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Define testimonial
  const testimonial = {
    id: req.body.id,
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
// router.put('/testimonials', function (req, res) {
//   res.send('Update a testimonial');
// });

/**
 * Delete a testimonial
 */
// router.delete('/testimonials', function (req, res) {
//   res.send('Delete a testimonial');
// });

module.exports = router;
