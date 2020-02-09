const router = require('express').Router()
const handlers = require('../handlers/index')

router.get('/', handlers.getIndex)

module.exports = router
