const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

/**
 * Define Testimonial model
 */
const Testimonial = mongoose.model('Testimonial', new mongoose.Schema({
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
   * Validate a testimonial to create
   */
  create: function (testimonial) {
    const schema = Joi.object({
      name: Joi.object({
        first: Joi.string().trim().required(),
        last: Joi.string().trim().required()
      }),
      quote: Joi.string().trim().required(),
      date: Joi.date()
    })

    return schema.validate(testimonial)
  },
  /**
   * Validate a testimonial to update
   */
  update: function (testimonial) {
    const schema = Joi.object({
      name: Joi.object({
        first: Joi.string().trim().required(),
        last: Joi.string().trim().required()
      }),
      quote: Joi.string().trim().required(),
      date: Joi.date()
    }).or('name.first', 'name.last', 'quote', 'date')

    return schema.validate(testimonial)
  }
}

exports.Testimonial = Testimonial
exports.validate = validate
