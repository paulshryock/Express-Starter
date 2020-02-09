const router = require('express').Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const handlers = require('../handlers/projects')

router.get('/', handlers.getProjects)
router.post('/', [auth, admin], handlers.createProject)

router.get('/:id', handlers.getProject)
router.put('/:id', [auth, admin], handlers.updateProject)
router.delete('/:id', [auth, admin], handlers.deleteProject)

module.exports = router
