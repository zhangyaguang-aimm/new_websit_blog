<template>
    <div class="new-blog">
        <blog-template></blog-template>
    </div>
</template>
<script>
import blogTemplate from '@/components/admin/blogTemplate'
export default {
    components: {
        'blog-template': blogTemplate  
    },
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.new-blog{
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    flex: 1;
}
</style>
