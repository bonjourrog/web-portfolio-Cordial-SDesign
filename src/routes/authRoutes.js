const {Router} = require('express')
const router = Router()
const controller = require('../controllers/authController')

router.get('/signIn', controller.userNotAuthenticated, controller.signIn)
router.post('/signIn', controller.authenticateUser)
router.get('/register', controller.userNotAuthenticated, controller.register)
router.post('/register', controller.userNotAuthenticated, controller.signUp)
router.get('/logout', controller.logout)

router.get('/adminpanel', controller.userAuthenticated, controller.adminPanel)
router.get('/portfolio', controller.userAuthenticated, controller.portfolio)
router.post('/uploadDesign', controller.userAuthenticated, controller.uploadDesign)
router.get('/delete/:id', controller.userAuthenticated, controller.delete)
router.get('/updateDesign/:id', controller.updateScreen)
router.post('/updateDesign/:id', controller.updateDesign)
router.get('/contact', controller.contactScreen)


module.exports = router
