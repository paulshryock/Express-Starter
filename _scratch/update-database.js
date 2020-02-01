async function updateArticle(id) {

  // Approach: Query first
  // Use if you're receiving data from the client,
  // and you want to validate the data or check something in the database,
  // before updating the database
  // findById()
  // Modify its properties
  // save()

  // const article = await Article.findById(id)
  // if (!article) return

  // article.isPublished = true
  // article.author = 'Another author'

  /**
    * Alternate updating method, multiple articles:
    * article.set({
    *   isPublished: true,
    *   author: 'Another author'
    * })
    */

  // const result = await article.save()
  // return result

  // Approach: Update first
  // Update directly
  // Optionally: get the updated document

  // const result = await Article.update({ _id: id }, {
  //   $set: {
  //     author: 'Mosh',
  //     isPublished: false
  //   }
  // }) // Update this item by id

  // TODO: get updated data from function argument
  const article = await Article.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true }) // Update this item by id

  // MongoDB Update Operators, $currentDate, $inc, $min, $max, $mul, $rename, $set, $setOnInsert, $unset
  // const article = await Article.update({ isPublished: false }) // Update all items (multiple) that are not published
  return article
}