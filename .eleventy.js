require('dotenv').config()
const config = require('config')
const debug = require('debug')('express-starter:build')
const axios = require('axios')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')

const url = config.get('app.url')

async function getEndpoint(config) {
  try {
    const response = await axios({
      method: config.method,
      url: config.url,
      data: config.data
    })
    return config.auth ? response : response.data
  } catch (error) {
    debug(error)
  }
}

async function getToken () {
  try {
    const response = await getEndpoint({
      method: 'post',
      url: url + '/api/auth',
      auth: true,
      data: {
        email: config.get('user.email'),
        password: config.get('user.password')
      }
    })
    const token = response.headers['set-cookie'][0].replace('x-auth-token=', '').replace(/; .*/, '')
    console.log('Token successful!')
    return token
  } catch (error) {
    debug(error)
  }
}

getToken()

const collections = {
  api: [
    { plural: 'articles', single: 'article' },
    { plural: 'projects', single: 'project' },
    { plural: 'testimonials', single: 'testimonial' },
    // { plural: 'users', single: 'user' }
  ],
  local: [
    { plural: 'pages', single: 'page' },
  ]
}

module.exports = function (eleventyConfig) {

  collections.api.map(type => {
    eleventyConfig.addCollection(type.plural, async collection => {
      const result = await getEndpoint({ method: 'get', url: url + '/api/' + type.plural })
      console.log(type.plural, ': ', result)
      return result
    })
  })

  collections.local.map(type => {
    eleventyConfig.addCollection(type.plural, collection => collection.getAll().filter(post => post.data.contentType === type.single))
  })

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
