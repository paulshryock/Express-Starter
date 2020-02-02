const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

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

exports.Project = Project
exports.validate = validate
