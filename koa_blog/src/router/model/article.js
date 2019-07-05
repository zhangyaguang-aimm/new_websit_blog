const router = require('koa-router')()
const ArticleController = require('../../controller/article')

router.get('/list', ArticleController.getList)
router.post('/add', ArticleController.addArticle)
router.post('/update', ArticleController.updateArticle)
router.get('/detail', ArticleController.getOneArticle)

module.exports = router.routes()