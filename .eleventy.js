require('dotenv').config()
const config = require('config')
const debug = require('debug')('express-starter:build')
const axios = require('axios')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')

const url = config.get('app.url')

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('Server response error.')
    debug(error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('No server response received.')
    debug(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Client request error: ', error.message)
    debug(error.message)
  }
  if (error.config) console.log(error.config)
}

async function getEndpoint(config) {
  try {
    const response = await axios({
      method: config.method,
      url: config.url,
      data: config.data
    })
    return config.auth ? response : response.data
  } catch (error) {
    handleError(error)
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
    console.info('Token was received!')
    return token
  } catch (error) {
    console.info('Token was not received!')
    handleError(error)
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

  // TODO: Refactor all API code out of Eleventy config

  // TODO: Refactor to use simultaneous requests
  // https://blog.logrocket.com/axios-or-fetch-api/

  collections.api.map(async type => {
    try {
      const result = await getEndpoint({ method: 'get', url: url + '/api/' + type.plural })

      eleventyConfig.addCollection(type.plural, collection => {
        console.info(type.plural + ' collection added.')
        return result
      })
    }
    catch (error) {
      console.error(type.plural + ' collection was not added: ', error)
      // debug(error)
    }
  })

  collections.local.map(type => {
    eleventyConfig.addCollection(type.plural, collection => {
      console.info(type.plural + ' collection added.')
      return collection.getAll().filter(post => post.data.contentType === type.single)
    })
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
