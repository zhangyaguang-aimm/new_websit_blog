const router = require('koa-router')()

const CategoryController = require('../../controller/category')

router.post('/add', CategoryController.addCategory)

router.get('/list', CategoryController.getCategoryList)

module.exports = router.routes()