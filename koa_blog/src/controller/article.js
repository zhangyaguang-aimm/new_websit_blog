const ArticleModel = require('../database/model/article')
const UserModel = require('../database/model/user')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

const mongoose = require('mongoose')

class ArticleController{
    constructor(){}

    // 获取个人日记列表
    static async getList(ctx){
        let pageNum = ctx.query.pageNum || 1
        let pageSize = ctx.query.pageSize || 10
        let searchKey = ctx.query.searchKey || ''

        let author = ctx.query.author
        let matchObj = {}
        if(author){
            matchObj.author = mongoose.Types.ObjectId(author)
        }
        let userOne = await UserModel.findOne({_id: mongoose.Types.ObjectId(author)})
        if(userOne && userOne.power >= 8){
            delete matchObj.author
        }

        let result = await ArticleModel.aggregate([
            {
                // 单个关联
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'userinfo'
                }
            },
            {
                $match: Object.assign({
                    $or: [
                        {title: {$regex: searchKey,$options: '$i'}},
                    ],
                },matchObj),
            },
            {$sort: {createAt: -1}},
            {$skip: (pageNum-1)*pageSize},
            {$limit: pageSize},
        ])
        // 获取指定查询条件的文档数量
        let count = await ArticleModel.count(Object.assign({
            title: {$regex: searchKey,$options: '$i'}},matchObj))
        if(result && result.length >= 0){
            ctx.body = new SuccessResModel({
                list: result,
                count: count
            }, '获取成功')
            return
        }
        ctx.body = new ErrorResModel('获取失败')
    }
    // 新增个人日记
    static async addArticle(ctx){
        try{
            let req = ctx.request.body
            let result = await ArticleModel.findOne({title: req.title})
            if(result){
                ctx.body = new ErrorResModel('标题已存在')
                return
            }
            let newArticle = new ArticleModel({
                title: req.title,
                content: req.content,
                createAt: req.createAt || Date.now(),
                modeifyAt: req.modeifyAt || Date.now(),
                isShow: req.isShow || true,
                imgUrl: req.imgUrl,
                isTop: req.isTop,
                author: req.author
            })
            let resultSave = await newArticle.save()
            ctx.body = new SuccessResModel({
                data: resultSave
            }, '保存成功')
        }catch(err){
            ctx.body = new ErrorResModel('请填写完成数据')
        }
    }

    // 更新文章
    static async updateArticle(ctx){
        try{
            let req = ctx.request.body
            console.log(req._id)
            let newArticle = new ArticleModel({
                title: req.title,
                content: req.content,
                createAt: req.createAt || Date.now(),
                modeifyAt: req.modeifyAt || Date.now(),
                isShow: req.isShow || true,
                imgUrl: req.imgUrl,
                isTop: req.isTop,
                author: req.author,
                _id: mongoose.Types.ObjectId(req._id)
            })
            let result = await ArticleModel.updateOne({'_id':mongoose.Types.ObjectId(req._id)},newArticle)
            console.log(result)
            ctx.body = new SuccessResModel({
                data: result
            },'更新成功')
        }catch(err){
            console.log(err)
            ctx.body = new ErrorResModel('请填写完成数据')
        }
    }

    // 获取一个blog信息
    static async getOneArticle(ctx){
        let _id = ctx.query._id
        let result = await ArticleModel.aggregate([
            {
                // 单个关联
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'userinfo'
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id)
                },
            }
        ])
        

        if(result.length > 0){
            ctx.body = new SuccessResModel(result[0], '获取成功')
        }else{
            ctx.body = new ErrorResModel('未找到对应文章')
        }
    }
}


module.exports = ArticleController