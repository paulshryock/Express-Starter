async function getArticles () {
  return await Article
    .find() // Get all collection items

    /**
      * Refine query
      * .find({ author: 'Paul Shryock', title: 'Another article' }) // Filter
      * .find()
      * .limit(10)
      * .sort({ title: 1 }) // Sort by property
      * .sort({ title: -1 }) // Sort by property, descending
      * .sort({ 'title' }) // Sort by property, alternative syntax
      * .sort({ '-title' }) // Sort by property, alternative syntax, descending
      * .select({ title: 1, tags: 1 }) // Select properties to return
      * .select({ 'title tags' }) // Select properties to return, alternative synax
      */

    /**
      * Comparison operators
      * eq (equal to)
      * ne (not equal to)
      * gt (greater than)
      * gte (greater than or equal to)
      * lt (less than)
      * lte (less than or equal to)
      * in
      * nin (not in)
      * .find({ price: { $gt: 10 } }) // comparison operator
      * .find({ price: { $in: [10, 15, 20] } }) // comparison operator
      */

    /**
      * Logical operators
      * or
      * and
      * .or([ { author: 'Mosh' }, { isPublished: true } ])
      */

    /**
      * RegEx
      * .find({ author: /^Paul/i }) // Filter author starts with Paul
      * .find({ author: /Shryock$/i }) // Filter author ends with Shryock
      * and more JS RegEx, etc.
      */

    /**
      * Count items
      * .countDocuments() // Number of matching collection items
      */

    /** Pagination
      * .skip((pageNumber - 1) * pageSize)
      * .limit(pageSize)
      */
}