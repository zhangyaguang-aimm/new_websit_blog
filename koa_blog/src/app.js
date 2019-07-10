const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const connect = require('./database/index')
const TimeOut = require('../public/utils/time-out')

app.use(koaBody())
const router = require('./router/index')
const { port } = require('../config/config')


app.use(TimeOut)

// 引入路由
app.use(router.routes())
    .use(router.allowedMethods())

// 连接数据库
connect()

app.listen(port, () => {
    console.log(`server is runing at port ${port}`)
})
