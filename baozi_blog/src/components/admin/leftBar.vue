<template>
    <div :class="{'left-bar': true, 'left-collapse': isCollapse}">
        <div class="img">
            <img src="../../assets/images/cover.jpg" alt="">
        </div>
        <el-row class="left-row">
            <el-col :span="12">
                <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                :collapse='isCollapse'
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">博客</template>
                        <el-menu-item @click="$router.push('/admin')" index="1-1">首页列表</el-menu-item>
                        <el-menu-item @click="$router.push('/admin/add_blog')" index="1-2">新增</el-menu-item>
                        
                    </el-menu-item-group>
                    <el-menu-item-group>
                         <template slot="title">用户</template>
                        <el-submenu index="1-3">
                            <template slot="title">用户管理</template>
                            <el-menu-item @click="$router.push('/admin/user/list')" index="1-3-1">用户列表</el-menu-item>
                            <el-menu-item @click="$router.push('/admin/user/add')" index="1-3-2">新增用户</el-menu-item>
                        </el-submenu>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">管理</template>
                        <el-menu-item @click="$router.push('/admin/tag')" index="1-4">标签</el-menu-item>
                    </el-menu-item-group>
                    
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isCollapse: false,
            defaultActive: '1-1'
        }
    },
    created () {
        this.initRouter()
    },
    methods: {
        initRouter(){
            console.log(this.$route)
            this.defaultActive = this.$route.meta.index
        },
        handleOpen(){

        },
        handleClose(){

        }
    }
}
</script>
<style>
li ul{
    box-sizing: border-box;
    overflow: hidden;
    border: none !important;
}
</style>
<style lang="scss" scoped>
.left-bar{
    width: 160px;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .img{
        width: 100%;
        height: 60px;
        position: relative;
        background: rgb(84, 92, 100);
        border-right: 1px solid #fff;
        z-index: 22;
        box-sizing: border-box;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }
    &.left-collapse{
        width: 74px;
        .el-menu--collapse{
            width: 99%;
        }
    }
    .left-row{
        width: 100%;
        height: 100%;
        .el-col{
            width: 100%;
            height: 100%;
            ul{
                height: 100%;
            }
        }
    }
}
</style>
