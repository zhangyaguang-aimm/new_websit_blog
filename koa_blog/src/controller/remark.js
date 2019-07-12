const RemarkModel = require('../database/model/remark')
const BlogModel = require('../database/model/blog')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

const mongoose = require('mongoose')

class RemarkController {
    constructor(){}
    // 新增回复
    static async addRemark(ctx){
        let req = ctx.request.body
        
        let tempObj = {
            content: req.content,
            zone: req.zone,
            guestInfo: req.guestInfo,
            createAt: Date.now()
        }
        if(req.author){
            tempObj.author = req.author
            
        }
        if(req.blogId){
            tempObj.blogId = req.blogId
        }
        let newRemark = new RemarkModel(tempObj)
        let result = await newRemark.save()
        ctx.body = new SuccessResModel({
            result: result
        },'评论成功')
        
    }

    // 获取列表
    static async getRemarkList(ctx){
        let pageNum = ctx.query.pageNum || 1
        let pageSize = ctx.query.pageSize || 10
        let resultTemp = await RemarkModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $match: {
                    blogId: ctx.query.blogId,
                    zone: ctx.query.zone
                }
            },
            {$sort: {createAt: -1}},
            {$skip: (pageNum-1)*pageSize},
            {$limit: pageSize},
        ])
        let result = await (function(){
            return new Promise(resolve => {
                RemarkModel.populate(resultTemp, {
                    path: 'replys',
                    options: {
                        sort: {createAt: -1}
                    },
                    populate: {path: 'author'},
                    
                }, function(err,res){
                    resolve(res)
                })
            })
        })()


        let count = await RemarkModel.count({blogId: ctx.query.blogId, zone: ctx.query.zone})
        ctx.body = new SuccessResModel({
            list: result,
            count: count
        })
    }
}


module.exports = RemarkController