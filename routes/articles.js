const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
const articles = [
  {
    id: 1,
    title: 'Article 1'
  },
  {
    id: 2,
    title: 'Article 2'
  },
  {
    id: 3,
    title: 'Article 3'
  }
]

/**
 * Get articles
 */
router.get('/', function(req, res, next) {
  // Return articles to the client
  res.send(articles);
});

/**
 * Get an article
 */
router.get('/:id', function(req, res, next) {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) res.status(404).send('"id" was not found')
  // Return article to the client
  res.send(article)
});

/**
 * Create an article
 */
router.post('/', function (req, res) {
  // Check if article already exists
  const articleExists = articles.find(a => a.id === parseInt(req.body.id))

  if (articleExists) {
    res.status(400).send('"id" already exists')
    return
  }

  // Validate article
  const schema = Joi.object({
    id: Joi.number()
      .required(),

    title: Joi.string()
      .required()
  })

  const { error, value } = schema.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Define article
  const article = {
    id: req.body.id,
    title: req.body.title
  }

  // Add article to the database
  // TODO: Replace this with real database code
  articles.push(article)

  // Return article to the client
  res.send(article)
});

/**
 * Update an article
 */
// router.put('/:id', function (req, res) {
//   res.send('Update an article');
// });

/**
 * Delete an article
 */
// router.delete('/:id', function (req, res) {
//   res.send('Delete an article');
// });

module.exports = router;
