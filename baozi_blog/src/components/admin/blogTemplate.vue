<template>
    <div class="blog-template">
        <el-form label-position="right" 
        label-width="80px" 
        :model="form">
            <el-form-item class="blog-item-input" label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标签" v-show="tagFlag">
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
            <el-form-item v-if="power > 8" label="置顶">
                <el-switch
                v-model="form.isTop"
                @change='changeTop'
                >
                </el-switch>
            </el-form-item>
            <el-form-item class="blog-item-input" label="图片">
                <el-upload
                action="/blog/v1/img/upload"
                list-type="picture-card"
                :limit='limitImg'
                :file-list="getImg"
                :on-success="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                    <img width="100%" :src="form.imgUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <mavon-editor 
        class="blog-content" 
        ref='md'
        v-model="form.content"
        @imgAdd="imgAdd"
        ></mavon-editor>
        
        <el-button v-if="modifyFlag" class="publish" @click="updateBlog" type='primary' size='small'>修改文章</el-button>
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
        },
        form: {
            type: Object,
            default: function(){
                return {
                    title: '',
                    createAt: '',
                    tags: '',
                    imgUrl: '',
                    isTop: false
                }
            }
        },
        tagFlag: {
            type: Boolean,
            default: true,
        },
        updateContent: {
            type: Function,
            default: null
        },
        
        
    },
    components: {
        mavonEditor,
    },
    computed: {
        getImg(){
            if(this.form.imgUrl){
                return [{name: '', url: this.form.imgUrl}]
            }
            return []
        }  
    },
    data () {
        return {
            limitNum: 3,
            limitImg: 1,
            options: [],
            power: 0
        }
    },
    created () {
        this.getTagList()
        if(localStorage.getItem('userinfo')){
            this.power = JSON.parse(localStorage.getItem('userinfo')).power
        }
        console.log(this.power, 'aaa')
        
    },
    mounted (){
        
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
            if(val.code == 1){
                this.form.imgUrl = val.data.url
            }
        },
        handleRemove(val){
            console.log(val)
        },
        // 置顶开关
        changeTop(val){
            this.form.isTop = val
            console.log(val)
        },
        // 调用父元素的发布文章
        publishBlog(){
            if(this.$parent.publishBlog){
                this.$parent.publishBlog(this.form)
            }
        },
        imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append('file', $file);
            this.$axios({
                url: '/img/upload',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                console.log(res)
                this.$refs.md.$img2Url(pos, res.data.data.url);
            })
        },
        // 调用父元素的更新文章
        updateBlog(){
            if(this.updateContent){
                this.updateContent(this.form)
            }
        },
        
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
