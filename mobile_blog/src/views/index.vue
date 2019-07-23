<template>
    <div class="index">
        <scroller ref="my_scroller" class="box" :on-refresh='refresh' :on-infinite="infinite">
            <div>
                <item-blog 
                v-for="blog in blogList" 
                :key="blog._id" 
                :blogItem='blog'
                ></item-blog>
            </div>
        </scroller>
        
    </div>
</template>
<script>
import ItemBlog from '../components/itemBlog'

export default {
    components: {
        'item-blog': ItemBlog  
    },
    data () {
        return {
            blogList: [],
            isMore: true,
            pageNum: 1,
            count: 0
        }
    },
    created () {
        
    },
    methods: {
        // 下拉刷新
        refresh(){
            this.$refs.my_scroller.finishPullToRefresh()
        },
        // 上拉加载更多
        infinite(done){
            if(!this.isMore){
                
                this.$refs.my_scroller.finishInfinite(2);
                return
            }
            
            this.initPage({
                fun: done
            })
            
            
        },
        async initPage(obj){
            let result = await this.$axios.get('/blog/list',{
                params: {
                    pageNum: this.pageNum,
                    searchKey: this.searchKey || ''
                }
            })
            if(result.data.code == 1 && result.data.data.list.length > 0){
                this.blogList = this.blogList.concat(result.data.data.list)
                this.count = result.data.data.count
                this.pageNum += 1
                obj.fun&&obj.fun()
                if(this.blogList && this.blogList.length >= this.count){
                    this.isMore = false
                }
            }else{
                this.isMore = false
            }
        },
        
    }
}
</script>

<style lang="scss" scoped>

.index{
    box-sizing: border-box;
    // padding-bottom: 30px;
    .box-card{
        margin-top: 20px;
        &:first-of-type{
            margin-top: 0;
        }
    }
}
</style>
