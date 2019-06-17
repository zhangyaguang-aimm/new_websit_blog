<template>
    <div class="out">
        <v-header></v-header>
        <div class="container">
            <router-view/>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHeader from '../components/header'
import vFooter from '../components/footer'
export default {
    components: {
        'v-header': vHeader,
        'v-footer': vFooter,
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  min-height: 800px;
  padding-top: 50px;
}
</style>
