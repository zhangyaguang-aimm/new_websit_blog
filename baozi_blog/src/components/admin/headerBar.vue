<template>
    <div class="header-bar">
        <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-submenu index="2">
                <template slot="title">后台管理</template>
                <el-menu-item index="2-1">个人中心</el-menu-item>
                <el-menu-item @click="logout" index="2-2">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeIndex: ''
        }
    },
    methods: {
        handleSelect(){

        },
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('userinfo')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.header-bar{
    box-sizing: border-box;
    height: 60px;
    position: relative;
    &>ul{
        border: none;
    }
    .el-menu--horizontal>.el-submenu{
        float: right;
    }
    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
