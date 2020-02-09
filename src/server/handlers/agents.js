const { Agent, validate } = require('../models/agent')
const _ = require('lodash')

module.exports = {
  /**
   * Get agents
   */
  getAgents: async (req, res, next) => {
    try {
      // Get agents from the database
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
      // Catch exceptions and return a 500 error to the client
      res.status(500).send(ex.errors[field].message)
    }
  },

  /**
   * Get an agent
   */
  getAgent: async (req, res, next) => {
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
  },

  /**
   * Create an agent
   */
  createAgent: async (req, res) => {
    // Validate agent
    const { error } = validate.create(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Create agent
    let agent = new Agent(_.pick(req.body, ['name', 'email', 'brand', 'state', 'company', 'date', 'event']))

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
  },

  /**
   * Update an agent
   */
  updateAgent: async (req, res) => {
    // Validate agent
    const { error } = validate.update(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    try {
      // Update agent in database with request body keys if they exist
      const requestBody = {}
      if (req.body.name) {
        requestBody.name = {
          first: '',
          last: ''
        }
        if (req.body.name.first) requestBody.name.first = req.body.name.first
        if (req.body.name.last) requestBody.name.last = req.body.name.last
      }
      if (req.body.email) requestBody.email = req.body.email
      if (req.body.brand) requestBody.brand = req.body.brand
      if (req.body.state) requestBody.state = req.body.state
      if (req.body.company) requestBody.company = req.body.company
      if (req.body.date) requestBody.date = req.body.date
      if (req.body.event) requestBody.event = req.body.event

      const agent = await Agent.findByIdAndUpdate(req.params.id, requestBody, { new: true, runValidators: true, context: 'query' })

      // Return updated agent to client
      res.send(agent)
    }

    catch (ex) {
      // If agent does not exist, return 404 error to the client
      console.error(ex)
      return res.status(404).send('"id" was not found')
    }
  },

  /**
   * Delete an agent
   */
  deleteAgent: async (req, res) => {
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
  }
}
