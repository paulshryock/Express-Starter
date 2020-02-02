const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const debug = require('debug')('express-starter:projects')

/**
 * Define Project model
 */
const Project = mongoose.model('Project', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  client: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true, lowercase: true },
  date: { type: Date, default: Date.now }
}))

const validate = {
  /**
   * Validate a project to create
   */
  create: function (project) {
    const schema = Joi.object({
      title: Joi.string()
        .trim()
        .required(),
      client: Joi.string()
        .trim()
        .required(),
      status: Joi.string()
        .alphanum()
        .trim()
        .lowercase()
        .required()
        .valid('draft', 'approved', 'scheduled', 'published'),
      date: Joi.date()
    })

    return schema.validate(project)
  },
  /**
   * Validate a project to update
   */
  update: function (project) {
    const schema = Joi.object({
      title: Joi.string()
        .trim(),
      client: Joi.string()
        .trim(),
      status: Joi.string()
        .alphanum()
        .trim()
        .lowercase()
        .valid('draft', 'approved', 'scheduled', 'published'),
      date: Joi.date()
    }).or('title', 'client', 'status', 'date')

    return schema.validate(project)
  }
}

/**
 * Get projects
 */
router.get('/', async (req, res, next) => {
  // TODO: Auth (if private)

  try {
    // Get projects
    const projects = await Project.find()

    // If no projects exist, return 404 error to the client
    if (Array.isArray(projects) && !projects.length) {
      return res.status(404).send('no projects found')
    }

    // Optionally sort projects by query paramater
    const sortBy = req.query.sortBy
    if (sortBy) projects.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

    // Return projects to the client
    res.send(projects)
  }

  catch (ex) {
    // If there's an exception, debug it
    debug(ex)
  }
})

/**
 * Get a project
 */
router.get('/:id', async (req, res, next) => {
  // TODO: Auth (if private)

  try {
    // Get project
    const project = await Project.find({
      _id: req.params.id
    })

    // Return project to the client
    res.send(project)
  }

  catch (ex) {
    // If project does not exist, 404 error
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Create a project
 */
router.post('/', async (req, res) => {
  // TODO: Auth

  // Validate project
  const { error } = validate.create(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create project
  let project = new Project({
    title: req.body.title,
    client: req.body.client,
    status: req.body.status,
    date: req.body.date
  })

  try {
    // Add project to the database
    project = await project.save()

    // Return project to the client
    res.send(project)
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
 * Update a project
 */
router.put('/:id', async (req, res) => {
  // TODO: Auth

  // Validate project
  const { error } = validate.update(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  try {
    // Update project in database with request body keys if they exist
    const requestBody = {}
    if (req.body.title) requestBody.title = req.body.title
    if (req.body.client) requestBody.client = req.body.client
    if (req.body.status) requestBody.status = req.body.status
    if (req.body.date) requestBody.date = req.body.date

    const project = await Project.findByIdAndUpdate(req.params.id, requestBody, { new: true })

    // Return updated project to client
    res.send(project)
  }

  catch (ex) {
    // If project does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

/**
 * Delete a project
 */
router.delete('/:id', async (req, res) => {
  // TODO: Auth

  try {
    // Remove project from database, if it exists
    const project = await Project.findByIdAndRemove(req.params.id)

    // Return deleted project to client
    res.send(project)
  }

  catch (ex) {
    // If project does not exist, return 404 error to the client
    return res.status(404).send('"id" was not found')
  }
})

module.exports = router
