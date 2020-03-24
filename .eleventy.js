require('dotenv').config()
const config = require('config')
const debug = require('debug')('express-starter:build')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')
const api = require('./modules/api.js')

// Define collections
const collections = [
  {
    plural: 'articles',
    single: 'article',
    location: 'api'
  },
  {
    plural: 'projects',
    single: 'project',
    location: 'api'
  },
  {
    plural: 'testimonials',
    single: 'testimonial',
    location: 'api'
  },
  {
    plural: 'pages',
    single: 'page',
    location: 'local'
  }
]

// Get API token
if (api) api.login()

module.exports = function (eleventyConfig) {

  // Create collections
  collections.map(type => {
    eleventyConfig.addCollection(type.plural, collection => {
      // Add API collections
      if (api && type.location === 'api') {
        const response = api.addCollection(type)
        // If collection exists, return it, else return an empty array
        if (response) {
          debug(type.plural + ' collection was added!')
          return response
        }
          debug(type.plural + ' collection was not added!')
        return []
      }
      // Add local collections
      debug(type.plural + ' collection was added!')
      return collection.getAll().filter(post => post.data.contentType === type.single)
    })
  })

  // Deep merge
  eleventyConfig.setDataDeepMerge(true)

  return {
    dir: {
      data: '_data',
      includes: '_includes',
      input: SRC,
      layouts: '_layouts',
      output: BUILD
    }
  }
}
