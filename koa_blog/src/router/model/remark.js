const router = require('koa-router')()

const RemarkController = require('../../controller/remark')

router.post('/add',RemarkController.addRemark)
router.get('/list',RemarkController.getRemarkList)

module.exports = router.routes()