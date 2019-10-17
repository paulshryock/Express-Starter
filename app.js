/**
 * Import dependencies
 */
var express = require('express');
var helmet = require('helmet');
var app = express();
var { Liquid } = require('liquidjs');
var engine = new Liquid();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');

/**
 * Import routes
 */
var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');
var projectsRouter = require('./routes/projects');
var testimonialsRouter = require('./routes/testimonials');

/**
 * View engine
 */
app.engine('liquid', engine.express()); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'liquid');

/**
 * Middleware
 */
if (app.get('env') === 'development') {
  app.use(logger('dev')); // Log requests to the console
}
app.use(express.json()); // Return JSON
app.use(express.urlencoded({ extended: false })); // Allow query strings
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'build'))); // Server static content
app.use(helmet()); // Set HTTP headers

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/testimonials', testimonialsRouter);

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
