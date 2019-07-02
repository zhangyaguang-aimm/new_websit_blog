const router = require('koa-router')()
const ImgController = require('../../controller/img')

router.get('/list', ImgController.getList)

router.post('/upload',ImgController.uploadQiniu().single('file'),ImgController.uploadImg)


module.exports = router.routes()