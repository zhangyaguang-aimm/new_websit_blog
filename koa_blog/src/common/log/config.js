let path = require('path');

// 日志根目录
let baseLogPath = path.resolve(__dirname, '../../../logs');
// 请求日志目录
let reqPath = '/request';
// 请求日志文件名
let reqFileName = 'request';
// 请求日志输出完整路径
let reqLogPath = baseLogPath + reqPath + '/' + reqFileName;


// 响应日志目录
let resPath = '/response';
// 响应日志文件名
let resFileName = 'response';
// 响应日志输出完整路径
let resLogPath = baseLogPath + resPath + '/' + resFileName;

// 错误日志目录
let errPath = '/error';
// 错误日志文件名
let errFileName = 'error';
// 错误日志输出完整路径
let errLogPath = baseLogPath + errPath + '/' + errFileName;


module.exports = {
    appenders: {
        // 所有的日志
        'console': {type: 'console'},
        // 请求日志
        'reqLogger': {
            type: 'dateFile',
            filename: reqLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 3,
            path: reqPath,
            layout: {
                type: 'basic'
            }
        },
        // 响应日志
        'resLogger': {
            type: 'dateFile',
            filename: resLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 1,
            path: resPath,
            layout: {
                type: 'basic'
            }
        },
        // 错误日志
        'errLogger': {
            type: 'dateFile',
            filename: errLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 1,
            path: errPath,
            layout: {
                type: 'basic'
            }
        }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'all'
        },
        reqLogger: {
            appenders: ['reqLogger'],
            level: 'info'
        },
        resLogger: {
            appenders: ['resLogger'],
            level: 'info'
        },
        errLogger: {
            appenders: ['errLogger'],
            level: 'error'
        }
    },
    pm2: true,
    replaceConsole: true
}