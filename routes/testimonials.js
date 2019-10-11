var express = require('express');
var router = express.Router();

// GET: Get testimonials
router.get('/', function(req, res, next) {
  res.send('Get testimonials');
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
