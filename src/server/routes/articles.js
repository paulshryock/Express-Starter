const router = require('express').Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const handlers = require('../handlers/articles')

router.get('/', handlers.getArticle)
router.post('/', [auth, admin], handlers.createArticle)

router.get('/:id', handlers.getArticle)
router.put('/:id', [auth, admin], handlers.updateArticle)
router.delete('/:id', [auth, admin], handlers.deleteArticle)

module.exports = router
