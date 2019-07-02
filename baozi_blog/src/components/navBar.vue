<template>
    <div class="nav-bar">
        <div class="nav-box">
            <!-- <img src="" alt=""> -->
            <el-carousel indicator-position="none"
            height='500px'
            :interval=interval
            >
                <el-carousel-item v-for="(item,index) in list" 
                :key="index">
                    <img :src="item.img" alt="">
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
               {
                   img: 'http://img.baozinews.cn/blog/static/nav_one.jpg'
               },
               {
                   img: 'http://img.baozinews.cn/blog/static/nav_two.jpg'
               },
               {
                   img: 'http://img.baozinews.cn/blog/static/nav_three.jpg'
               },
               {
                   img: 'http://img.baozinews.cn/blog/static/nav_four.jpg'
               },
               {
                   img: 'http://img.baozinews.cn/blog/static/nav_five.jpg'
               }
           ] 
        }
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
    img{
        height: 500px;
        width: 1140px;
    }
}
</style>
