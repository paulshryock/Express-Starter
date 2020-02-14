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
const error = require('./middleware/error')
require('express-async-errors')
const mongoose = require('mongoose')
const httpLogger = require('morgan')
const { log } = require('./modules/logger')
const debug = {
  startup: require('debug')('express-starter:startup'),
  database: require('debug')('express-starter:database')
}
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
  log.error('FATAL ERROR: jwtPrivateKey is not defined.')
}

/**
 * Connect to Database
 */
mongoose.connect(config.db.host + '/' + config.db.name, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => { debug.database('Connected to MongoDB...') })
  .catch((err) => { debug.database('Could not connect to MongoDB...', err) })

mongoose.connection.on('error', err => {
  log.error('Database error...', err)
  debug.database('Database error...', err)
})

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
  app.use(httpLogger('dev')) // Log requests to the console
}
app.use(express.json()) // Return JSON
app.use(express.urlencoded({ extended: false })) // Allow query strings
app.use(cookieParser()) // Parse cookies
app.use(express.static(path.join(__dirname, '../../build/client'))) // Serve static content
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
 * Error middleware
 * TODO: Remove if unnecessary
 */
app.use(error)

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
