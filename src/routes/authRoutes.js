const {Router} = require('express')
const router = Router()
const controller = require('../controllers/authController')
router.get('/signIn', controller.signIn)

module.exports = router
