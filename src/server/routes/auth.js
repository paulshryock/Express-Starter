const router = require('express').Router()
const handlers = require('../handlers/auth')

router.post('/', handlers.authenticateUser)

module.exports = router
