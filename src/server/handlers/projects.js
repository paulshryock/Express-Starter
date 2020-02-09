const { Project, validate } = require('../models/project')
const debug = require('debug')('express-starter:projects')
const _ = require('lodash')

module.exports = {
  /**
   * Get projects
   */
  getProjects: async (req, res, next) => {
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
  },

  /**
   * Get a project
   */
  getProject: async (req, res, next) => {
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
  },

  /**
   * Create a project
   */
  createProject: async (req, res) => {
    // Validate project
    const { error } = validate.create(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Create project
    let project = new Project(_.pick(req.body, ['title', 'client', 'status', 'date']))

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
  },

  /**
   * Update a project
   */
  updateProject: async (req, res) => {
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
  },

  /**
   * Delete a project
   */
  deleteProject: async (req, res) => {
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
  }
}
