<template>
    <div class="login">
        <div class="homepage-hero-module">
            <div class="video-container">
                <div :style="fixStyle" class="filter"></div>
                <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
                    <source :src="getRandom['video']" type="video/mp4"/>
                </video>
                <div class="poster hidden" v-if="!vedioCanPlay">
                    <img :style="fixStyle" :src="getRandom['img']" alt="">
                </div>
            </div>
        </div>
        <div class="box">
            <div class="title">用户登录</div>
            <div class="username item-box">
                <el-input @keyup.enter.native="goLogin" class="item-input" placeholder="请输入用户名" v-model="userInfo.username">
                </el-input>
                <span class="el-icon-user input-icon"></span>
            </div>
            <div class="password item-box">
                <el-input @keyup.enter.native="goLogin" class="item-input" placeholder="请输入密码" type='password' v-model="userInfo.password">
                </el-input>
                <span class="el-icon-lock input-icon"></span>
            </div>
            <div class="tip" @click="goRegister">没有账号?<span>注册</span></div>
            <div class="login-btn-box">
                <el-button 
                @click="goLogin"
                class="login-btn" type="primary">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userInfo: {
                username: '',
                password: ''
            },
            vedioCanPlay: false,
            fixStyle: '',
            randomVideo: [
                {
                    video: require('../assets/images/cover.mp4'),
                    img: require('../assets/images/cover.jpg')
                },
                // {
                //     video: require('../assets/images/cover1.mp4'),
                //     img: require('../assets/images/cover1.jpg')
                // },
                // {
                //     video: require('../assets/images/cover2.mp4'),
                //     img: require('../assets/images/cover2.jpg')
                // }
            ]
        }
    },
    computed: {
        getRandom(){
            return this.randomVideo[Math.floor(Math.random()*this.randomVideo.length)]
        }
    },
    methods: {
        canplay() {
            this.vedioCanPlay = true
        },
        async goLogin(){
            let result = await this.$axios.post('/user/login',this.userInfo)
            console.log(result)
            if(result && result.data.code == 1){
                localStorage.setItem('token',result.data.data.token)
                localStorage.setItem('userinfo',JSON.stringify(result.data.data.userinfo))
                this.$router.push('/')
            }else{
                this.$message.error(result.data.message)
            }
            
        },
        
        initVideo(){
            window.onresize = () => {
                const windowWidth = document.body.clientWidth
                const windowHeight = document.body.clientHeight
                const windowAspectRatio = windowHeight / windowWidth
                let videoWidth
                let videoHeight
                if (windowAspectRatio < 0.5625) {
                    videoWidth = windowWidth
                    videoHeight = videoWidth * 0.5625
                    this.fixStyle = {
                        height: windowWidth * 0.5625 + 'px',
                        width: windowWidth + 'px',
                        'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
                        'margin-left': 'initial'
                    }
                } else {
                    videoHeight = windowHeight
                    videoWidth = videoHeight / 0.5625
                    this.fixStyle = {
                        height: windowHeight + 'px',
                        width: windowHeight / 0.5625 + 'px',
                        'margin-left': (windowWidth - videoWidth) / 2 + 'px',
                        'margin-bottom': 'initial'
                    }
                }
            }
            window.onresize()
        },
        goRegister(){
            this.$router.push('/register')
        }
    },
    mounted: function() {
        this.initVideo()
    }
}
</script>
<style lang="scss">
.login{
    .item-input{
        input{
            box-sizing: border-box;
            text-indent: 16px;
        }
    }
}
</style>


<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    position: relative;
    color: #fff;
    .box{
        position: absolute;
        width: 400px;
        min-height: 200px;
        left: 50%;
        top: 20%;
        z-index: 33;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .title{
            font-size: 38px;
            font-weight: 600;
            letter-spacing: 0.1em;
            margin-bottom: 10px;
        }
        .item-box{
            margin-top: 30px;
            width: 100%;
            position: relative;
            .input-icon{
                position: absolute;
                left: 0;
                top: 50%;
                color: #000;
                transform: translateY(-50%);
                left: 10px;
            }
        }
        .tip{
            padding: 10px 0;
            color: rgba(255, 255, 255, 0.8);
            span{
                color: #fff;
                cursor: pointer;
                &:hover{
                    color: #409EFF;
                }
            }
        }
        .login-btn-box{
            width: 100%;
            .login-btn{
                width: 100%;
                font-size: 16px;
                letter-spacing: 0.2em;
            }
        }
        
    }
}
.homepage-hero-module,
 .video-container {
 position: relative;
 height: 100vh;
 overflow: hidden;
 }
 .video-container .poster img,
 .video-container video {
 z-index: 0;
 position: absolute;
 }
 .video-container .filter {
 z-index: 1;
 position: absolute;
 background: rgba(0, 0, 0, 0.4);
 }
</style>
