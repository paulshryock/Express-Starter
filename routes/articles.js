const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

const articles = [
  {
    id: 1,
    title: 'Article 1'
  },
  {
    id: 2,
    title: 'Article 2'
  },
  {
    id: 3,
    title: 'Article 3'
  }
]

/**
 * Get articles
 */
router.get('/', function(req, res, next) {
  // Return articles to the client
  res.send(articles);
});

/**
 * Get an article
 */
router.get('/:id', function(req, res, next) {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) res.status(404).send('The article with the given ID was not found.')

  // Return article to the client
  res.send(article)
});

/**
 * Create an article
 */
// router.post('/', function (req, res) {
//   res.send('Create an article');
// });

/**
 * Update an article
 */
// router.put('/:id', function (req, res) {
//   res.send('Update an article');
// });

/**
 * Delete an article
 */
// router.delete('/:id', function (req, res) {
//   res.send('Delete an article');
// });

module.exports = router;
