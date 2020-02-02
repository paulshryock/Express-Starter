const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

/**
 * Define Article model
 */
const Article = mongoose.model('Article', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true, lowercase: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  date: { type: Date, default: Date.now }
}))

const validate = {
  /**
   * Validate an article to create
   */
  create: function (article) {
    const schema = Joi.object({
      title: Joi.string()
        .trim()
        .required(),
      author: Joi.string()
        .trim()
        .required(),
      status: Joi.string()
        .alphanum()
        .trim()
        .lowercase()
        .required()
        .valid('draft', 'approved', 'scheduled', 'published'),
      tags: Joi.array()
        .items(Joi.string()
          .alphanum()
          .trim()
          .lowercase()
        ),
      date: Joi.date()
    })

    return schema.validate(article)
  },
  /**
   * Validate an article to update
   */
  update: function (article) {
    const schema = Joi.object({
      title: Joi.string()
        .trim(),
      author: Joi.string()
        .trim(),
      status: Joi.string()
        .alphanum()
        .trim()
        .lowercase()
        .valid('draft', 'approved', 'scheduled', 'published'),
      tags: Joi.array()
        .items(Joi.string()
          .alphanum()
          .trim()
          .lowercase()
        ),
      date: Joi.date()
    }).or('title', 'author', 'status', 'tags', 'date')

    return schema.validate(article)
  }
}

exports.Article = Article
exports.validate = validate
