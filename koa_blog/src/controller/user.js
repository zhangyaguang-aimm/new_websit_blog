
const UserModel = require('../database/model/user')
const { 
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

const jwtClass = require('../../public/utils/jwt')


class UserController{
    constructor(){

    }
    // 注册用户
    static async registerUser(ctx){
        let req = ctx.request.body
        let result = await UserModel.findOne({'username': req.username})
        if(result){
            ctx.body = new ErrorResModel('用户名已存在')
            return
        }
        
        let newUser = new UserModel({
            username: req.username,
            password: req.password,
            power: req.username == 'admin' ? 1 : 10
        })
        await newUser.save()
        ctx.body = new SuccessResModel('注册成功')
    }
    // 登录
    static async loginUser(ctx){
        let req = ctx.request.body
        let result = await UserModel.findOne({'username': req.username})
        if(result){
            let token = new jwtClass({username: req.username}).createToken()
            console.log(token)
            ctx.body = new SuccessResModel(token, '登录成功')
        }
        
    }
    // 获取用户信息
    static async getUserInfo(ctx){
        
        let token = ctx.headers['token'] || ''
        let resultToken = new jwtClass('',token).verifyToken()
        
        if(!resultToken){
            ctx.body = new ErrorResModel('登录已失效')
            return
        }

        let result = await UserModel.findOne({'username': ctx.query.username}) 
        ctx.body = new SuccessResModel(result,'获取成功')

    }
    // 获取用户列表
    static async getUserList(ctx){

    }
}

module.exports = UserController