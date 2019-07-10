<template>
    <div class="disucss">
        <v-discuss zone='discuss'></v-discuss>
    </div>
</template>
<script>
import vDiscuss from '../components/discuss'
export default {
    components: {
        'v-discuss': vDiscuss
    }
}
</script>
<style lang="scss" scoped>
.disucss{
    width: 1140px;
    margin: 0 auto;
}
</style>
