<template>
    <div class="serach">
        <el-input 
        @keyup.enter.native="searchResultChild"
        @input="changeInput" class="search-input" v-model="serachValue" placeholder="请输入搜索内容"></el-input>
        <el-button  @click="searchResultChild" size='small' class="search-btn" type="primary">搜索</el-button>
        <el-button @click="addNewFun" size='small' class="search-btn" type="primary">新增</el-button>
    </div>
</template>

<script>
export default {
    props: {
        searchResult: {
            type: Function,
            default: null
        }
    },
    data () {
        return {
            serachValue: ''
        }
    },
    methods: {
        searchResultChild(){
            // 调用方法2，这种需要再props中声明
            
            if(this.serachValue && this.searchResult){
                this.searchResult(this.serachValue)
            }
        },
        changeInput(){
            // 子元素调用父元素的方法1
            if(this.$parent.nullSerarchResult){
                // 新增标签
                this.$parent.nullSerarchResult(this.serachValue)
            }
        },
        addNewFun(){
            // 第三种方式是发布给父元素
            this.$emit('addTagFun')
        }
    }
}
</script>
<style lang="scss" scoped>
.serach{
    width: 100%;
    background: #f3f3f3;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .search-input{
        width: 200px;
        margin: 0 20px 0 0;
        input{
            height: 30px;
            font-size: 12px;
        }
    }
    .search-btn{
        box-sizing: border-box;
        height: 30px;
    }
}
</style>
