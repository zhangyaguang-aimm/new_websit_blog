const router = require('koa-router')()
const UserController = require('../../controller/user')

router.post('/login', UserController.loginUser)

router.post('/register', UserController.registerUser)

router.get('/userinfo', UserController.getUserInfo)
router.get('/list', UserController.getUserList)

module.exports = router.routes()