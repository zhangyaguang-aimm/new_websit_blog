<template>
    <div class="about">
        <div class="index">
            <div class="title">关于自己</div>
            <div class="tip">个人简介</div>
            <div class="avatar-img"></div>
            <div class="mine-name">包子</div>
            <div class="desc">爱生活、爱游戏、爱运动、爱编码。</div>
            <div class="desc">业精于勤，荒于嬉；行成于思，毁于随。</div>
            <div class="skill">技能树</div>

            <div class="mine-skill-item">
                <div class="left">HTML/JS/CSS</div>
                <div class="right">
                    <el-progress :text-inside="true" :stroke-width="26" :percentage="86"></el-progress>
                </div>
            </div>
            <div class="mine-skill-item">
                <div class="left">Node/Monogdb</div>
                <div class="right">
                    <el-progress :text-inside="true" :stroke-width="26" color='#f56c6c' :percentage="56"></el-progress>
                </div>
            </div>
            <div class="mine-skill-item">
                <div class="left">Typescript</div>
                <div class="right">
                    <el-progress :text-inside="true" :stroke-width="26" color='#e6a23c' :percentage="80"></el-progress>
                </div>
            </div>
            <div class="mine-skill-item">
                <div class="left">Vue</div>
                <div class="right">
                    <el-progress :text-inside="true" :stroke-width="26" color='#5cb87a' :percentage="80"></el-progress>
                </div>
            </div>
            <div class="mine-skill-item">
                <div class="left">React</div>
                <div class="right">
                    <el-progress :text-inside="true" :stroke-width="26" color='#6f7ad3' :percentage="30"></el-progress>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.about{
    .index{
        width: 1140px;
        margin: 0 auto 40px;
        text-align: center;
        background: #fff;
        font-size: 16px;
        color: #555;
        padding-bottom: 60px;
        .title{
            padding: 20px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            text-align: left;
            color: #444;
            font-size: 22px;
        }
        .tip{
            padding: 10px 0;
            background: #fbfbfb;
            border-left: 4px solid #00a67c;
            margin: 20px 0;
            font-weight: bold;
            color: #000;
        }
        .avatar-img{
            background: url('../assets/images/avatar.jpg') no-repeat center center;
            background-size: cover;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 20px auto;
            box-shadow: 2px 2px 5px #000;
        }
        .mine-name{
            margin-bottom: 20px;
        }
        .desc{
            margin-bottom: 20px;
        }
        .skill{
            padding: 10px 0;
            background: #fbfbfb;
            border-left: 4px solid #00a67c;
            margin: 40px 0 60px;
            font-weight: bold;
            color: #000;
        }

        .mine-skill-item{
            display: flex;
            box-sizing: border-box;
            padding: 0 20px;
            flex: 10;
            margin-bottom: 30px;
            .left{
                flex: 2;
            }
            .right{
                flex: 8;
            }
        }
    }
}
</style>
