<template>
    <div class="header">
        <div class="top">
            <div class="left">
                <div v-for="(item,index) in list"
                 :class="{item: true,active:currentPath == item.path}"
                 :key="index"
                 @click="goLink(item)">
                    {{item.title}}
                </div>
            </div>
            <div class="right">
                <template v-if="!token">
                    <div class="item" @click="goLogin">登录</div>
                    <div class="item" @click="goRegister">注册</div>
                </template>
                <template v-else>
                    <el-dropdown @command='handleCommand'  class="mine">
                        <span class="el-dropdown-link">
                            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='1'>后台管理</el-dropdown-item>
                            <el-dropdown-item command='2'>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            currentPath: '/',
            list: [
                {
                    title: '首页',
                    path: '/'
                },
                {
                    title: '随笔',
                    path: '/case'
                },
                {
                    title: '学习分享',
                    path: '/study'
                },
                {
                    title: '关于',
                    path: '/about'
                }
            ],
            token: ''
        }
    },
    created () {
        this.initHeader()
    },
    methods: {
        goLink(item){
            this.currentPath = item.path
            this.$router.push(item.path)
        },
        initHeader(){
            this.token = localStorage.getItem('token') || ''
            this.currentPath = this.$route.path
        },
        goLogin(){
            this.$router.push('/login')
        },
        goRegister(){
            this.$router.push('/register')
        },
        handleCommand(val){
            console.log(val)
            if(val == 1){
                this.$router.push('/admin')
            }else if(val == 2){
                localStorage.removeItem('token')
                localStorage.removeItem('userinfo')
                this.$router.go(0)
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #4a4a4a;
    color: #fff;
    z-index: 222;
    .top{
        max-width: 1140px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            .item{
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                text-align: center;
                cursor: pointer;
                &.active{
                    background: #404040;
                }
            }
        }
        .right{
            display: flex;
            align-items: center;
            .item{
                margin-left: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover{
                    color: #409EFF;
                }
            }
            .mine{
                color: #fff;
                cursor: pointer;
            }
        }
    }

}
</style>
