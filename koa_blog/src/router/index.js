const Router = require('koa-router')
const userRouter = require('./model/user')
const blogRouter = require('./model/blog')

const router = new Router({
    prefix: '/blog/v1'
})

router.use('/user', userRouter)
router.use('/blog', blogRouter)



module.exports = router



