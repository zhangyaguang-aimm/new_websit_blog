<template>
    <div class="item_box" @click="goDetail(blogItem)">
        <div class="item">
            <div class="top">{{blogItem.title}}</div>
            <div class="middle">
                <div class="middle-left">
                    {{blogItem.content | splitStr}}
                </div>
                <div v-if="blogItem.imgUrl" class="middle-right">
                    <img class="item_cover" :src="blogItem.imgUrl" alt="">
                </div>
            </div>
            <div class="bottom">
                <div class="author bottom-item"><span class="el-icon-s-custom"></span>{{blogItem.userinfo[0].username}}</div>
                <div class="time bottom-item"><span class="el-icon-date"></span>{{blogItem.createAt | getTime}}</div>
                <div class="click-num bottom-item"><span class="el-icon-view"></span>{{blogItem.clickNum}}</div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        blogItem: Object
    },
    data () {
        return {
            
        }
    },
    methods: {
        goDetail(item){
            console.log(item)
            this.$router.push('/detail/'+item._id)
        }  
    },
    filters: {
        getTime(val){
            val = new Date(val)
            return val.getFullYear()+'-'+(val.getMonth() + 1)+'-'+val.getDate()
        },
        splitStr(val){
            return val.substring(0,80)
        }
    }
}
</script>
<style lang="scss" scoped>
.item_box{
    padding: 0 20px;
    cursor: pointer;
    box-sizing: border-box;
    .item{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        font-size: 26px;
        margin-top: 20px;
        border-bottom: 1px solid #f5efef;
        padding-bottom: 20px;
        .top{
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .middle{
            display: flex;
            .middle-left{
                width: 100%;
                color: #333;
                box-sizing: border-box;
                padding-right: 30px;
                line-height: 46px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .middle-right{
                width: 100px;
                height: 70px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .bottom{
            display: flex;
            margin-top: 30px;
            color: #a9a6a6;
            .bottom-item{
                margin-right: 20px;
                span{
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>

