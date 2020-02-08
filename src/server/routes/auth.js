const express = require('express')
const router = express.Router()
const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const debug = require('debug')('express-starter:users')

/**
 * Authenticate a user
 */
router.post('/', async (req, res) => {
  {
    // Validate user
    const { error } = validate.auth(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  }
  
  {
    // Validate password
    const { error } = validate.password(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  }

  // Verify user exists
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password')

  // Verify correct password
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password')

  // Generate auth token
  const token = user.generateAuthToken()

  try {
    // Return auth token to the client
    res
      // Set a cookie
      .cookie('x-auth-token', token, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: true
      })
      // Send the response
      // .send(token)
      .send()
  }

  catch {
    // Return exception to the client
    res.send(ex)
    return
  }
})

module.exports = router
