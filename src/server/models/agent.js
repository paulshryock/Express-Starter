const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator')

/**
 * Define Agent model schema
 */
const agentSchema = new mongoose.Schema({
  name: {
    first: { type: String, trim: true, required: true },
    last: { type: String, trim: true, required: true }
  },
  email: { type: String, trim: true, required: true, unique: true, uniqueCaseInsensitive: true },
  brand: { type: String, trim: true },
  state: { type: String, trim: true },
  company: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  event: { type: String, trim: true }
})

agentSchema.plugin(uniqueValidator)

/**
 * Define Agent model
 */
const Agent = mongoose.model('Agent', agentSchema)

const validate = {
  /**
   * Validate an agent to create
   */
  create: function (agent) {
    const schema = Joi.object({
      name: Joi.object({
        first: Joi.string().trim().required(),
        last: Joi.string().trim().required()
      }).required(),
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

exports.Agent = Agent
exports.validate = validate
