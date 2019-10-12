var express = require('express');
var router = express.Router();

const articles = [
  {
    title: 'Article 1',
    id: 1
  },
  {
    title: 'Article 2',
    id: 2
  },
  {
    title: 'Article 3',
    id: 3
  }
]

// GET: Get articles
router.get('/', function(req, res, next) {
  res.send(articles);
});

// GET: Get an article
router.get('/:id', function(req, res, next) {
  res.send(articles.filter(article => article.id == req.params.id));
});

// POST: Create an article
// router.post('/', function (req, res) {
//   res.send('Create an article');
// });

// PUT: Update an article
// router.put('/:id', function (req, res) {
//   res.send('Update an article');
// });

// DELETE: Delete an article
// router.delete('/:id', function (req, res) {
//   res.send('Delete an article');
// });

module.exports = router;
