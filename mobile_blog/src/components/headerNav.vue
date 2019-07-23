<template>
  <div id="headerNav" class="nav">
      <div @click="goBack" class="back el-icon-caret-left"></div>
      <div class="title">{{title}}</div>
      <div @click="goHome" class="home el-icon-s-home"></div>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  props: {
    title: String,
    goRouter: String
  },
  data () {
    return {
      
    }
  },
  methods: {
      goHome(){
          this.$router.push('/')
      },
      goBack(){
          if(this.goRouter == 'index'){
            this.$router.push('/')
          }else{
            this.$router.go(-1)
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.nav{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30px;
      height: 100px;
      background: #409EFF;
      color: #fff;
      margin-bottom: 10px;
      padding: 20px;
      box-sizing: border-box;
      .back{
          font-size: 50px;
          cursor: pointer;
      }
      .home{
          font-size: 40px;
          cursor: pointer;
      }
  }
</style>
