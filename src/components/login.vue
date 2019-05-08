<template>
  <div class="login">
    <div class="content-box">
        <h3 class="title" >用户登录</h3>
      <el-form :model='loginForm' :rules="loginRules" ref='loginForm' label-position="top" label-width="80px">
        <el-form-item label="用户名" prop='username' >
          <el-input v-model='loginForm.username' ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password' >
          <el-input v-model='loginForm.password'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="login-btn" type="primary" @click="submitForm('loginForm')" >登录</el-button>
          <el-button  class="reset-btn" type="primary" @click="resetForm('loginForm')" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data(){
    return {
      loginForm:{
        username:'',
        password:''
      },
      loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
      }
    }
  },

   methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
   }
};
</script>

<style lang="scss" >
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.content-box {
  width: 480px;
  height: 360px;
  background-color: #fff;
  border-radius: 10px;
  padding: 50px 35px;
  box-sizing: border-box;
  .login-btn,.reset-btn{
      width: 48%;
  }
  .title{
      margin: 0;
      padding: 0;
      margin-bottom: 26px;
  }
  .el-form-item__label{
      padding: 0;
      line-height: 30px;
  }
  .el-input__inner{
      height: 30px;
      line-height: 30px;
  }
}
</style>
