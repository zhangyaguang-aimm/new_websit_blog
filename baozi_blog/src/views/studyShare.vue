<template>
    <div class="index">
        
        <div class="index-box">
            <div class="left">
                <content-item v-for="(item,index) in initList"
                :key="index"
                :target='item'></content-item>
                <div class="paging">
                    <el-pagination
                    layout="prev, pager, next"
                    class="index-pagination"
                    @current-change='handlePageNum'
                    :current-page='pageNum'
                    :total="count">
                    </el-pagination>
                </div>
            </div>
            <div class="right">
                <content-right :search='true'></content-right>
            </div>
        </div>
        
    </div>
</template>
<script>
import contentItem from '../components/contentItem'
import contentRight from '../components/contentRight'

export default {
    components: {
        'content-item': contentItem,
        'content-right': contentRight,
    },
    data () {
        return {
            initList: [],
            pageNum: 1,
            searchKey: '',
            count: 0
        }
    },
    created () {
        this.initPage()  
    },
    methods: {
        async initPage(obj){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            let result = await this.$axios.get('/blog/list',{
                params: {
                    pageNum: this.pageNum,
                    searchKey: this.searchKey || ''
                }
            })
            if(result.data.code == 1 && result.data.data.list.length > 0){
                this.initList = result.data.data.list
                this.count = result.data.data.count
            }else{
                this.$message({
                    type: 'warning',
                    message: '没有相关搜索内容'
                })
            }
        },
        handlePageNum(val){
            this.pageNum = val
            console.log(this.pageNum)
            this.initPage()
        },
        // 子元素搜索调用
        searchResultParent(val){
            this.pageNum = 1
            this.searchKey = val
            this.initPage()
        }
    }
}
</script>
<style lang="scss" scoped>
.index{
    .index-box{
        max-width: 1140px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .left{
            width: 750px;
            .index-pagination{
                margin: 20px 0;
                background: #fff;
            }
        }
        .right{
            width: 325px;
        }
    }
}
</style>
