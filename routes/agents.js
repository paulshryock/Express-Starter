const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const debug = require('debug')('express-starter:agents')

/**
 * Define Agent model
 */
const Agent = mongoose.model('Agent', new mongoose.Schema({
  name: {
    first: { type: String, trim: true, required: true },
    last: { type: String, trim: true, required: true }
  },
  email: { type: String, trim: true, required: true },
  brand: { type: String, trim: true },
  state: { type: String, trim: true },
  company: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  event: { type: String, trim: true }
}))

const validate = {
  /**
   * Validate an agent to create
   */
  create: function (agent) {
    const schema = Joi.object({
      name: Joi.object({
        first: Joi.string().trim().required(),
        last: Joi.string().trim().required()
      }),
      email: Joi.string().trim().required().email(),
      brand: Joi.string().trim(),
      state: Joi.string().trim(),
      company: Joi.string().trim(),
      date: Joi.date(),
      event: Joi.string().trim()
    })

    return schema.validate(agent)
  },
  /**
   * Validate an agent to update
   */
  update: function (agent) {
    const schema = Joi.object({
      name: Joi.object({
        first: Joi.string().trim(),
        last: Joi.string().trim()
      }),
      email: Joi.string().trim().email(),
      brand: Joi.string().trim(),
      state: Joi.string().trim(),
      company: Joi.string().trim(),
      date: Joi.date(),
      event: Joi.string().trim()
    }).or('name.first', 'name.last', 'email', 'brand', 'state', 'company', 'date', 'event')

    return schema.validate(agent)
  }
}

/**
 * Get agents
 */
router.get('/', async (req, res, next) => {
  // TODO: Auth (if private)

  try {
    // Get agents
    const agents = await Agent.find()

    // If no agents exist, return 404 error to the client
    if (Array.isArray(agents) && !agents.length) {
      return res.status(404).send('no agents found')
    }

    // Optionally sort agents by query paramater
    const sortBy = req.query.sortBy
    if (sortBy) agents.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

    // Return agents to the client
    res.send(agents)
  }

  catch (ex) {
    // If there's an exception, debug it
    debug(ex)
  }
})

/**
 * Get an agent
 */
router.get('/:id', async (req, res, next) => {
  // TODO: Auth (if private)

  try {
    // Get agent
    const agent = await Agent.find({
      _id: req.params.id
    })

    // Return agent to the client
    res.send(agent)
  }

  catch (ex) {
    // If agent does not exist, 404 error
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Create an agent
 */
router.post('/', async (req, res) => {
  // TODO: Auth

  // Validate agent
  const { error } = validate.create(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create agent
  let agent = new Agent({
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    },
    email: req.body.email,
    brand: req.body.brand,
    state: req.body.state,
    company: req.body.company,
    date: req.body.date,
    event: req.body.event
  })

  try {
    // Add agent to the database
    agent = await agent.save()

    // Return agent to the client
    res.send(agent)
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
 * Update an agent
 */
router.put('/:id', async (req, res) => {
  // TODO: Auth

  // Validate agent
  const { error } = validate.update(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  try {
    // Update agent in database with request body keys if they exist
    const requestBody = {}
    if (req.body.name.first) requestBody.name.first = req.body.name.first
    if (req.body.name.last) requestBody.name.last = req.body.name.last
    if (req.body.email) requestBody.email = req.body.email
    if (req.body.brand) requestBody.brand = req.body.brand
    if (req.body.state) requestBody.state = req.body.state
    if (req.body.company) requestBody.company = req.body.company
    if (req.body.date) requestBody.date = req.body.date
    if (req.body.event) requestBody.event = req.body.event

    const agent = await Agent.findByIdAndUpdate(req.params.id, requestBody, { new: true })

    // Return updated agent to client
    res.send(agent)
  }

  catch (ex) {
    // If agent does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Delete an agent
 */
router.delete('/:id', async (req, res) => {
  // TODO: Auth

  try {
    // Remove agent from database, if it exists
    const agent = await Agent.findByIdAndRemove(req.params.id)

    // Return deleted agent to client
    res.send(agent)
  }

  catch (ex) {
    // If agent does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

module.exports = router
