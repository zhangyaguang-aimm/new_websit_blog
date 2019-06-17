<template>
    <div class="article">
        <div class="index-box">
            <div class="left">
                <article-detail v-for="(item,index) in initList"
                :key="index"
                :target='item'></article-detail>
            </div>
            <div class="right">
                <content-right></content-right>
            </div>
        </div>
    </div>
</template>
<script>
import articleDetail from '../components/articleDetail'
import contentRight from '../components/contentRight'
export default {
     components: {
        'article-detail': articleDetail,
        'content-right': contentRight,
    },
    data () {
        return {
             initList: [
                {
                    title: 'Intense Happiness and Love',
                    time: '2017-08-20',
                    contents: [],
                    author: 'admin',
                    visitors: 22,
                    img: 'http://demo.cssmoban.com/cssthemes4/mz_21_bfl/assets/i/b2.jpg',
                    content: 'Lorem Ipsum është një tekst shabllon i industrisë së printimit dhe shtypshkronjave. Lorem Ipsum ka qenë teksti shabllon i industrisë që nga vitet 1500, kur një shtypës i panjohur morr'
                }]
        }
    }
}
</script>

<style lang="scss" scoped>
.article{
    .index-box{
        max-width: 1140px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .left{
            width: 750px;
        }
        .right{
            width: 325px;
        }
    }
}
</style>
