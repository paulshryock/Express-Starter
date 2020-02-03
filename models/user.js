const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

/**
 * Define User model
 */
const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, trim: true, required: true, minLength: 5, maxLength: 255, unique: true },
  password: { type: String, required: true , minLength: 12, maxLength: 1024}
}))

const validate = {
  /**
   * Validate a user to create
   */
  create: function (user) {
    const schema = Joi.object({
      email: Joi.string().trim().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    })

    return schema.validate(user)
  },
  /**
   * Validate a user to update
   */
  update: function (user) {
    const schema = Joi.object({
      email: Joi.string().trim().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    }).or('email', 'password')

    return schema.validate(user)
  }
}

exports.User = User
exports.validate = validate
