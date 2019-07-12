<template>
    <div class="nav-bar">
        <div class="nav-box">
            <!-- <img src="" alt=""> -->
            <el-carousel indicator-position="none"
            height='500px'
            :interval=interval
            >
                <el-carousel-item v-for="(item) in list" 
                :key="item._id">
                    <div class="item" @click="goDetail(item._id)">
                        <img :src="item.imgUrl" alt="">
                        <div class="name">{{item.title}}</div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
           interval: 5000,
           list: [
           ] 
        }
    },
    created () {
        this.init()  
    },
    methods: {
        async init(){
            let result = await this.$axios.get('/blog/hotList',{
                params: {count: 4}
            })
            console.log(result)
            if(result.data.code == 1){
                this.list = result.data.data.result
            }
        },
        goDetail(id){
            this.$router.push('/detail/'+id)
        },
    }
}
</script>
<style lang="scss" scoped>
.nav-bar{
    width: 100%;
    background: #fff;
    text-align: center;
    font-size: 0;
    padding: 20px 0;
    border-bottom: 1px dashed #ccc;
    .el-carousel{
        max-width: 1140px;
        margin: 0 auto;
    }
    .item{
        position: relative;
        height: 500px;
        width: 1140px;
        cursor: pointer;
        font-family: '楷体';
        img{
            width: 100%;
            height: 100%;
        }
        .name{
            position: absolute;
            bottom: 30px;
            left: 30px;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            background: rgba(0,0,0,0.4);
            padding: 5px 20px;
            border-radius: 3px;
        }
    }
}
</style>
