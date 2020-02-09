const router = require('express').Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const handlers = require('../handlers/testimonials')

router.get('/', handlers.getTestimonials)
router.post('/', [auth, admin], handlers.createTestimonial)

router.get('/:id', handlers.getTestimonial)
router.put('/:id', [auth, admin], handlers.updateTestimonial)
router.delete('/:id', [auth, admin], handlers.deleteTestimonial)

module.exports = router
