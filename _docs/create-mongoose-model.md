## Create a Mongoose model

```js
const Article = mongoose.model('Article', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: String,
  tags: { type: Array, lowercase: true },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished }
  }
}))
```

## Schema types (fields)

A schema can have an arbitrary number of fields — each one represents a field in the documents stored in MongoDB. An example schema showing many of the common field types and how they are declared is shown below.

```js
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```

## Mongoose SchemaType options

- `lowercase`: Boolean
- `uppercase`: Boolean
- `trim`: Boolean
- getter and setter Functions which return what you want:
  - `get: v => v + 1`
  - `set: v => v + 1`

## Mongoose Built-in validators:

- `required`: Boolean or Function that returns Boolean

### String validators

- `minlength`: Number
- `maxlength`: Number
- `match`: Regex
- `enum`: Array of valid Strings

### Number and Date Validators

- `min`: Number
- `max`: Number

### Custom sync validator:

- `validate: { validator: function(v) { return v } }`

#### Example

```js
{
  type: Array,
  validate: {
    validator: function(v) {
      return v && v.length > 0 // at least 1 array value
    },
    message: 'An article should have at least 1 tag'
  }
}
```

### Custom async validators:

#### Example

```js
{
  type: Array,
  validate: {
    validator: () => Promise.reject(new Error('Oops!')), // Promise.reject, Mongoose will use the given error
    validator: () => Promise.resolve(false), // If the promise resolves to `false`, Mongoose assumes the validator failed and creates an error with the given `message`.
    message: 'An article should have at least 1 tag'
  }
}
```

