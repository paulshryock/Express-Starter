const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const debug = require('debug')('express-starter:agents')

/**
 * Define Agent model
 */
const Agent = mongoose.model('Agent', new mongoose.Schema({
  // title: { type: String, required: true, trim: true },
  // status: { type: String, required: true, trim: true, lowercase: true },
  // tags: [{ type: String, trim: true, lowercase: true }],
  // date: { type: Date, default: Date.now }
}))

const agent = {
  name: {
    first: String,
    last: String
  },
  email: Email,
  brand: String,
  state: String,
  company: String,
  date: Date.now,
  event: String
}