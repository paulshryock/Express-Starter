'use strict'

/**
 * Import dependencies
 */
const express = require('express')
const app = express()
const config = require('config')
const helmet = require('helmet')
const { Liquid } = require('liquidjs')
const engine = new Liquid()
const path = require('path')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const mongoose = require('mongoose')
const logger = require('morgan')
const debug = require('debug')('express-starter:startup')
require('dotenv').config()

/**
 * Import routes
 */
const index = require('./routes/index')
const articles = require('./routes/articles')
const projects = require('./routes/projects')
const testimonials = require('./routes/testimonials')
const agents = require('./routes/agents')
const users = require('./routes/users')
const auth = require('./routes/auth')

/**
 * Error if missing jwtPrivateKey
 */
if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
}

/**
 * Connect to Database
 */
mongoose.connect(config.db.host + '/' + config.db.name, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { debug('Connected to MongoDB...') })
  .catch((err) => { debug('Could not connect to MongoDB...', err) })

/**
 * Setup view engine
 */
app.engine('liquid', engine.express()) 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'liquid')

/**
 * Use middleware
 */
if (app.get('env') === 'development') {
  app.use(logger('dev')) // Log requests to the console
}
app.use(express.json()) // Return JSON
app.use(express.urlencoded({ extended: false })) // Allow query strings
app.use(cookieParser()) // Parse cookies
app.use(express.static(path.join(__dirname, 'build'))) // Serve static content
app.use(helmet()) // Set HTTP headers

/**
 * Setup routes
 */
app.use('/', index)
app.use('/api/articles', articles)
app.use('/api/projects', projects)
app.use('/api/testimonials', testimonials)
app.use('/api/agents', agents)
app.use('/api/users', users)
app.use('/api/auth', auth)

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404))
})

/**
 * Error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
