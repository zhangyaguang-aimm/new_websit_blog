<template>
    <div class="detail">
        <div class="box">
            <div class="left">
                <div class="top">
                    <div class="title">{{blogInfo.title}}</div>
                    <div class="tips">
                        <div class="author tips-item">
                            <span class="el-icon-user-solid"></span>
                            {{blogInfo.userinfo && blogInfo.userinfo[0].username}}
                        </div>
                        <div class="time tips-item">
                            <span class="el-icon-time"></span>
                            {{blogInfo.createAt | getTime}}
                        </div>
                        <div class="click-num tips-item">
                            <span class="el-icon-view"></span>
                            {{blogInfo.clickNum}}
                        </div>
                        <div class="tag tips-item">
                            <span class="el-icon-collection-tag"></span>
                            <el-tag v-for="(item,index) in blogInfo.tags" 
                            :key="item._id" 
                            size='mini'
                            :type="(index/2 == 0)?'success':'info'">{{item.name}}</el-tag>
                        </div>
                    </div>
                </div>
                <div class="markdown" v-html="compiledMarkdown" v-highlight></div>
            </div> 
            <div class="right">
                <content-right></content-right>
            </div>
        </div>
    </div>
</template>
<script>
import contentRight from '../components/contentRight'

let marked = require('marked')
let hljs = require('highlight.js')
import 'highlight.js/styles/solarized-dark.css'
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
    components: {
        'content-right': contentRight,  
    },
    data () {
        return {
            blogInfo: {}
        }
    },
    filters: {
        getTime(val){
            val = new Date(val)
            return val.getFullYear()+'-'+(val.getMonth() + 1)+'-'+val.getDate() + ' ' + val.getHours() + ':' + val.getMinutes()
        }
    },
    computed: {
        compiledMarkdown(){
            return marked(this.blogInfo.content || '', {
                sanitize: true
            })
        }
    },
    created () {
        this.init()
    },
    methods: {
        async init(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            let _id = this.$route.params.id
            let result = await this.$axios.get('/blog/detail',{params:{_id: _id}})
            console.log(result)
            this.$axios.get('/dot/dotContent',{params:{_id: _id}})
            if(result.data.code == 1){
                this.blogInfo = result.data.data
            }
        }
    },
    watch: {
        '$route': function(to,from){
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
.detail{
    .box{
        max-width: 1140px;
        margin: 0 auto 20px;
        display: flex;
        justify-content: space-between;
        .left{
            width: 750px;
            background: #fff;
            .index-pagination{
                margin: 20px 0;
                background: #fff;
            }
            .markdown{
                padding: 0px 20px 40px;
            }
            .top{
                padding: 20px 20px 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                .title{
                    font-size: 26px;
                    font-weight: bold;
                    color: #555;
                }
                .tips{
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    .tips-item{
                        color: #999;
                        margin-right: 20px;
                        span{
                            margin-right: 2px;
                            color: rgb(116, 114, 114);
                        }
                    }
                }
            }
        }
        .right{
            width: 325px;
        }
    }
}

</style>
