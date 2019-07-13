<template>
    <div class="center-template">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="昵称">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.realName" :maxlength='10'></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="github">
                <el-input v-model="form.github"></el-input>
            </el-form-item>
            <el-form-item label="网站">
                <el-input v-model="form.website"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input type='tel' :maxlength='11' v-model="form.telphone"></el-input>
            </el-form-item>
            
            <el-form-item label="出生年月">
                <el-col>
                <el-date-picker type="datetime" placeholder="出生年月" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item class="el-item" label="图片">
                <el-upload
                action="/blog/v1/img/upload"
                list-type="picture-card"
                :limit='1'
                :file-list="getImg"
                :on-success="handlePictureCardPreview"
                >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                    <img width="100%" :src="form.imgUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="性别" class="el-item">
                <el-radio-group @change="handleSexChange" v-model="form.sex">
                    <el-radio label='1'>男</el-radio>
                    <el-radio label='2'>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="个人描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即更新</el-button>
                <el-button @click="closeModelChild">取消</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        closeModel: Function,
        form: {
            type: Object,
            default: {
                sex: '1',
            }
        }
    },
    data () {
        return {
        }
    },
    computed: {
        getImg(){
            if(this.form.imgUrl){
                return [{name: '', url: this.form.imgUrl}]
            }
            return []
        }  
    },
    methods: {
        // 图片上传成功
        handlePictureCardPreview(val){
            if(val.code == 1){
                this.form.imgUrl = val.data.url
            }
        },
        // 改变性别选项
        handleSexChange(val){
            console.log(this.form, val)
        },
        async onSubmit(){
            
            let result = await this.$axios.post('/user/update', Object.assign({_id: JSON.parse(localStorage.getItem('userinfo'))._id},this.form))
            console.log(result)
            if(result.data.code == 1){
                this.$message({
                    type: 'success',
                    message: result.data.message
                })
                this.$store.dispatch('getUser')
                this.closeModel()
            }else{
                this.$message({
                    type: 'error',
                    message: result.data.message
                })
            }
        },
        closeModelChild(){
            this.closeModel()
        },
        ...mapActions({
            getUser: 'getUser'
        })
    }
}
</script>
<style lang="scss" scoped>
.center-template{
    .el-item{
        text-align: left;
    }
}
</style>
