var express = require('express');
var router = express.Router();

const testimonials = [
  {
    title: 'Testimonial 1',
    id: 1
  },
  {
    title: 'Testimonial 2',
    id: 2
  },
  {
    title: 'Testimonial 3',
    id: 3
  }
]

// GET: Get testimonials
router.get('/', function(req, res, next) {
  res.send(testimonials);
});

// GET: Get a testimonial
router.get('/:id', function(req, res, next) {
  res.send(testimonials.filter(testimonial => testimonial.id == req.params.id));
});

// POST: Create a testimonial
// router.post('/', function (req, res) {
//   res.send('Create a testimonial');
// });

// PUT: Update a testimonial
// router.put('/testimonials', function (req, res) {
//   res.send('Update a testimonial');
// });

// DELETE: Delete a testimonial
// router.delete('/testimonials', function (req, res) {
//   res.send('Delete a testimonial');
// });

module.exports = router;
