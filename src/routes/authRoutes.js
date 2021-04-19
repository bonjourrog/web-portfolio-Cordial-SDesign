const {Router} = require('express')
const router = Router()
const controller = require('../controllers/authController')

router.get('/signIn', controller.signIn)

router.get('/adminpanel', controller.adminPanel)

router.post('/uploadDesign', controller.uploadDesign)

router.get('/register', controller.register)

router.post('/register', controller.signUp)

module.exports = router
