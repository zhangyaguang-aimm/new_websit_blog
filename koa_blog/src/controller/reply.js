const ReplyModel = require('../database/model/reply')
const RemarkModel = require('../database/model/remark')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel') 

const mongoose = require('mongoose')

class ReplyController {
    constructor(){}
    static async addReply(ctx){
        let req = ctx.request.body
        let tempObj = {
            content: req.content,
            zone: req.zone,
            guestInfo: req.guestInfo,
            remarkId: req.remarkId,
            createAt: Date.now()
        }
        if(req.author){
            tempObj.author = req.author
        }
        if(req.blogId){
            tempObj.blogId = req.blogId
        }
        let newReply = new ReplyModel(tempObj)
        let result = await newReply.save()
        await RemarkModel.updateOne({_id: req.remarkId},{$push: {replys: result._id}})
        ctx.body = new SuccessResModel({
            result: result
        },'评论成功')
    }
}


module.exports = ReplyController