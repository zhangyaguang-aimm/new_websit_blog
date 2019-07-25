<template>
    <div class="detail" v-show="blogInfo.title">
        <div class="top">
            <div class="top-title">
                {{blogInfo.title}}
            </div>
            <div class="top-tip">
                <div class="author top-item"><span class="el-icon-s-custom"></span>{{ blogInfo.userinfo && blogInfo.userinfo[0].username}}</div>
                <div class="time top-item"><span class="el-icon-date"></span>{{blogInfo.createAt | getTime}}</div>
                <div class="click-num top-item"><span class="el-icon-view"></span>{{blogInfo.clickNum}}</div>
            </div>
        </div>
        <div class="markdown" v-html="compiledMarkdown" v-highlight></div>
    </div>
</template>
<script>
let marked = require('marked')
let hljs = require('highlight.js')
import 'highlight.js/styles/atom-one-dark.css'
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {    
            return hljs.highlight(lang, code, true).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
})
export default {
    data () {
        return {
            blogInfo: {},
        }
    },
    created () {
        this.getBookInfo()
    },
    computed: {
        compiledMarkdown(){
            return marked(this.blogInfo.content || '', {
                sanitize: true
            })
        }
    },
    watch: {
      '$route': function(){
          this.getBookInfo()
      }  
    },
    filters: {
        getTime(val){
            val = new Date(val)
            return val.getFullYear()+'-'+(val.getMonth() + 1)+'-'+val.getDate()
        },  
    },
    methods: {
        async getBookInfo(){
            try{
                let _id = this.$route.params.id
                let result = await this.$axios.get('/blog/detail',{params:{_id: _id}})
                // this.$axios.get('/dot/dotContent',{params:{_id: _id}})
                if(result.data.code == 1){
                    this.blogInfo = result.data.data
                    console.log(this.blogInfo)
                }
            }catch(err){
                this.$message({
                    message: '请求失败',
                    type: 'error'
                })
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.detail{
    .markdown{
        box-sizing: border-box;
        padding: 20px;
        font-size: 26px;
        p{
            word-wrap: break-word;
            img{
                width: 100%;
            }
        }
    }
    
    .top{
        padding: 30px 20px 0;
        .top-title{
            font-size: 40px;
            font-weight: bold;

        }
        .top-tip{
            display: flex;
            margin-top: 30px;
            color: #a9a6a6;
            .top-item{
                margin-right: 20px;
                span{
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
