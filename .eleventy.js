require('dotenv').config()
const config = require('config')
const axios = require('axios')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')

module.exports = function (eleventyConfig) {

  async function getCollection(collection) {
    try {
      const response = await axios.get(`${config.get('app.url')}/api/${collection}`);
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

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
    eleventyConfig.addCollection(type, async collection => await getCollection(type))
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
