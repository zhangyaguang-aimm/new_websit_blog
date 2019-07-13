<template>
    <div class="user-center">
        <!-- <center-template></center-template> -->
        <div class="avatar">
            <img :src="userinfo.imgUrl || defaultImg" alt="">
        </div>
        <div class="introduction">
            {{userinfo.desc}}
        </div>
        <div class="line"></div>
        <div class="item">
            <div class="left">昵称</div>
            <div class="right">{{userinfo.username || '暂无'}}</div>
        </div>
        <div class="item">
            <div class="left">真实姓名</div>
            <div class="right">{{userinfo.realName || '暂无'}}</div>
        </div>
        <div class="item">
            <div class="left">邮箱</div>
            <div class="right">{{userinfo.email  || '暂无'}}</div>
        </div>
        <div class="item">
            <div class="left">手机号码</div>
            <div class="right">{{userinfo.telphone  || '暂无'}}</div>
        </div>
        <div class="item">
            <div class="left">github</div>
            <div class="right">{{userinfo.github || '暂无'}}</div>
        </div>
        <div class="item">
            <div class="left">网站</div>
            <div class="right">{{userinfo.website || '暂无'}}</div>
        </div>
        <div class="btn">
            <el-button @click="dialogVisible = true" type="primary" size='small'>修改信息</el-button>
        </div>


        <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="70%"
        >
        <center-template :form='userinfo' :closeModel='closeModel'></center-template>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CenterTemplate from '../../components/admin/userCenterTemplate'
export default {
    components: {
        'center-template': CenterTemplate
    },
    data () {
        return {
            defaultImg:  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            dialogVisible: false
        }
    },
    created () {
        this.init()  
    },
    computed: {
        ...mapState({
            userinfo: state => state.userinfo
        }) 
    }
         
    ,
    methods: {
        async init(){
            console.log(this.userinfo,'aaaa')
        },
        closeModel(){
            this.dialogVisible = false
        },
        childReloadPage(){
            this.dialogVisible = false
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
.user-center{
    box-sizing: border-box;
    padding: 20px;
    width: 600px;
    margin: 0 auto;
    text-align: center;
    .avatar{
        width: 100px;
        height: 100px;
        display: inline-block;
        img{
            width: 100%;
            border-radius: 50%;
            box-shadow: 2px 2px 5px #000;
        }
    }
    .introduction{
        font-size: 18px;
        color: #333;
        line-height: 1.5;
        margin: 40px 0;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .line{
        width: 100%;
        height: 20px;
        background: #ddd;
        margin-bottom: 20px;
    }
    .item{
        display: flex;
        font-size: 16px;
        border-bottom: 1px dashed #ddd;
        padding: 20px 0;
        .left{
            width: 100px;
            text-align: left;
        }
    }
    .btn{
        text-align: left;
        margin-top: 20px;
    }
}
</style>
