<template>
    <div class="discuss-item">
        <div class="discuss-list-title">
            <div class="main-discuss-item">
                <div class="left">
                    <img v-show="!inner" src="http://img.baozinews.cn/blog/static/nav_four.jpg" alt="">
                </div>
                <div class="right">
                    <div class="top">
                        <div v-if="!getName" class="avatarinfo">
                            <img v-show="inner" class="avatar-img" src="http://img.baozinews.cn/blog/static/nav_four.jpg" alt="">

                            <span class="avatar" @click="goUrl(discussItem.guestInfo.website)">{{discussItem.guestInfo.nickname}}</span>
                            
                            <span class="tag">游客</span>
                        </div>
                        <div v-else class="avatarinfo">
                            <img v-show="inner" class="avatar-img" src="http://img.baozinews.cn/blog/static/nav_four.jpg" alt="">

                            <span class="avatar" @click="goUrl(discussItem.guestInfo.website)">{{getName.username}}</span>
                            
                            <span v-if="getName.username !== 'admin'" class="tag vip">用户</span>
                            <span v-else class="tag super">博主</span>
                        </div>
                        <div class="time">{{discussItem.createAt | getTime}}</div>
                    </div>
                    <div class="content">
                        {{discussItem.content}}
                    </div>
                    <div class="bottom">
                        <div class="reply" @click="replyFlag = true">回复</div>
                        <!-- <div class="like"><span class="el-icon-star-on"></span>{{discussItem.likes}}</div> -->
                    </div>
                    <div class="inner-publish" v-show="replyFlag">
                        <discuss-publish :remarkId='remarkId' :zone='zone' :isShowReply='true'></discuss-publish>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>


<script>
import DiscussPublish from './discussPublish'
export default {
    components: {
        'discuss-publish': DiscussPublish  
    },
    props: {
        discussItem: Object,
        zone: {
            type: String,
            default: 'blog'
        },
        remarkId: String,
        inner: {
            type: Boolean,
            default: false
        }
    },
    filters: {
        getTime(val){
            val = new Date(val)
            return val.getFullYear()+'-'+(val.getMonth() + 1)+'-'+val.getDate() + ' ' + val.getHours()+':'+val.getMinutes()
        }
    },
    computed: {
        getName(){
            if(this.discussItem.author){
                return Array.isArray(this.discussItem.author)?this.discussItem.author[0]:this.discussItem.author
            }else{
                return ''
            }
        }
    },
    data () {
        return {
            replyFlag: false
        }
    },
    methods: {
        cancleReply(){
            this.replyFlag = false
        },
        goUrl(val){
            console.log(val)
            if(val){
                window.open(val)
            }else{
                this.$message({
                    type: 'info',
                    message: '没有互访页面'
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.discuss-item{
    .discuss-list-title{
        .top{
            display: flex;
            .text{
                border-bottom: 1px solid #ddd;
                padding: 0 8px 10px;
                box-sizing: border-box;
                color: #333;
                white-space: nowrap;
                span{
                    margin-right: 6px;
                }
            }
            .tip{
                span{
                    color: #E1171B;
                }
            }
        }
        .new-discuss{
            color: #e74851;
            margin-top: 10px;
            border-left: 5px solid #e74851;
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
        }
        .main-discuss-item{
            display: flex;
            padding: 10px 0;
            box-sizing: border-box;
            border-bottom: 1px dashed #e5e5e5;
            flex: 10;
            .left{
                flex: 1;
                box-sizing: border-box;
                img{
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                }
            }
            .right{
                flex: 9;
                .top{
                    display: flex;
                    font-size: 12px;
                    justify-content: space-between;
                    .avatarinfo{
                        display: flex;
                        align-items: center;
                        .avatar-img{
                            width: 14px;
                            height: 14px;
                            border-radius: 50%;
                            margin-right: 6px;
                        }
                        .avatar{
                            margin-right: 6px;
                            color: #e74851;
                            cursor: pointer;
                            border-bottom: 1px solid #fff;
                            &:hover{
                                border-bottom: 1px solid #e74851;
                            }
                        }
                        .tag{
                            padding: 0 10px;
                            height: 18px;
                            text-align: center;
                            border-radius: 18px;
                            box-sizing: border-box;
                            border: 1px solid #4398ed;
                            color: #4398ed;
                            &.vip{
                                border: 1px solid #E6A23C;
                                color: #fff;
                                background: #E6A23C;
                            }
                            &.super{
                                border: 1px solid #F56C6C;
                                color: #fff;
                                background: #F56C6C;
                            }
                        }
                    }
                    .time{
                        color: silver;
                        padding-top: 5px;
                    }
                }
                .content{
                    margin: 10px 0;
                    color: #333;
                    font-family: 'Helvetica neue';
                    line-height: 1.5;
                }
                .bottom{
                    display: flex;
                    justify-content: flex-end;
                    font-size: 12px;
                    align-items: center;
                    .reply{
                        color: #999;
                        cursor: pointer;
                        margin-right: 20px;
                        &:hover{
                            color: #e74851;
                        }
                    }
                    .like{
                        font-size: 14px;
                        color: #999;
                        cursor: pointer;
                        &:hover{
                            color: #e74851;
                        }
                    }
                }
                .inner-publish{
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
