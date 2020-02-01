const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

const Article = new mongoose.model('Article', new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}))

/**
 * Get articles
 */
router.get('/', async function(req, res, next) {
  // Get articles
  const articles = await Article.find()

  // Sort articles
  const sortBy = req.query.sortBy
  if (sortBy) articles.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

  // Return articles to the client
  res.send(articles);
});

/**
 * Get an article
 */
router.get('/:id', async function(req, res, next) {
  // Check if article exists
  const article = await Article.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).send('"id" was not found')
  // Return article to the client
  res.send(article)
});

/**
 * Create an article
 */
router.post('/', async function (req, res) {
  // Auth

  // Validate article
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create article
  let article = new Article({ title: req.body.title })

  // Add article to the database
  article = await article.save()

  // Return article to the client
  res.send(article)
});

/**
 * Update an article
 */
router.put('/:id', async function (req, res) {
  // Auth

  const article = await Article.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })

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
