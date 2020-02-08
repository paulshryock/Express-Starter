var express = require('express');
var router = express.Router();
var config = require('config');

// Get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: config.get('app.title') });
});

module.exports = router;
