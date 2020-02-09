const config = require('config')

module.exports = {
  // Get home page index
  getIndex: (req, res, next) => {
    res.render('index', { title: config.get('app.title') })
  }
}
