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
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const debug = require('debug')('app:startup')
const mongoose = require('mongoose')

/**
 * Database
 */
mongoose.connect(config.db.host + '/' + config.db.name, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { debug('Connected to MongoDB...') })
  .catch((err) => { debug('Could not connect to MongoDB...', err) })

// Article Schema
const articleSchema = new mongoose.Schema({
  /**
    * Built-in validators:
    * required, Boolean or Function that returns Boolean
    * for Strings:
    *   minlength and maxlength, Number
    *   match, Regex
    *   enum, Array of valid Strings
    * for Numbers and Dates:
    *   min and max, Number
    */

  /**
    * Custom sync validators:
    * {
    *   type: Array,
    *   validate: {
    *     validator: function(v) {
    *       return v && v.length > 0 // at least 1 array value
    *     },
    *     message: 'An article should have at least 1 tag'
    *   }
    * }
    */

  /**
    * Custom async validators:
    * {
    *   type: Array,
    *   validate: {
    *     // validator: () => Promise.reject(new Error('Oops!')), // Promise.reject, Mongoose will use the given error
    *     validator: () => Promise.resolve(false), // If the promise resolves to `false`, Mongoose assumes the validator failed and creates an error with the given `message`.
    *     message: 'An article should have at least 1 tag'
    *   }
    * }
    */

  /**
    * SchemaType options
    * lowercase, uppercase, trim: Boolean
    * get: v => v + 1, set: v => v + 1, getter and setter Function which returns what you want
    */
  title: { type: String, required: true, trim: true },
  author: String,
  tags: { type: Array, lowercase: true },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished }
  }
})

// Article Model
const Article = mongoose.model('Article', articleSchema)

// Article methods
async function createArticle (data) {
  const article = new Article({
    title: data.title,
    author: data.author,
    tags: data.tags,
    isPublished: data.isPublished
  })

  try {
    const result = await article.save()
    console.log(result)
    return result
  }

  catch (ex) {
    for (const field in ex.errors) {
      console.log( ex.errors[field].message )
    }
    // console.log(ex.errors)
    // return ex.errors
  }
}

createArticle({ title: 'Something', author: 'Author', isPublished: false })

async function getArticles () {
  return await Article
    .find() // Get all collection items

    /**
      * Refine query
      * .find({ author: 'Paul Shryock', title: 'Another article' }) // Filter
      * .find()
      * .limit(10)
      * .sort({ title: 1 }) // Sort by property
      * .sort({ title: -1 }) // Sort by property, descending
      * .sort({ 'title' }) // Sort by property, alternative syntax
      * .sort({ '-title' }) // Sort by property, alternative syntax, descending
      * .select({ title: 1, tags: 1 }) // Select properties to return
      * .select({ 'title tags' }) // Select properties to return, alternative synax
      */

    /**
      * Comparison operators
      * eq (equal to)
      * ne (not equal to)
      * gt (greater than)
      * gte (greater than or equal to)
      * lt (less than)
      * lte (less than or equal to)
      * in
      * nin (not in)
      * .find({ price: { $gt: 10 } }) // comparison operator
      * .find({ price: { $in: [10, 15, 20] } }) // comparison operator
      */

    /**
      * Logical operators
      * or
      * and
      * .or([ { author: 'Mosh' }, { isPublished: true } ])
      */

    /**
      * RegEx
      * .find({ author: /^Paul/i }) // Filter author starts with Paul
      * .find({ author: /Shryock$/i }) // Filter author ends with Shryock
      * and more JS RegEx, etc.
      */

    /**
      * Count items
      * .countDocuments() // Number of matching collection items
      */

    /** Pagination
      * .skip((pageNumber - 1) * pageSize)
      * .limit(pageSize)
      */
}

async function updateArticle(id) {

  // Approach: Query first
  // Use if you're receiving data from the client,
  // and you want to validate the data or check something in the database,
  // before updating the database
  // findById()
  // Modify its properties
  // save()

  // const article = await Article.findById(id)
  // if (!article) return

  // article.isPublished = true
  // article.author = 'Another author'

  /**
    * Alternate updating method:
    * article.set({
    *   isPublished: true,
    *   author: 'Another author'
    * })
    */

  // const result = await article.save()
  // return result

  // Approach: Update first
  // Update directly
  // Optionally: get the updated document

  // const result = await Article.update({ _id: id }, {
  //   $set: {
  //     author: 'Mosh',
  //     isPublished: false
  //   }
  // }) // Update this item by id

  // TODO: get updated data from function argument
  const article = await Article.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true }) // Update this item by id

  // MongoDB Update Operators, $currentDate, $inc, $min, $max, $mul, $rename, $set, $setOnInsert, $unset
  // const article = await Article.update({ isPublished: false }) // Update all items (multiple) that are not published
  return article
}

async function removeArticle(id) {
  // const result = await Article.deleteOne({ _id: id }) // Just one
  // const result = await Article.deleteOne( isPublished: false ) // First of multiple
  // const result = await Article.deleteMany({ _id: id })
  // return result
  const article = await Article.findByIdAndRemove(id) // Returns null if id doesn't exist
  return article
}

/**
 * Import routes
 */
const indexRouter = require('./routes/index')
const articlesRouter = require('./routes/articles')
const projectsRouter = require('./routes/projects')
const testimonialsRouter = require('./routes/testimonials')

/**
 * View engine
 */
app.engine('liquid', engine.express()) 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'liquid')

/**
 * Middleware
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
 * Routes
 */
app.use('/', indexRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/testimonials', testimonialsRouter)

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
