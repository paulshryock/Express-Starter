/**
 * Remove an item from the database, boilerplate
 *
 * async function removeArticle(id) {
 *   const one = await Article.deleteOne({ _id: id }) // Delete one
 *   const firstOfMany = await Article.deleteOne({ isPublished: false }) // Delete the first of multiple
 *   const many = await Article.deleteMany({ isPublished: false }) // Delete multiple
 *   const article = await Article.findByIdAndRemove(id) // Returns deleted Article, or null if id doesn't exist
 *   return article
 * }
 */
 