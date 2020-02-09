const router = require('express').Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const handlers = require('../handlers/users')

router.get('/', [auth, admin], handlers.getUsers)
router.post('/', [auth, admin], handlers.createUser)

router.get('/me', auth, handlers.getCurrentUser)
router.put('/me', auth, handlers.updateCurrentUser)

router.get('/:id', [auth, admin], handlers.getUser)
router.put('/:id', [auth, admin], handlers.updateUser)
router.delete('/:id', [auth, admin], handlers.deleteUser)

module.exports = router
