const CategoryModel = require('../database/model/category')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')

class CategoryController{
    constructor(){

    }
    // 新增分类
    static async addCategory(ctx){
        let req = ctx.request.body
        let result = await CategoryModel.findOne({name: req.name})

        if(result){
            ctx.body = new ErrorResModel('分类已存在')
            return
        }
        let newCategory = new CategoryModel({
            name: req.name
        })
        await newCategory.save()
        ctx.body = new SuccessResModel('保存成功')
    }
    // 获取分类列表
    static async getCategoryList(ctx) {
        let result = await CategoryModel.find().sort({createAt: 1})

        ctx.body = new SuccessResModel(result, '获取成功')
    }
}


module.exports = CategoryController