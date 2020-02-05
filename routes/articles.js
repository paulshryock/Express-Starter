const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express')
const router = express.Router()
const { Article, validate } = require('../models/article')
const debug = require('debug')('express-starter:articles')
const _ = require('lodash')

/**
 * Get articles
 */
router.get('/', async (req, res, next) => {
  try {
    // Get articles
    const articles = await Article.find()

    // If no articles exist, return 404 error to the client
    if (Array.isArray(articles) && !articles.length) {
      return res.status(404).send('no articles found')
    }

    // Optionally sort articles by query paramater
    const sortBy = req.query.sortBy
    if (sortBy) articles.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

    // Return articles to the client
    res.send(articles)
  }

  catch (ex) {
    // If there's an exception, debug it
    debug(ex)
  }
})

/**
 * Get an article
 */
router.get('/:id', async (req, res, next) => {
  try {
    // Get article
    const article = await Article.find({
      _id: req.params.id
    })

    // Return article to the client
    res.send(article)
  }

  catch (ex) {
    // If article does not exist, 404 error
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Create an article
 */
router.post('/', [auth, admin], async (req, res) => {
  // Validate article
  const { error } = validate.create(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create article
  let article = new Article(_.pick(req.body, ['title', 'author', 'status', 'tags', 'date']))

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
    return
  }
})

/**
 * Update an article
 */
router.put('/:id', [auth, admin], async (req, res) => {
  // Validate article
  const { error } = validate.update(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  try {
    // Update article in database with request body keys if they exist
    const requestBody = {}
    if (req.body.title) requestBody.title = req.body.title
    if (req.body.author) requestBody.author = req.body.author
    if (req.body.status) requestBody.status = req.body.status
    if (req.body.tags) requestBody.tags = req.body.tags
    if (req.body.date) requestBody.date = req.body.date

    const article = await Article.findByIdAndUpdate(req.params.id, requestBody, { new: true })

    // Return updated article to client
    res.send(article)
  }

  catch (ex) {
    // If article does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Delete an article
 */
router.delete('/:id', [auth, admin], async (req, res) => {

  try {
    // Remove article from database, if it exists
    const article = await Article.findByIdAndRemove(req.params.id)

    // Return deleted article to client
    res.send(article)
  }

  catch (ex) {
    // If article does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

module.exports = router
