var express = require('express');
var router = express.Router();

// GET: Get articles
router.get('/', function(req, res, next) {
  res.send('Get articles');
});

// POST: Create an article
router.post('/', function (req, res) {
  res.send('Create an article');
});

// PUT: Update an article
router.put('/articles', function (req, res) {
  res.send('Update an article');
});

// DELETE: Delete an article
router.delete('/articles', function (req, res) {
  res.send('Delete an article');
});

module.exports = router;
