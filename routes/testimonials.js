const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

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
  if (!testimonial) res.status(404).send('The testimonial with the given ID was not found.')

  // Return testimonial to the client
  res.send(testimonial)
});

/**
 * Create a testimonial
 */
// router.post('/', function (req, res) {
//   res.send('Create a testimonial');
// });

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
