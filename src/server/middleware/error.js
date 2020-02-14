const { log } = require('../modules/logger')

module.exports = function (err, req, res, next) {
  if (err.errors.length > 0) {
    for (const field in err.errors) {
      log.error(err.errors[field].message, err.errors[field])
    }
  } else {
    log.error(err.message, err)
  }

  res.status(500).send('Something failed.')
}