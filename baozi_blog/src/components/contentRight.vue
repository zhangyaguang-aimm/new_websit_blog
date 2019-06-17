<template>
    <div class="card">
        <div class="mine card-item">
            <div class="title">
                <span class="mine-title-span">包子</span>
            </div>
            <div class="shape"></div>
            <div class="mine-avtar">
                <img src="http://demo.cssmoban.com/cssthemes4/mz_21_bfl/assets/i/b2.jpg" alt="">
            </div>
            <div class="tip">业精于勤，荒于嬉；行成于思，毁于随。</div>
            <div class="connect">
                <span class="iconfont icon-github"></span>
                <span class="iconfont icon-sf"></span>
                <span class="iconfont icon-juejin"></span>
            </div>
        </div>

        <div class="card-item">
            <div class="title">
                <span>热门文章</span>
            </div>
            <div class="shape"></div>
            <div class="hot-list">
                <div class="hot-item" 
                v-for="(item,index) in hotList" 
                :key="index" >
                    <div class="left">
                        <img :src="item.img ||require('../assets/images/default.jpg')" alt="">
                    </div>
                    <div class="right">
                        <div class="hot-title">{{item.title}}</div>
                        <div class="hot-time">{{item.time}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-item">
            <div class="title">
                <span>最新文章</span>
            </div>
            <div class="shape"></div>
            <div class="new-list">
                <div class="new-item" 
                v-for="(item,index) in hotList" 
                :key="index" >
                    <div class="left el-icon-s-help">
                        
                    </div>
                    <div class="right">
                        <div class="new-title">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            hotList: [
                {
                    title: '测试内容',
                    time: '2018-09-20',
                    img: ''
                },
                {
                    title: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
                    time: '2018-09-20',
                    img: 'http://demo.cssmoban.com/cssthemes4/mz_21_bfl/assets/i/b2.jpg'
                }
            ]
        }
    },
    computed: {
    }
}
</script>
<style lang="scss" scoped>
.card{
    width: 100%;
    margin-top: 20px;
    .card-item{
        width: 100%;
        min-height: 200px;
        border: 1px solid #e7e7e7;
        padding: 42px 20px;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 30px;
        .title{
            position: relative;
            text-align: center;
            &::before{
                position: absolute;
                content: '';
                width: 100%;
                height: 1px;
                border-top: 1px dashed #e7e7e7;
                left: 0;
                top: 50%;
            }
            span{
                font-weight: 500;
                font-size: 16px;
                background: #fff;
                padding: 0 10px;
                display: inline-block;
                position: relative;
                letter-spacing: 0.1em;
                &.mine-title-span{
                    font-style: italic;
                }
            }
        }
        .shape{
            width: 75px;
            height: 12px;
            background: url('../assets/images/shape2.png') no-repeat center center;
            background-size: 100% 100%;
            background-color: #617c58;
            margin: 20px auto;
        }
        .mine-avtar{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .tip{
            margin: 30px 0; 
            text-align: center;
            font-size: 16px;
            line-height: 1.5;
            letter-spacing: 0.1em;
        }
        .connect{
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                cursor: pointer;
                margin-left: 20px;
                &::before{
                    transition: all 0.3s ease-in-out;
                    font-size: 26px;
                }
                &:hover{
                    &::before{
                        color: #617c58;
                    }
                }
            }
        }
        .hot-list{
            .hot-item{
                display: flex;
                cursor: pointer;
                .right{
                    margin-left: 30px;
                    width: 180px;
                    letter-spacing: 0.1em;
                    .hot-title{
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 22px;
                        max-height: 44px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        /*! autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */
                    }
                    .hot-time{
                        font-size: 11px;
                        margin-top: 10px;
                    }
                }
                .left{
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
            }
        }

        .new-list{
            .new-item{
                display: flex;
                border-bottom: 1px solid #e7e7e7;
                padding: 10px;
                align-items: center;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
                &:hover{
                    color: #617c58;
                }
                .right{
                    margin-left: 30px;
                    width: 180px;
                    letter-spacing: 0.1em;
                    .new-title{
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 24px;
                        max-height: 44px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        /*! autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */
                    }
                }
                .left{
                    
                }
            }
        }
    }
}
</style>
