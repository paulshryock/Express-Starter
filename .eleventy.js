const config = require('config')
const src = config.get('paths.src.client')
const build = config.get('paths.build.client')

module.exports = function (eleventyConfig) {

  // Add content collections
  const types = [
    { plural: 'agents', single: 'agent' },
    { plural: 'articles', single: 'article' },
    { plural: 'pages', single: 'page' },
    { plural: 'projects', single: 'project' },
    { plural: 'testimonials', single: 'testimonial' },
    { plural: 'users', single: 'user' }
  ]

  types.map(type => {
    eleventyConfig.addCollection(type.plural, collection => collection.getAll().filter(post => post.data.contentType === type.single))
  })

  return {
    dir: {
      data: '_data',
      includes: '_includes',
      input: src,
      layouts: '_layouts',
      output: build
    }
  }
}
