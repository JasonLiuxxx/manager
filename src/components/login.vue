<template>
  <div class="login">
    <div class="content-box">
        <h3 class="title" >用户登录</h3>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  class="login-btn" type="primary" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
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
  .login-btn{
      width: 100%;
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
