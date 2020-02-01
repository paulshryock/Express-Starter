async function removeArticle(id) {
  // const result = await Article.deleteOne({ _id: id }) // Just one
  // const result = await Article.deleteOne( isPublished: false ) // First of multiple
  // const result = await Article.deleteMany({ _id: id })
  // return result
  const article = await Article.findByIdAndRemove(id) // Returns null if id doesn't exist
  return article
}