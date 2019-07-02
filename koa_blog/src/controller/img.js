const ImgModel = require('../database/model/img')
const fs = require('fs')

const {
    SuccessResModel,
    ErrorResModel
} = require('../common/resModel')
const multer = require('koa-multer')
const qn = require('qn')


// 空间名
const bucket = 'blog'
// 七牛云配置
const client = qn.create({
    accessKey: 'h-zLAK2Jj2OJYZkeOC9GXzSkbaPZCE2GU3J_DukY', // 秘钥
    secretKey: 'Yyw9g9-UXH10Grfxgenp70-02wR7nsbD__MLcENW', // 秘钥
    bucket: bucket, // 空间名
    origin: 'http://img.baozinews.cn', // 外链地址，
})
// 图片配置
let storage = multer.diskStorage({
    // 文件路径保存
    destination: function (req, file, cb) { 
        console.log(file,'-------')
        cb(null, 'upload/')
    },
    filename: function(req, file, cb){
        let fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})


class ImgController{
    constructor(){

    }
    // 获取列表
    static async getList(ctx){

    }

    // 把图片上传到七牛的封装函数
    static uploadQiniu(){
        
        // 加载配置
        let upload = multer({storage: storage})
        return upload
    }
    // 上传图片的函数
    async clientImg(){
        
    }
    // 上传图片到七牛
    static async uploadImg(ctx){

        let file = ctx.req.file
        let filePath = file.destination + file.filename
        function clientImg(){
            return new Promise((resolve, reject) => {
                client.uploadFile(filePath, {key: `blog/static/${file.filename}`}, function(err,result){
                    try{
                        resolve(result)
                    }catch(err){
                        reject(err)
                    }
                })
            })
        }
        console.log(filePath,'aaa')
        let result = await clientImg()
        // 删除本地的图片
        fs.unlinkSync(filePath)
        ctx.body = new SuccessResModel({
            url: result.url
        },'保存成功')
    }

}


module.exports = ImgController