const router = require('koa-router')()

const ReplyController = require('../../controller/reply')

router.post('/add',ReplyController.addReply)

module.exports = router.routes()