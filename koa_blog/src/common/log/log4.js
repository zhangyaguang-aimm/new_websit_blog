const log4Config = require('./config')
const log4js = require('log4js')

// 调用配置文件
log4js.configure(log4Config)

// 封装log日志函数
let handleLogger = {
    reqLogger: function(ctx){
        // 请求日志
        log4js.getLogger('reqLogger').info(ctx)
    },
    resLogger: function(ctx,time){
        // 响应日志
        log4js.getLogger('resLogger').info(ctx,time)
    }
}





module.exports = (options) => {
    return async (ctx,next) => {
        const startTime = new Date()
        let period;
        handleLogger.reqLogger(ctx)
        
        await next()
        period = new Date() - startTime
        try{
            // 响应日志
            // console.log('aaa',period)
            handleLogger.resLogger(ctx,period)
        }catch(err){
            // 错误日志
        }
    }
}