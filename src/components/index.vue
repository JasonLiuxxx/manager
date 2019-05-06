<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img class="logo" src="../assets/logo.png" alt>
          <img class="logo" src="../assets/logo.png" alt>
          <img class="logo" src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <span class="title">鸡你太美后台管理系统</span>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-switch-button logout">退出</i>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss">
.container {
  height: 100%;
  .header {
    background-color: thistle;
    height: 60px;
    line-height: 60px;
    text-align: center;
    .logo {
      height: 60px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    .logout {
      font-size: 12px;
      color: red;
      cursor: pointer;
      // vertical-align: middle;
      &::before {
        font-size: 18px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
  .main {
    background-color: pink;
  }
}
</style>
