const router = require('express').Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const handlers = require('../handlers/agents')

router.get('/', [auth, admin], handlers.getAgents)
router.post('/', handlers.createAgent)

router.get('/:id', [auth, admin], handlers.getAgent)
router.put('/:id', [auth, admin], handlers.updateAgent)
router.delete('/:id', [auth, admin], handlers.deleteAgent)

module.exports = router
