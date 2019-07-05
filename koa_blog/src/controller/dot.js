const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

const BlogModel = require('../database/model/blog')
const ArticleModel = require('../database/model/article')

const mongoose = require('mongoose')


class DotController{
    constructor(){}

    // 文章观看的次数
    static async dotContentNums(ctx){
        let _id = ctx.query._id
        let result = await BlogModel.updateOne({_id: mongoose.Types.ObjectId(_id)},{$inc: {clickNum: 1}})
        let resultArticle = await ArticleModel.updateOne({_id: mongoose.Types.ObjectId(_id)},{$inc: {clickNum: 1}})
        if(result.nModified == 1 || resultArticle.nModified == 1){
            ctx.body = new SuccessResModel('请求成功')
        }else{
            ctx.body = new ErrorResModel('请求失败')
        }
    }
}

module.exports = DotController