const router = require('koa-router')()
const BlogController = require('../../controller/blog')

router.get('/list', BlogController.getList)
router.post('/add', BlogController.addBlog)
router.post('/update', BlogController.updateBlog)
router.get('/newHotList', BlogController.newHotList.bind(BlogController))
router.get('/detail', BlogController.getOneBlog)

module.exports = router.routes()