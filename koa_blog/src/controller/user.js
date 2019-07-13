
const UserModel = require('../database/model/user')
const { 
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

const jwtClass = require('../../public/utils/jwt')

// 密码加密
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


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

        // 密码加密
        let password = req.password
        let hashPassword = await bcrypt.hash(password,10)

        let newUser = new UserModel({
            username: req.username,
            password: hashPassword,
            power: req.username == 'admin' ? 10 : 1,
            modifyAt: req.modifyAt || '',
            email: req.email || '',
            telphone: req.telphone || '',
            realName: req.realName || ''
        })
        let resultSave = await newUser.save()
        let token = new jwtClass({username: req.username}).createToken()
        ctx.body = new SuccessResModel({
            token: token,
            userinfo: resultSave
        },'注册成功')
    }
    // 登录
    static async loginUser(ctx){
        let req = ctx.request.body

        let result = await UserModel.findOne({'username': req.username})
        let flag = await bcrypt.compare(req.password,result.password)
        if(!flag){
            // 验证不通过
            ctx.body = new ErrorResModel('账号密码不正确')
            return
        }
        if(result){
            let token = new jwtClass({username: req.username}).createToken()
            ctx.body = new SuccessResModel({
                token: token,
                userinfo: result
            }, '登录成功')
            return
        }
        ctx.body = new ErrorResModel('账号密码不正确')
        
    }
    // 获取用户信息
    static async getUserInfo(ctx){
        
        let token = ctx.headers['token'] || ''
        let resultToken = new jwtClass('',token).verifyToken()
        
        if(!resultToken){
            ctx.body = new ErrorResModel('登录已失效')
            return
        }
        let result = await UserModel.findOne({_id: mongoose.Types.ObjectId(ctx.query._id)}) 
        ctx.body = new SuccessResModel(result,'获取成功')

    }
    // 获取用户列表
    static async getUserList(ctx){
        
    }
    // 更新用户
    static async updateUser(ctx){
        let req = ctx.request.body
        let updateUser = req
        Object.keys(updateUser).forEach((key) => {
            if(!updateUser[key]){
                delete updateUser[key]
            }
        })
        let result = await UserModel.updateOne({_id: mongoose.Types.ObjectId(req._id)},updateUser)
        if(result.nModified == 1){
            ctx.body = new SuccessResModel('更新成功')
        }else{
            ctx.body = new ErrorResModel('更新失败')
            
        }
    }
}

module.exports = UserController