<template>
    <div class="serach">
        <el-input class="search-input" v-model="serachValue" placeholder="请输入搜索内容"></el-input>
        <el-button size='small' class="search-btn" type="primary">搜索</el-button>
        <el-button @click="addNewFun" size='small' class="search-btn" type="primary">新增</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            serachValue: ''
        }
    },
    methods: {
        addNewFun(){
            if(this.$parent.addTagFun){
                // 新增标签
                this.$parent.addTagFun()
            }
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
