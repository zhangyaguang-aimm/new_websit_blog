<template>
    <div class="content-item">
        <img class="bg-img" v-if='target.img' :src="target.img" alt="">
        <div class="text">
            <div class="title">{{target.title}}</div>
            <div class="article-about">
                <div class="author"><span class="el-icon-user-solid"></span>{{target.author}}</div>
                <div class="calendar"><span class="el-icon-date"></span>{{target.time}}</div>
                <div class="visitors "><span class="el-icon-view"></span>{{target.visitors || 0}}</div>
            </div>
            <div class="shape"></div>
            <div class="content">
                {{target.content}}
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props: {
        target: Object
    },
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.content-item{
    width: 100%;
    min-height: 100px;
    background: #fff;
    border: 1px solid #e9e9e9;
    margin-top: 20px;
    font-family: 'Merriweather', serif;
    .bg-img{
        width: 100%;
        height: 300px;
    }
    .text{
        text-align: center;
        
        .title{
            font-weight: bold;
            font-size: 25px;
            transition: all .3s ease-in-out;
            cursor: pointer;
            display: inline-block;
            padding: 12px 0;
            &:hover{
                color: #617c58;
            }
        }
        .article-about{
            margin: 12px 0 30px;
            &>div{
                display: inline-block;
                font-size: 15px;
                font-weight: 400;
                color: #555;
                margin-right: 12px;
                cursor: pointer;
                transition: all .3s ease-in-out;
                &:hover{
                    color: #617c58;
                }
                span{
                    margin-right: 5px;
                }
            }
        }
        .shape{
            width: 63px;
            height: 23px;
            background: url('../assets/images/shape-icon.png') no-repeat center center;
            background-size: 100% 100%;
            background-color: #617c58;
            margin: 20px auto;
        }
        .content{
            font-size: 15px;
            line-height: 28px;
            margin-bottom: 30px;
            font-weight: 400;
            text-align: left;
            padding: 20px;
            height: 60px;
        }
        
    }
}
</style>
