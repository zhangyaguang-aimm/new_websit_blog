<template>
    <div class="blog-template">
        <el-form label-position="right" 
        label-width="80px" 
        :model="form">
            <el-form-item class="blog-item-input" label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                class="blog-item-input"
                :multiple-limit='limitNum'
                v-model="form.tags"
                multiple
                placeholder="请选择"
                >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期时间">
                <el-date-picker
                class="blog-item-input"
                v-model="form.createAt"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="blog-item-input" label="图片">
                <el-upload
                action="/blog/v1/img/upload"
                list-type="picture-card"
                :limit='limitImg'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                    <img width="100%" :src="form.imgUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <mavon-editor class="blog-content" v-model="form.content"></mavon-editor>
        
        <el-button v-if="modifyFlag" class="publish" type='primary' size='small'>修改文章</el-button>
        <el-button v-else class="publish" type='primary' size='small' @click="publishBlog">发布文章</el-button>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    props: {
        modifyFlag: {
            type: Boolean,
            default: false
        }
    },
    components: {
        mavonEditor,
    },
    data () {
        return {
            limitNum: 3,
            limitImg: 1,
            form: {
                title: '',
                createAt: '',
                tags: '',
                imgUrl: ''
            },
            options: [],
        }
    },
    created () {
        this.getTagList()
    },
    methods: {
        async getTagList(){
            let result = await this.$axios.get('/tag/list')
            console.log(result)
            if(result.data.code == 1){
                this.options = result.data.data.list.map((val) => {
                    return {
                        value: val._id,
                        label: val.name
                    }
                })
            }
        },
        handlePictureCardPreview(val){
            console.log(val)
        },
        handleRemove(val){
            console.log(val)
        },
        async publishBlog(){
            this.form.createAt = new Date(this.form.createAt).getTime()
            let result = await this.$axios.post('/blog/add',Object.assign(
                this.form, {author: JSON.parse(localStorage.getItem('userinfo'))._id}
            ))
            if(result && result.data.code == 1){
                this.$message({
                    type: 'success',
                    message: result.data.message
                })
                this.$router.push('/admin')
            }else{
                this.$message({
                    type: 'error',
                    message: result.data.message
                })
            }
        }
    }
}
</script>
<style lang="scss">
.blog-template{
        
}
</style>

<style lang="scss" scoped>
.blog-template{
    box-sizing: border-box;
    padding: 20px;
    .blog-item-input{
        width: 100%;
    }
    .blog-item-span{
        width: 50%;
        display: inline-block;float: left;
        overflow: hidden;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
    .blog-content{
        height: 900px;
        width: 100%;
        padding: 0 0 0 40px;
        box-sizing: border-box;
    }
    .publish{
        margin-top: 10px;
        float: right;
        margin-bottom: 20px;
    }
}
</style>
