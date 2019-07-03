<template>
    <div class="admin">
        <div class="left">
            <left-bar></left-bar>
        </div>
        <div class="right">
            <header-bar></header-bar>
            <router-view />
        </div>
    </div>
</template>
<script>
import headerBar from '@/components/admin/headerBar.vue'
import leftBar from '@/components/admin/leftBar.vue'

export default {
    components: {
        'header-bar': headerBar,  
        'left-bar': leftBar,  
    },
    data () {
        return {
            
        }
    },
    created () {
        console.log(this.$route)
    }
}
</script>
<style>
.el-submenu__title,.el-menu-item{
    font-size: 12px;
}
</style>
<style lang="scss" scoped>
.admin{
    display: flex;
    height: 100%;
    font-size: 14px;
    background: #fff;
    overflow-x: hidden;
    .left{
        
        height: 100%;
    }
    .right{
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        
    }
}
</style>
