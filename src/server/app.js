'use strict'

/**
 * Import dependencies
 */
const express = require('express')
const app = express()
const config = require('config')
const compression = require('compression')
const helmet = require('helmet')
const { Liquid } = require('liquidjs')
const engine = new Liquid()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const error = require('./middleware/error')
require('express-async-errors')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const httpLogger = require('morgan')
const { log } = require('./modules/logger')
const debug = {
  startup: require('debug')('express-starter:startup'),
  database: require('debug')('express-starter:database')
}
require('dotenv').config()

const isProduction = app.get('env') === 'production'
const origin = {
  origin: isProduction ? config.get('domain') : '*',
}

/**
 * Import routes
 */
const index = require('./routes/index')
const articles = require('./routes/articles')
const projects = require('./routes/projects')
const testimonials = require('./routes/testimonials')
const users = require('./routes/users')
const auth = require('./routes/auth')

/**
 * Error if missing jwtPrivateKey
 */
if(!config.get('jwtPrivateKey')) {
  log.error('FATAL ERROR: jwtPrivateKey is not defined.')
}

/**
 * Setup HTTP headers
 */
app.use(compression()) // compress all responses
app.use(helmet()) // Set HTTP headers
app.disable('x-powered-by')

/**
 * Serve favicon
 */
app.use(favicon(path.join(__dirname, '../../build/client/img/favicon', 'favicon.ico')))

/**
 * Setup logging
 */
if (!isProduction) {
  app.use(httpLogger('dev')) // Log requests to the console
}

/**
 * Connect to Database
 */
const dbString = `${config.get('db.protocol')}://${config.get('db.host')}${config.get('db.port')}/${config.get('db.database')}`

mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => { debug.database('Connected to MongoDB...') })
  .catch((err) => { debug.database('Could not connect to MongoDB...', err) })

mongoose.connection.on('error', err => {
  log.error('Database error... ', err)
  debug.database('Database error... ', err)
})

/**
 * Setup view engine
 */
app.engine('liquid', engine.express()) 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'liquid')


/**
 * Setup other middleware
 */
app.use(express.json()) // Return JSON
app.use(express.urlencoded({ extended: false })) // Allow query strings
app.use(cookieParser()) // Parse cookies
app.use(express.static(path.join(__dirname, '../../build/client'))) // Serve static content
app.use(cors(origin))

/**
 * Setup routes
 */
app.use('/api', index)
app.use('/api/articles', articles)
app.use('/api/projects', projects)
app.use('/api/testimonials', testimonials)
app.use('/api/users', users)
app.use('/api/auth', auth)

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404))
})
app.use(error)

module.exports = app
