const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // Get a cookie
  // response.cookies.x-auth-token

  // Most of CSRF attacks have a different origin or referrer header with your original host in their requests. So check if you have any of them in the header, are they coming from your domain or not! If not reject them.

  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decoded
    next()
  }

  catch (ex) {
    res.status(400).send('Invalid token.')
  }
}