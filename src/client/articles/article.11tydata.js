const article = {
  contentType: 'article',
  layout: 'article',
  permalink: './from-api/{{ article.slug }}/index.html',
  // articles: async function () {
  //   const result = await fetch('http://localhost:3000/api/articles')
  //   return result.json()
  // },
  // pagination: {
  //   data: 'articles',
  //   alias: 'article',
  //   size: 1
  // }
}

module.exports = article
