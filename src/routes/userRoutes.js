const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')

router.get('/', userController.index)
router.get('/Portfolio', userController.portfolio)
router.get('/Contact', userController.contact)
router.get('/AboutUs', userController.about)



module.exports = router
