# Query datase with Mongoose

## Get all collection items

```js
const collection = await Model.find()
```

## Refine query

```js
const refinedCollection = await Model

  .find({ author: 'Paul Shryock', title: 'Another article' }) // Filter

  .select({ 'title tags' }) // Select properties to return
  .select({ title: 1, tags: 1 }) // Select properties to return, alternative synax

  .sort({ 'title' }) // Sort by property, ascending
  .sort({ '-title' }) // Sort by property, descending
  .sort({ title: 1 }) // Sort by property, alternative syntax, ascending
  .sort({ title: -1 }) // Sort by property, alternative syntax, descending

  .limit(10) // Limit documents
```

### Comparison operators

- `$eq`: equal to
- `$ne`: not equal to
- `$gt`: greater than
- `$gte`: greater than or equal to
- `$lt`: less than
- `$lte`: less than or equal to
- `$in`: equal to one of multiple options
- `$nin`: not in

```js
const comparisonCollection = await Model
  .find({ price: { $gt: 10 } }) // price greater than 10
  .find({ price: { $in: [10, 15, 20] } }) // price equal to 10, 15, or 20
```

### Logical operators

- `and`: Every condition is true
- `or`: Either condition is true

```js
const logicalCollection = await Model
  .and([ { author: 'Mosh' }, { isPublished: true } ])
  .or([ { author: 'Mosh' }, { isPublished: true } ])
```

### RegEx

Use any regular expression as a property value

```js
const regexCollection = await Model
  .find({ title: /^Lorem/i }) // Filter title starts with Lorem
  .find({ title: /Ipsum$/i }) // Filter title ends with Ipsum
```

### Pagination

```js
const pageNumber = 2
const pageSize = 10

const paginatedCollection = await Model
  .skip((pageNumber - 1) * pageSize) // Skip ((2 - 1) * 10) = 10
  .limit(pageSize) // Return 10 documents (11 through 20, since first 10 are skipped)
```

### Count items

```js
const total = await Model
  .countDocuments() // Return total Number of matching collection items
```
