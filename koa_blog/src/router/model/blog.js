const router = require('koa-router')()

router.get('/list', async(ctx) => {
    ctx.body = {
        method: ctx.method,
        status: 200,
        data: ctx.url,
        success: '成功'
    }
})

module.exports = router.routes()