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
            ]
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
            console.log(this.$route.path,window.location.href)
            this.currentPath = this.$route.path
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
    }

}
</style>
