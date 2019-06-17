<template>
    <div class="index">
        
        <nav-bar></nav-bar>
        <div class="index-box">
            <div class="left">
                <content-item v-for="(item,index) in initList"
                :key="index"
                :target='item'></content-item>
            </div>
            <div class="right">
                <content-right></content-right>
            </div>
        </div>
    </div>
</template>
<script>
import navBar from '../components/navBar'
import contentItem from '../components/contentItem'
import contentRight from '../components/contentRight'

export default {
    components: {
        'nav-bar': navBar,
        'content-item': contentItem,
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
                },
                {
                    title: 'Intense Happiness and Love',
                    time: '2017-08-20',
                    contents: [],
                    author: 'admin',
                    content: 'Lorem Ipsum është një tekst shabllon i industrisë së printimit dhe shtypshkronjave. Lorem Ipsum ka qenë teksti shabllon i industrisë që nga vitet 1500, kur një shtypës i panjohur morr'
                },
                {
                    title: 'Intense Happiness and Love',
                    time: '2017-08-20',
                    contents: [],
                    author: 'admin',
                    content: 'Lorem Lorem rem Ipsum  Ipsum është një tekst shabllon i ind IpsLorem Ipsum është një tekst shabllon i indum Lorem Ipsum është një tekst shabllon i indështë një tekst shabllon i industrisë së printimit dhe shtypshkronjave. Lorem Ipsum ka qenë teksti shabllon i industrisë që nga vitet 1500, kur një shtypës i panjohur morr'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.index{
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
