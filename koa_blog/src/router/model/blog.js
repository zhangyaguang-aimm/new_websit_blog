const router = require('koa-router')()
const BlogController = require('../../controller/blog')

router.get('/list', BlogController.getList)
router.post('/add', BlogController.addBlog)

module.exports = router.routes()