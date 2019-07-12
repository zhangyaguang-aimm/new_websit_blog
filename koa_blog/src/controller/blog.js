const BlogModel = require('../database/model/blog')
const ArticleModel = require('../database/model/article')
const UserModel = require('../database/model/user')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

const mongoose = require('mongoose')

class BlogController{
    constructor(){}

    // 获取文章列表
    static async getList(ctx){
        let pageNum = ctx.query.pageNum || 1
        let pageSize = ctx.query.pageSize || 10
        let searchKey = ctx.query.searchKey || ''
        /**
         * 这一块是处理权重的问题的，超级管理员和普通用户，后台管理页面的
         * 获取到的列表是不同的
          */
        let author = ctx.query.author
        let matchObj = {}
        if(author){
            matchObj.author = mongoose.Types.ObjectId(author)
        }
        let userOne = await UserModel.findOne({_id: mongoose.Types.ObjectId(author)})
        if(userOne && userOne.power >= 8){
            delete matchObj.author
        }


        let resultTemp = await BlogModel.aggregate([
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

        // 数组类型关联
        let result = await (function(){
            return new Promise(resovlve => {
                BlogModel.populate(resultTemp, 'tags', function(err,res){
                    resovlve(res)
                })
            })
        })()
        // 获取指定查询条件的文档数量
        let count = await BlogModel.count(Object.assign({
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
    // 新增文章
    static async addBlog(ctx){
        try{
            let req = ctx.request.body
            let result = await BlogModel.findOne({title: req.title})
            if(result){
                ctx.body = new ErrorResModel('标题已存在')
                return
            }
            let newBlog = new BlogModel({
                title: req.title,
                content: req.content,
                createAt: req.createAt || Date.now(),
                modeifyAt: req.modeifyAt || Date.now(),
                isShow: req.isShow || true,
                imgUrl: req.imgUrl,
                isTop: req.isTop,
                tags: req.tags || [],
                author: req.author
            })
            let resultSave = await newBlog.save()
            ctx.body = new SuccessResModel({
                data: resultSave
            }, '保存成功')
        }catch(err){
            ctx.body = new ErrorResModel('请填写完成数据')
        }
    }

    // 更新文章
    static async updateBlog(ctx){
        try{
            let req = ctx.request.body
            console.log(req._id)
            let newBlog = new BlogModel({
                title: req.title,
                content: req.content,
                createAt: req.createAt || Date.now(),
                modeifyAt: req.modeifyAt || Date.now(),
                isShow: req.isShow || true,
                imgUrl: req.imgUrl,
                tags: req.tags || [],
                isTop: req.isTop,
                author: req.author,
                _id: mongoose.Types.ObjectId(req._id)
            })
            let result = await BlogModel.updateOne({'_id':mongoose.Types.ObjectId(req._id)},newBlog)
            console.log(result)
            ctx.body = new SuccessResModel({
                data: result
            },'更新成功')
        }catch(err){
            console.log(err)
            ctx.body = new ErrorResModel('请填写完成数据')
        }
    }

    // 获取最新的列表
    static async newBlogList(){
        let result = await BlogModel.find().sort({createAt: -1}).limit(3)
        return result
    }
    // 最热的列表
    static async hotBlogList(count){
        count = count?count:3

        let result = await BlogModel.find({isTop: true}).sort({createAt: -1}).limit(parseInt(count))
        return result
    }
    // 获取最新热列表
    static async getHotList(ctx){
        let result = await this.hotBlogList(ctx.query.count)
        ctx.body = new SuccessResModel({
            result: result
        }, '请求成功')
    }
    // 获取最热和最新
     static async newHotList(ctx){
        try{
            let newBlog = await this.newBlogList()
            let hotBlog = await this.hotBlogList()

            ctx.body = new SuccessResModel({
                newBlogList: newBlog,
                hotBlogList: hotBlog
            },'获取成功')
        }catch(err){
            ctx.body = new ErrorResModel('获取失败')
        }
    }
    // 获取一个blog信息(这个是结合了文章和博客的两个库)
    static async getOneBlog(ctx){
        let _id = ctx.query._id
        let resultTemp = await BlogModel.aggregate([
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
         // 数组类型关联
         let result = await (function(){
            return new Promise(resovlve => {
                BlogModel.populate(resultTemp, 'tags', function(err,res){
                    resovlve(res)
                })
            })
        })()

        let resultArticle = await ArticleModel.aggregate([
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
        
        if(result.length > 0 || resultArticle.length > 0){
            let resultObj = result[0] || resultArticle[0]
            ctx.body = new SuccessResModel(resultObj, '获取成功')
        }else{
            ctx.body = new ErrorResModel('未找到对应文章')
        }
    }
}


module.exports = BlogController