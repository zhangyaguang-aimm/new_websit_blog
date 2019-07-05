<template>
    <div class="new-blog">
        <blog-template :tagFlag='false'></blog-template>
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
    },
    methods: {
        // 发布文章
        async publishBlog(obj){
            obj.createAt = new Date(obj.createAt).getTime()
            let result = await this.$axios.post('/article/add',Object.assign(
                obj, {author: JSON.parse(localStorage.getItem('userinfo'))._id}
            ))
            if(result && result.data.code == 1){
                this.$message({
                    type: 'success',
                    message: result.data.message
                })
                this.$router.push('/admin/article')
            }else{
                this.$message({
                    type: 'error',
                    message: result.data.message
                })
            }
        },
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
