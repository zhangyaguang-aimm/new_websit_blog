const router = require('koa-router')()
const TagController = require('../../controller/tag')


router.post('/add', TagController.addTag)


router.get('/list', TagController.getTagList)
router.get('/delete', TagController.deleteTag)
router.get('/edit', TagController.editTag)

module.exports = router.routes()