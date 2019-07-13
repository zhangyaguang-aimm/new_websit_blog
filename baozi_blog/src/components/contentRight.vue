<template>
    <div class="card">
        <el-input style="margin-bottom: 20px;"  v-show="search"
            @keyup.enter.native="searchResultChild"
            @input="changeInput" class="search-input" v-model="serachValue" placeholder="请输入搜索内容"></el-input>
        <div class="mine card-item">
            <div class="title">
                <span class="mine-title-span">{{userinfo.username || '包子'}}</span>
            </div>
            <div class="shape"></div>
            <div class="mine-avtar">
                <img class="avatar-img" v-if="userinfo.imgUrl" :src="userinfo.imgUrl" alt="">
                <img v-else src="http://demo.cssmoban.com/cssthemes4/mz_21_bfl/assets/i/b2.jpg" alt="">
            </div>
            <div class="tip">{{userinfo.desc || '业精于勤，荒于嬉；行成于思，毁于随。'}}</div>
            <div class="connect">
                <span @click="openUrl(userinfo.github||'https://github.com/dragonnahs/new_websit_blog')" class="iconfont icon-github"></span>
                <span @click="openUrl(userinfo.SF||'https://segmentfault.com/u/dragonnahs')" class="iconfont icon-sf"></span>
                <span @click="openUrl(userinfo.SF||'https://juejin.im/user/591e2a7bda2f60005d291262')" class="iconfont icon-juejin"></span>
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
                :key="index" @click="goDetail(item._id)">
                    <div class="left">
                        <img :src="item.imgUrl || 'http://img.baozinews.cn/blog/static/default.jpg'" alt="">
                    </div>
                    <div class="right">
                        <div class="hot-title">{{item.title}}</div>
                        <div class="hot-time">{{item.createAt | getTime}}</div>
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
                v-for="(item,index) in newList" 
                :key="index" @click="goDetail(item._id)">
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
    props: {
        search: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            hotList: [],
            newList: [],
            serachValue: '',
            userinfo: {}
        }
    },
    filters: {
        getTime(val){
            val = new Date(val)
            return val.getFullYear()+'-'+(val.getMonth() + 1)+'-'+val.getDate()
        }
    },
    created () {
        this.init()
    },
    methods: {
        async init(){
            let result = await this.$axios.get('/blog/newHotList')
            if(result.data.code == 1){
                this.hotList = result.data.data.hotBlogList
                this.newList = result.data.data.newBlogList
            }
            this.userinfo = localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{}
        },
        goDetail(id){
            this.$router.push('/detail/'+id)
        },
        searchResultChild(){
            if(this.$parent.searchResultParent){
                this.$parent.searchResultParent(this.serachValue)
            }
        },
        changeInput(){
            if(!this.serachValue && this.$parent.searchResultParent){
                this.$parent.searchResultParent('')
            }
        },
        // 点击打开指定连接
        openUrl(val){
            console.log(val)
            window.open(val)
        }
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
            text-align: center;
            img{
                width: 100%;
                &.avatar-img{
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    box-shadow: 2px 2px 5px #000;
                }
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
                justify-content: center;
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
                        margin-top: 0px;
                    }
                }
                .left{
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    box-sizing: border-box;
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
