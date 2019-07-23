<template>
    <div class="list">
        <v-header class="header" :title='bookInfo.name'></v-header>
        <scroller ref="my_scroller" class="box" :on-refresh='refresh' :on-infinite="infinite">
            <div >
                <div v-for='item in list' :key="item.chapter_id" class="item" @click="goRead(item)"> 
                    {{item.title}}
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
import vHeader from '../components/headerNav'
export default {
    components: {
        'v-header': vHeader
    },
    data () {
        return {
            pageNum: 0,
            list: [],
            bookInfo: {},
            flag: true, // 是否允许继续加载更多
        }
    },
    created () {
        // this.initPage()
    },
    methods: {
        // 下拉刷新
        refresh(){
            console.log('aa')
            setTimeout(()=> {
                this.$refs.my_scroller.finishPullToRefresh()
            },1000)
        },
        // 上拉加载更多
        infinite(done){
            console.log('bbb',done)
            if(!this.flag){
                
                this.$refs.my_scroller.finishInfinite(2);
                return
            }
            
            this.getList({
                bookId: this.$route.params.bookId,
                fun: done
            })
            
            
        },
        initPage(){
            console.log(this.$route.params.bookId)
            this.getList({
                bookId: this.$route.params.bookId
            })
        },
        async getList(obj){
            try{
                let result = await this.$axios.get('/book/chapterlist',{
                    params: {
                        bookId: obj.bookId,
                        pageNum: this.pageNum
                    }
                })
                this.list = this.list.concat(result.data.data.chapter)
                this.bookInfo = result.data.data.bookInfo
                this.flag = result.data.data.flag
                obj.fun&&obj.fun()
                this.pageNum += 1
            }catch(err){
                console.log(err)
            }
        },
        goRead(item){
            this.$router.push('/read/'+item.book_id+"/"+item.chapter_id)
        }
    }
}
</script>
<style lang="scss" scoped>
.list{
    padding: 0 0 0px 0px;
    box-sizing: border-box;
    .header{
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .box{
        padding: 100px 30px 0;
        // margin-top: 100px;

        box-sizing: border-box;
        .item{
            height: 100px;
            display: flex;
            align-items: center;
            font-size: 32px;
            border-bottom: 1px solid #eceaea;
            padding: 0 5px;
            box-sizing: border-box;
            letter-spacing: 2px;
            cursor: pointer;
        }
    }
    
}
</style>

