require('dotenv').config()
const config = require('config')
const debug = require('debug')('express-starter:build')
const axios = require('axios')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')

module.exports = function (eleventyConfig) {

  const url = config.get('app.url')

  async function getEndpoint(config) {
    try {
      const response = await axios({
        method: config.method,
        url: config.url,
        data: config.data
      })
      return response
    } catch (error) {
      debug(error)
    }
  }

  async function getToken () {
    try {
      const response = await getEndpoint({
        method: 'post',
        url: url + '/api/auth',
        data: {
          email: config.get('user.email'),
          password: config.get('user.password')
        }
      })
      const token = response.headers['set-cookie'][0].replace('x-auth-token=', '').replace(/; .*/, '')
      return token
    } catch (error) {
      debug(error)
    }
  }

  const token = getToken()

  const collections = {
    api: [
      'articles',
      'projects',
      'testimonials',
      // 'users'
    ],
    local: [
      { plural: 'pages', single: 'page' }
    ]
  }

  collections.api.map(type => {
    eleventyConfig.addCollection(type, async collection => {
      const response = await getEndpoint({ method: 'get', url: url + '/api/' + type })
      return response.data
    })
  })

  collections.local.map(type => {
    eleventyConfig.addCollection(type.plural, async collection => collection.getAll().filter(post => post.data.contentType === type.single))
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
