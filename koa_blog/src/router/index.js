const Router = require('koa-router')
const userRouter = require('./model/user')
const blogRouter = require('./model/blog')
const tagRouter = require('./model/tag')
const categoryRouter = require('./model/category')

const router = new Router({
    prefix: '/blog/v1'
})

router.use('/user', userRouter)
router.use('/blog', blogRouter)
router.use('/tag', tagRouter)
router.use('/category', categoryRouter)



module.exports = router



