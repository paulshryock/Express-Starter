const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
const articles = [
  {
    id: 1,
    title: 'Hello World'
  },
  {
    id: 2,
    title: 'All Around the World'
  },
  {
    id: 3,
    title: 'The World is a Vampire'
  }
]

/**
 * Get articles
 */
router.get('/', function(req, res, next) {
  // Sort articles
  const sortBy = req.query.sortBy
  if (sortBy) articles.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

  // Return articles to the client
  res.send(articles);
});

/**
 * Get an article
 */
router.get('/:id', function(req, res, next) {
  // Check if article exists
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).send('"id" was not found')
  // Return article to the client
  res.send(article)
});

/**
 * Create an article
 */
router.post('/', function (req, res) {
  // Auth

  // Validate article
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

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
  // Auth

  // Check if article exists
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).send('"id" was not found')

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
router.delete('/:id', function (req, res) {
  // Auth

  // Check if article exists
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).send('"id" was not found')

  // Delete article from the database
  // TODO: Replace this with real database code
  const index = articles.indexOf(article)
  articles.splice(index, 1)

  // Return deleted article to client
  res.send(article)
});

function validate(article) {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  return schema.validate(article)
}

module.exports = router;
