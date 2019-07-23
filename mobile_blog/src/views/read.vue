<template>
    <div>
        <div class="read" v-show="chapterInfo.title && isHas">
            <div class="top">
                <div class="btn el-icon-back" @click="goBack">返回</div>
                <div class="btn home" @click="goHome">首页</div>
            </div>
            <div>
                <div class="title">{{chapterInfo.title}}</div>
                <div class="content" v-html="content"></div>
            </div>
            <div class="footer">
                <el-button v-if='prevFlag' @click="goPrev" type="warning" round class="prev">上一章</el-button>
                <el-button v-else type="info" round class="prev">上一章</el-button>
                <el-button @click="goList" type="warning" round class="prev">目录</el-button>
                <el-button @click="goNext" v-if="nextFlag" type="danger" round class="next">下一章</el-button>
                <el-button v-else type="info" round class="next">下一章</el-button>
            </div>
        </div>
        <div class="read" v-show="!chapterInfo.title && !isHas">
            <div class="title special">
                章节暂时缺失
            </div>
            <div class="footer">
                <el-button v-if='prevFlag' @click="goPrev" type="warning" round class="prev">上一章</el-button>
                <el-button v-else type="info" round class="prev">上一章</el-button>
                <el-button @click="goList"  type="warning" round class="prev">目录</el-button>
                <el-button @click="goNext" v-if="nextFlag" type="danger" round class="next">下一章</el-button>
                <el-button v-else type="info" round class="next">下一章</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            chapterInfo: {},
            nextFlag: true,
            prevFlag: true,
            isHas: true,
            nextChapterId: 0,
            prevChapterId: 0
        }
    },
    created () {
        this.initPage()
    },
    computed: {
        content(){
            if(this.chapterInfo.content){
                return this.chapterInfo.content.replace(/\n/g,'<br>')
            }else{
                return ''
            }
        },
        
    },
    methods: {
        
        initPage(){
            this.getChapterInfo({
                chapterId: this.$route.params.chapterId,
                bookId: this.$route.params.bookId
            })
        },
        async getChapterInfo(obj){
            console.log(obj)
            try{
                let result = await this.$axios.get('/book/chapter',{
                    params: {
                        chapterId: obj.chapterId,
                        bookId: obj.bookId
                    }
                })
                
                this.chapterInfo = result.data.data.chapter || {}
                this.isHas = !!result.data.data.chapter
                this.prevFlag = !!result.data.data.prevChapter
                this.nextFlag = !!result.data.data.nextChapter
                this.prevChapterId = result.data.data.prevChapter ? result.data.data.prevChapter.chapter_id : 0
                this.nextChapterId = result.data.data.nextChapter ? result.data.data.nextChapter.chapter_id : 0
            }catch(err){
                this.isHas = false
                console.log(err)
            }
        },
        goNext(){
            window.scrollTo(0,0); 
            this.$router.push('/read/' + this.$route.params.bookId + '/' + this.nextChapterId)
        },
        goPrev(){
            window.scrollTo(0,0); 
            this.$router.push('/read/' + this.$route.params.bookId + '/' + this.prevChapterId)
        },
        goBack(){
            this.$router.push('/detail/'+this.$route.params.bookId)
        },
        goHome(){
            this.$router.push('/')
        },
        goList(){
            this.$router.push('/chapterlist/'+this.$route.params.bookId)
        }
    },
    watch: {
        $route(){
            this.initPage()
        }
    }
}
</script>
<style lang="scss" scoped>
.read{
    background: url('../assets/images/read_skin.jpg') repeat-y;
    background-size: 100%;
    background-position: center;
    padding: 0 0 20px 0;
    font-family: sans-serif;
    min-height: 100vh;
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background: transparent;
        height: 80px;
        .btn{
            border-radius: 5px;
            color: #409EFF;
            font-size: 30px;
            letter-spacing: 5px;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .title{
        font-size: 50px;
        font-weight: 600;
        text-align: center;
        line-height: 80px;
        &.special{
            min-height: 80vh;
            line-height: 80vh;
        }
    }
    .content{
        padding: 20px;
        font-size: 36px;
        line-height: 60px;
        letter-spacing: 5px;
        
    }
    .footer{
        display: flex;
        align-items: center;
        justify-content: space-around;
        .prev{
            width: 200px;
            height: 60px;
            border-radius: 60px;
            font-size: 30px;
            cursor: pointer;
        }
        .next{
            width: 200px;
            height: 60px;
            border-radius: 60px;
            font-size: 30px;
            cursor: pointer;
        }
    }
}
</style>

