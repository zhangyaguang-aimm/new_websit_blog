<template>
    <div class="discuss-content-con">
        <div class="tip"><span class="el-icon-notebook-1"></span>发表评论<i v-show="isShowReply" class="cancle" @click="cancleReply">取消回复</i></div>
        <div class="user-temp">
            <el-input class="user-temp-item" v-model="guestInfo.nickname" placeholder="昵称"></el-input>
            <el-input class="user-temp-item" v-model="guestInfo.email" placeholder="邮箱"></el-input>
            <el-input class="user-temp-item" v-model="guestInfo.website" placeholder="网址"></el-input>
        </div>
        <div class="discuss-content">
            <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="写点什么..."
            v-model="content">
            </el-input>
        </div>
        <div class="disucss-publish">
            <el-button @click="goPublish" type="primary" size='small'>提交</el-button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        isShowReply: {
            type: Boolean,
            default: false
        },
        zone: {
            type: String,
            default: 'blog'
        },
        remarkId: String
    },
    data () {
        return {
            content: '',
            guestInfo: {
                nickname: '',
                email: '',
                website: ''
            },
            author: ''
        }
    },
    created () {
        let userinfo = localStorage.getItem('userinfo')
        console.log(userinfo)
        if(userinfo){
            userinfo = JSON.parse(userinfo)
            this.author = userinfo._id
        }
    },
    methods: {
        cancleReply(){
            if(this.$parent.cancleReply){
                this.$parent.cancleReply()
            }
        },
        async goPublish(){
            
            let regEmail=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if(!this.content){
                this.$message({
                    type: 'error',
                    message: '请填写内容'
                })
                return
            }else if(!this.author && !this.guestInfo.nickname){
                this.$message({
                    type: 'error',
                    message: '请填写昵称'
                })
                return
            }else if(!this.author && !regEmail.test(this.guestInfo.email)){
                this.$message({
                    type: 'error',
                    message: '请填写正确邮箱'
                })
                return
            }
            if(this.isShowReply){
                // 回复评论
                let resultReply = await this.$axios.post('/reply/add', {
                    content: this.content,
                    guestInfo: this.guestInfo,
                    zone: this.zone,
                    remarkId: this.remarkId,
                    author: this.author
                })
                if(resultReply.data.code == 1){
                    this.$message({
                        type: 'success',
                        message: '评论成功'
                    })
                }
                return
            }
            // 发表评论
            let result = await this.$axios.post('/remark/add',{
                content: this.content,
                guestInfo: this.guestInfo,
                zone: this.zone,
                author: this.author
            }) 
            if(result.data.code == 1){
                this.$message({
                    type: 'success',
                    message: '评论成功'
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.discuss-content-con{
    .tip{
        width: 100%;
        border-bottom: 1px solid #ddd;
        padding: 0 8px 6px;
        box-sizing: border-box;
        color: #333;
        span{
            margin-right: 6px;
        }
        .cancle{
            color: #e74851;
            font-size: 12px;
            font-style: normal;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .user-temp{
        display: flex;
        padding: 20px 10px 20px 0;
        box-sizing: border-box;
        .user-temp-item{
            margin-left: 10px;
        }
    }
    .discuss-content{
        box-sizing: border-box;
        // padding: 10px;
    }
    .disucss-publish{
        margin: 20px 0;
    }
    
}
</style>
