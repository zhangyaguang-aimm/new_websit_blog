const log4Config = require('./config')
const log4js = require('log4js')

// 调用配置文件
log4js.configure(log4Config)


class CommonHandle {
    constructor(){}
    // 格式化请求日志
    static formatReqLog(ctx, time){
        let text = '------------request start------------'
        let method = ctx.method
        text += `request method:  ${method} \n request url: ${ctx.originalUrl } \n`

        if(method = 'GET'){
            text += `request data: ${JSON.stringify(ctx.query)} \n`
        }else{
            text += `request data: ${JSON.stringify(ctx.body)} \n`
        }
        text += `ctx all: ${JSON.stringify(ctx)}`
        return text
    }
    // 格式化相应日志
    static formatResLog(ctx,time){
        let text = '------------response start------------'
        text += `response result: ${JSON.stringify(ctx.response.body)} \n`

        text += `response all: ${JSON.stringify(ctx)} \n`

        text += `response time: ${time} \n`
        return text
    }
    // 格式化错误日志
    static formatErrorLog(ctx,error,time){
        let text = '------------error start------------'
        text += this.formatResLog(ctx,time)
        text += `error content: ${JSON.stringify(error)}`

        return text
    }
}

class HandleLogger extends CommonHandle{
    constructor(){
        super()
    }

    // 请求日志
    static reqLogger(ctx){
        log4js.getLogger('reqLogger').info(this.formatReqLog(ctx))
    }

    // 相应日志
    static resLogger(ctx, time){
        log4js.getLogger('resLogger').info(this.formatResLog(ctx,time))
    }

    // 错误日志
    static errorLogger(ctx, error, time){
        log4js.getLogger('errLogger').info(this.formatErrorLog(ctx,error,time))
    }

}






module.exports = (options) => {
    return async (ctx,next) => {
        const startTime = new Date()
        let period;
        console.log(ctx)
        try{
            // 请求日志
            HandleLogger.reqLogger(ctx)
            await next()
            period = new Date() - startTime
            // 响应日志
            HandleLogger.resLogger(ctx,period)
        }catch(err){
            period = new Date() - startTime
            // 错误日志
            HandleLogger.errorLogger(ctx, err, period)
        }
    }
}