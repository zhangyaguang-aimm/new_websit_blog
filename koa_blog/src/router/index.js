const Router = require('koa-router')
const userRouter = require('./model/user')
const blogRouter = require('./model/blog')
const tagRouter = require('./model/tag')
const imgRouter = require('./model/img')
const articleRouter = require('./model/article')
const dotRouter = require('./model/dot')
const remarkRouter = require('./model/remark') // 评论
const replyRouter = require('./model/reply') // 回复

const router = new Router({
    prefix: '/blog/v1'
})

router.use('/user', userRouter)
router.use('/blog', blogRouter)
router.use('/tag', tagRouter)
router.use('/img', imgRouter)
router.use('/article', articleRouter)
router.use('/dot', dotRouter)
router.use('/remark', remarkRouter)
router.use('/reply', replyRouter)



module.exports = router



