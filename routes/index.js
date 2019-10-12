var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World' });
});

router.get('/today', (req, res) => {
  let today = new Date();
  res.render('show_date', {now: today});
});

module.exports = router;
