const Joi = require('@hapi/joi')
const passwordComplexity = require('joi-password-complexity')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * Define User model schema
 */
const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true, minLength: 5, maxLength: 255, unique: true },
  password: { type: String, required: true , minLength: 12, maxLength: 1024}
})

userSchema.plugin(uniqueValidator)

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))

  return token
}

/**
 * Define User model
 */
const User = mongoose.model('User', userSchema)

const validate = {
  /**
   * Validate a user to create
   */
  create: function (user) {
    const schema = Joi.object({
      email: Joi.string().trim().min(5).max(255).required().email(),
      password: Joi.string().min(12).max(255).required(),
    })

    return schema.validate(user)
  },
  /**
   * Validate a user to update
   */
  update: function (user) {
    const schema = Joi.object({
      email: Joi.string().trim().min(5).max(255).email(),
      password: Joi.string().min(5).max(255),
    }).or('email', 'password')

    return schema.validate(user)
  },
  /**
   * Validate a user's password with additional requirements
   */
  password: function (user) {

    const complexityOptions = {
      min: 12,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4
    }

    return passwordComplexity(complexityOptions).validate(user.password)
  },
  /**
   * Validate a user's email and password for authentication
   */
  auth: function (req) {
    const complexityOptions = {
      min: 12,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4
    }

    const schema = Joi.object({
      email: Joi.string().trim().min(5).max(255).required().email(),
      password: passwordComplexity(complexityOptions).validate(req.password)
    })

    return schema.validate(req)
  }
}

exports.User = User
exports.validate = validate
