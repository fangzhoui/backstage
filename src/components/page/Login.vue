<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import user_api from 'api/user' 

export default {
    data: function(){
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    localStorage.setItem('ms_username',self.ruleForm.username);
                    let obj = {
                        phone: this.ruleForm.username,
                        password: this.ruleForm.password
                    }
                    user_api.login(obj).then(res=> {
                        if(res.data.code==0){
                            self.imageUrl()
                            let jsonData = {
                                id: res.data.data.id,
                                phone: res.data.data.realName,
                                uid: res.data.data.uid
                            }
                            let json = JSON.stringify(jsonData)
                            sessionStorage.setItem('data', json)
                            self.$message.success('登陆成功')
                            self.$router.push('/readme');
                        }else if(res.data.code==16){
                            self.$message.info('登陆过期，请刷新页面后重试')
                        }else{
                            self.$message.error(res.data.userMessage)
                        }
                    })
                } else {
                    self.$message('信息不完整，不能登录')
                    return false;
                }
            });
        },
        createToken(){
            user_api.createToken().then(res=> {
                sessionStorage.setItem('bybToken', res.data.data)
            })
        },
        imageUrl(){
            user_api.imageUrl().then(res=> {
                sessionStorage.setItem('imageUrl', res.data.data)
            })
        }
    },
    created(){
        this.createToken()
    }
}
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>