<template>
    <div class="add-user">
        <div class="add-user-box">
            <div class="username item-box">
                <el-input class="item-input" placeholder="请输入用户名" v-model="userInfo.username">
                </el-input>
                <span class="el-icon-user input-icon"></span>
            </div>
            <div class="password item-box">
                <el-input class="item-input" placeholder="请输入密码" type='password' v-model="userInfo.password">
                </el-input>
                <span class="el-icon-lock input-icon"></span>
            </div>
            <div class="add-btn-register">
                <el-button 
                @click="goRegister"
                class="add-btn" type="primary">注册</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userInfo: {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        goRegister(){
            
        }
    }
}
</script>
<style lang="scss">
.item-input{
    input{
        text-indent: 20px;
    }
}
</style>

<style lang="scss" scoped>
.add-user{
    display: flex;
    align-items: center;
    justify-content: center;
    .add-user-box{
        width: 50%;
        padding-top: 100px;
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
        .add-btn-register{
            width: 100%;
            margin-top: 30px;
            .add-btn{
                width: 100%;
            }
        }
    }
}

</style>
