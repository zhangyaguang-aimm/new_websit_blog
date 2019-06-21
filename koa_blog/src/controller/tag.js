const TagModel = require('../database/model/tag')

const { 
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')


class TagController{
    constructor(){

    }

    // 新增标签
    static async addTag(ctx) {
        let req = ctx.request.body
        console.log(req)
        let result = await TagModel.findOne({'name': req.name})
        if(result){
            ctx.body = new ErrorResModel('标签已存在')
            return
        }
        let newTag = new TagModel({
            name: req.name
        })
        await newTag.save()
        ctx.body = new SuccessResModel('保存成功')
    }

    static async getTagList(ctx) {
        let pageNum = ctx.query.pageNum || 0
        let pageSize = ctx.query.pageSize || 10
        let result = await TagModel.find()
                .sort({createAt: 1}).skip(pageNum*pageSize)
                .limit(pageSize)
        let count = await TagModel.find().count()
        if(result && result.length >= 0){
            ctx.body = new SuccessResModel({
                list:result,
                count: count
            }, '获取成功')
            return
        }
        ctx.body = new SuccessResModel('获取失败')
    }

    static async deleteTag(ctx){
        console.log(ctx.query)
        let result = await TagModel.remove({_id: ctx.query.id})
        console.log(result)
        if(result && result.ok == 1){
            ctx.body = new SuccessResModel('删除成功')
            return
        }
        ctx.body = new SuccessResModel('删除失败')
    }

    static async editTag(ctx){
        console.log(ctx.query)
        let result = await TagModel.update({_id: ctx.query._id},{name: ctx.query.name})
        console.log(result)
        if(result && result.ok == 1){
            ctx.body = new SuccessResModel('更新成功')
            return
        }
        ctx.body = new ErrorResModel('更新失败')
    }
}


module.exports = TagController