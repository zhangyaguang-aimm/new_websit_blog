const router = require('koa-router')()
const BlogController = require('../../controller/blog')

router.get('/list', BlogController.getList)
router.post('/add', BlogController.addBlog)
router.post('/update', BlogController.updateBlog)

module.exports = router.routes()