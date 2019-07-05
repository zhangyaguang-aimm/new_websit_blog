const router = require('koa-router')()
const DotController = require('../../controller/dot')

router.get('/dotContent', DotController.dotContentNums)


module.exports = router.routes()