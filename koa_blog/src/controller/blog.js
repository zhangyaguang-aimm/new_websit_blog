const BlogModel = require('../database/model/blog')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

class BlogController{
    constructor(){}

    // 获取文章列表
    static async getList(ctx){
        let pageNum = ctx.query.pageNum || 1
        let pageSize = ctx.query.pageSize || 10
        let searchKey = ctx.query.searchKey || ''
        let result = await BlogModel.aggregate([
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
                // 数组关联
                $lookup: {
                    from: 'tags',
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tagList'
                }
            },
            {
                $match: {
                    $or: [
                        {title: {$regex: searchKey,$options: '$i'}},
                    ]
                },
            },
            {$sort: {createAt: 1}},
            {$skip: (pageNum-1)*pageSize},
            {$limit: pageSize}
        ])
        let count = await BlogModel.find().count()
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
}


module.exports = BlogController