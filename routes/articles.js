const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

/**
 * Define Article model
 */
const Article = mongoose.model('Article', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true, lowercase: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  date: { type: Date, default: Date.now }
}))

/**
 * Validate an article
 */
function validate(article) {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .required(),
    author: Joi.string()
      .trim()
      .required(),
    status: Joi.string()
      .alphanum()
      .trim()
      .lowercase()
      .required()
      .valid('draft', 'approved', 'scheduled', 'published'),
    tags: Joi.array()
      .items(Joi.string()
        .alphanum()
        .trim()
        .lowercase()
      ),
    date: Joi.date()
  })

  return schema.validate(article)
}

/**
 * Get articles
 */
router.get('/', async (req, res, next) => {
  // TODO: Auth (if private)

  // Get articles
  const articles = await Article.find()

  // If no articles exist, return an error, or something else?

  // Optionally sort articles by query paramater
  const sortBy = req.query.sortBy
  if (sortBy) articles.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

  // Return articles to the client
  res.send(articles);
});

/**
 * Get an article
 */
router.get('/:id', async (req, res, next) => {
  // TODO: Auth (if private)

  // TODO: Fix, this is broken
  // TODO: Check if article exists and handle any errors
  const article = await Article.find(a => a._id === parseInt(req.params.id))
  if (!articleExists) return res.status(404).send('"id" was not found')

  // Return article to the client
  res.send(article)
});

/**
 * Create an article
 */
router.post('/', async (req, res) => {
  // TODO: Auth

  // Validate article
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create article
  let article = new Article({
    title: req.body.title,
    author: req.body.author,
    status: req.body.status,
    tags: req.body.tags,
    date: req.body.date
  })

  try {
    // Add article to the database
    article = await article.save()

    // Return article to the client
    res.send(article)
  }

  catch (ex) {
    // Return exception error messages to the client
    for (const field in ex.errors) {
      res.send( ex.errors[field].message )
    }
  }
});

/**
 * Update an article
 */
router.put('/:id', async (req, res) => {
  // TODO: Auth

  // Validate article
  const { error } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Update article in database, if it exists
  const article = await Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author,
    status: req.body.status,
    tags: req.body.tags,
    date: req.body.date
  }, { new: true })

  // If article does not exist, 404 error
  if (!article) return res.status(404).send('"id" was not found')

  // Return updated article to client
  res.send(article)
});

/**
 * Delete an article
 */
router.delete('/:id', async (req, res) => {
  // TODO: Auth

  // Remove article from database, if it exists
  const article = await Article.findByIdAndRemove(req.params.id)

  // If article does not exist, return 404 error to the client
  if (!article) return res.status(404).send('"id" was not found')

  // Return deleted article to client
  res.send(article)
});

module.exports = router;
