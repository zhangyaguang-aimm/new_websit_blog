<template>
    <div class="discuss-inner">
        <discuss-publish :blogId='blogId' :zone='zone'></discuss-publish>
        <div v-if="count != 0" class="discuss-list-title">
            <div class="top">
                <div class="text"><span class="el-icon-edit"></span>评论列表</div>
                <div class="tip">
                    (有<span>{{count}}</span>条评论)
                </div>
            </div>
            <div class="new-discuss">最新评论</div>
            <div class="out" v-for="outItem in list" :key="outItem._id">
                <discuss-item :zone='zone' :remarkId='outItem._id' :discussItem='outItem'></discuss-item>
                <div class="inner" v-for="innerItem in outItem.replys" :key="innerItem._id">
                    <discuss-item :blogId='blogId' :zone='zone' :remarkId='outItem._id' :inner='true' :discussItem='innerItem'></discuss-item>
                </div>
            </div>
        </div>
        <div class="null" v-else>暂无评论</div>

        <div v-if="list && list.length < count" 
        class="see-more"
        @click="getMore">查看更多</div>
    </div>
</template>


<script>
import DiscussPublish from './discussPublish'
import DiscussItem from './discussItem'
export default {
    components: {
        'discuss-publish': DiscussPublish,  
        'discuss-item': DiscussItem,  
    },
    props: {
        zone: {
            type: String,
            default: 'blog'
        },
        blogId: String
    },
    data () {
        return {
            replyFlag: false,
            discussInfo: {},
            pageNum: 1,
            list: [],
            count: 0
        }
    },
    created () {
        this.init()  
    },
    methods: {
        async init(childFlag){
            let result = await this.$axios.get('/remark/list',{
                params: {
                    zone: this.zone,
                    pageNum: this.pageNum,
                    blogId: this.blogId
                }
            })
            console.log(result)
            if(result.data.code == 1){
                this.count = result.data.data.count
                if(childFlag){
                    this.list = result.data.data.list
                }else{
                    this.list = this.list.concat(result.data.data.list)
                }
            }
        },
        getMore(){
            this.pageNum += 1
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
.discuss-inner{
    width: 100%;
    min-height: 100vh;
    background: #fff;
    margin: 20px 0;
    box-sizing: border-box;
    padding: 20px;
    .tip{
        width: 100%;
        border-bottom: 1px solid #ddd;
        padding: 0 8px 6px;
        box-sizing: border-box;
        color: #333;
        span{
            margin-right: 6px;
        }
        .cancle{
            color: #e74851;
            font-size: 12px;
            font-style: normal;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .user-temp{
        display: flex;
        padding: 20px 10px 20px 0;
        box-sizing: border-box;
        .user-temp-item{
            margin-left: 10px;
        }
    }
    .discuss-content{
        box-sizing: border-box;
        // padding: 10px;
    }
    .disucss-publish{
        margin: 20px 0;
    }
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
                            &:hover{
                                border-bottom: 1px solid #e74851;
                            }
                        }
                        .tag{
                            padding: 0 10px;
                            height: 18px;
                            // line-height: 18px;
                            text-align: center;
                            border-radius: 18px;
                            box-sizing: border-box;
                            border: 1px solid #4398ed;
                            color: #4398ed;
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
    .null{
        text-align: center;
        color: #e74851;
        font-weight: bold;
    }
    .see-more{
        color: #333;
        margin: 20px 0 0 ;
        text-align: center;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
}
</style>
