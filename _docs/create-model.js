/**
  * Create a model, boilerplate
  *
  * // Article Model
  * const Article = mongoose.model('Article', new mongoose.Schema({
  *   title: { type: String, required: true, trim: true },
  *   author: String,
  *   tags: { type: Array, lowercase: true },
  *   date: { type: Date, default: Date.now },
  *   isPublished: Boolean,
  *   price: {
  *     type: Number,
  *     required: function() { return this.isPublished }
  *   }
  * }))
  */

/**
  * Built-in validators:
  *
  * required, Boolean or Function that returns Boolean
  * for Strings:
  *   minlength and maxlength, Number
  *   match, Regex
  *   enum, Array of valid Strings
  * for Numbers and Dates:
  *   min and max, Number
  */

/**
  * Custom sync validators:
  * {
  *   type: Array,
  *   validate: {
  *     validator: function(v) {
  *       return v && v.length > 0 // at least 1 array value
  *     },
  *     message: 'An article should have at least 1 tag'
  *   }
  * }
  */

/**
  * Custom async validators:
  * {
  *   type: Array,
  *   validate: {
  *     // validator: () => Promise.reject(new Error('Oops!')), // Promise.reject, Mongoose will use the given error
  *     validator: () => Promise.resolve(false), // If the promise resolves to `false`, Mongoose assumes the validator failed and creates an error with the given `message`.
  *     message: 'An article should have at least 1 tag'
  *   }
  * }
  */

/**
  * SchemaType options
  * lowercase, uppercase, trim: Boolean
  * get: v => v + 1, set: v => v + 1, getter and setter Function which returns what you want
  */