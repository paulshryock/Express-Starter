const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
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
  // Check if article exists
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) res.status(404).send('"id" was not found')
  // Return article to the client
  res.send(article)
});

/**
 * Create an article
 */
router.post('/', function (req, res) {
  // Validate article
  const { error } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Create article
  const article = {
    // TODO: Set id in database
    id: articles.length + 1,
    title: req.body.title
  }

  // Add article to the database
  // TODO: Replace this with real database code
  articles.push(article)

  // Return article to the client
  res.send(article)
});

/**
 * Update an article
 */
router.put('/:id', function (req, res) {
  // Check if article exists
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) res.status(404).send('"id" was not found')

  // Validate article
  const { error } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Update article
  article.title = req.body.title

  // Update article in the database
  // TODO: Replace this with real database code
  articles[article.id - 1] = article

  // Return updated article to client
  res.send(article)
});

/**
 * Delete an article
 */
// router.delete('/:id', function (req, res) {
//   res.send('Delete an article');
// });

function validate(article) {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  return schema.validate(article)
}

module.exports = router;
