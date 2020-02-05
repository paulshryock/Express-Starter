const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const { Testimonial, validate } = require('../models/testimonial')
const debug = require('debug')('express-starter:testimonials')
const _ = require('lodash')

/**
 * Get testimonials
 */
router.get('/', async (req, res, next) => {
  try {
    // Get testimonials
    const testimonials = await Testimonial.find()

    // If no testimonials exist, return 404 error to the client
    if (Array.isArray(testimonials) && !testimonials.length) {
      return res.status(404).send('no testimonials found')
    }

    // Optionally sort testimonials by query paramater
    const sortBy = req.query.sortBy
    if (sortBy) testimonials.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

    // Return testimonials to the client
    res.send(testimonials)
  }

  catch (ex) {
    // If there's an exception, debug it
    debug(ex)
  }
})

/**
 * Get a testimonial
 */
router.get('/:id', async (req, res, next) => {
  try {
    // Get testimonial
    const testimonial = await Testimonial.find({
      _id: req.params.id
    })

    // Return testimonial to the client
    res.send(testimonial)
  }

  catch (ex) {
    // If testimonial does not exist, 404 error
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Create a testimonial
 */
router.post('/', auth, async (req, res) => {
  // Validate testimonial
  const { error } = validate.create(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create testimonial
  let testimonial = new Testimonial(_.pick(req.body, ['name', 'quote', 'date']))

  try {
    // Add testimonial to the database
    testimonial = await testimonial.save()

    // Return testimonial to the client
    res.send(testimonial)
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
 * Update a testimonial
 */
router.put('/:id', auth, async (req, res) => {
  // Validate testimonial
  const { error } = validate.update(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  try {
    // Update testimonial in database with request body keys if they exist
    const requestBody = {}
    if (req.body.name) {
      requestBody.name = {
        first: '',
        last: ''
      }
      if (req.body.name.first) requestBody.name.first = req.body.name.first
      if (req.body.name.last) requestBody.name.last = req.body.name.last
    }
    if (req.body.quote) requestBody.quote = req.body.quote
    if (req.body.date) requestBody.date = req.body.date

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, requestBody, { new: true })

    // Return updated testimonial to client
    res.send(testimonial)
  }

  catch (ex) {
    // If testimonial does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Delete a testimonial
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Remove testimonial from database, if it exists
    const testimonial = await Testimonial.findByIdAndRemove(req.params.id)

    // Return deleted testimonial to client
    res.send(testimonial)
  }

  catch (ex) {
    // If testimonial does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

module.exports = router
