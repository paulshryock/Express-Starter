const { User, validate } = require('../models/user')
const debug = require('debug')('express-starter:users')
const _ = require('lodash')
const bcrypt = require('bcrypt')

module.exports = {
  /**
   * Get users
   */
  getUsers: async (req, res, next) => {
    try {
      // Get users
      const users = await User.find()

      // If no users exist, return 404 error to the client
      if (Array.isArray(users) && !users.length) {
        return res.status(404).send('no users found')
      }

      // Optionally sort users by query paramater
      const sortBy = req.query.sortBy
      if (sortBy) users.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

      // Return users to the client
      res.send(users)
    }

    catch (ex) {
      // If there's an exception, debug it
      debug(ex)
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async (req, res) => {
    // Get current user
    const user = await User.findById(req.user._id).select('-password')
    
    // Return user to the client
    res.send(user)
  },

  /**
   * Update current user
   */
  updateCurrentUser: async (req, res) => {
    {
      // Validate user
      const { error } = validate.update(req.body)
      if (error) return res.status(400).send(error.details[0].message)
    }
    
    {
      // Validate password
      const { error } = validate.password(req.body)
      if (error) return res.status(400).send(error.details[0].message)
    }

    try {

      // Update user in database with request body keys if they exist
      const requestBody = {}
      if (req.body.email) requestBody.email = req.body.email
      if (req.body.password) {
        requestBody.password = req.body.password
        // Hash password
        const salt = await bcrypt.genSalt(10)
        requestBody.password = await bcrypt.hash(requestBody.password, salt)
      }
      if (req.body.role) requestBody.role = req.body.role

      const user = await User.findByIdAndUpdate(req.user._id, requestBody, { new: true })

      // Return updated user to the client
      res.send(_.pick(user, ['_id', 'email', 'role']))
    }

    catch (ex) {
      // If user does not exist, return 404 error to the client
      return res.status(404).send('"id" was not found')
    }
  },

  /**
   * Get a user
   */
  getUser: async (req, res, next) => {
    try {
      // Get user
      const user = await User.find({
        _id: req.params.id
      })

      // Return user to the client
      res.send(user)
    }

    catch (ex) {
      // If user does not exist, 404 error
      return res.status(404).send('"id" was not found')
    }
  },

  /**
   * Create a user
   */
  createUser: async (req, res) => {
    {
      // Validate user
      const { error } = validate.create(req.body)
      if (error) return res.status(400).send(error.details[0].message)
    }
    
    {
      // Validate password
      const { error } = validate.password(req.body)
      if (error) return res.status(400).send(error.details[0].message)
    }

    // Verify user does not already exist
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    // Create user
    user = new User(_.pick(req.body, ['email', 'password', 'role']))

    // Hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    try {
      // Add user to the database
      user = await user.save()

      // Generate auth token
      const token = user.generateAuthToken()

      // Return created user to the client, with auth token header
      res
        // Set a cookie
        .cookie('x-auth-token', token, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          secure: true,
          sameSite: true
        })
        // Set a header
        // .header('x-auth-token', token)
        // Send the response
        .send(_.pick(user, ['_id', 'email', 'role']))
    }

    catch (ex) {
      console.error(ex)
      // Return exception error messages to the client
      for (const field in ex.errors) {
        res.send( ex.errors[field].name + ': ' + ex.errors[field].message )
      }
      return
    }
  },

  /**
   * Update a user
   */
  updateUser: async (req, res) => {
    // Validate user
    const { error } = validate.update(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    try {
      // Update user in database with request body keys if they exist
      const requestBody = {}
      if (req.body.email) requestBody.email = req.body.email
      if (req.body.password) {
        requestBody.password = req.body.password
        // Hash password
        const salt = await bcrypt.genSalt(10)
        requestBody.password = await bcrypt.hash(requestBody.password, salt)
      }
      if (req.body.role) requestBody.role = req.body.role

      const user = await User.findByIdAndUpdate(req.params.id, requestBody, { new: true })

      // Return updated user to the client
      res.send(_.pick(user, ['_id', 'email', 'role']))
    }

    catch (ex) {
      // If user does not exist, return 404 error to the client
      return res.status(404).send('"id" was not found')
    }
  },

  /**
   * Delete a user
   */
  deleteUser: async (req, res) => {
    try {
      // Remove user from database, if it exists
      const user = await User.findByIdAndRemove(req.params.id)

      // Return deleted user to the client
      res.send(_.pick(user, ['_id', 'email']))
    }

    catch (ex) {
      // If user does not exist, return 404 error to the client
      return res.status(404).send('"id" was not found')
    }
  }
}
