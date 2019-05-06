<template>
  <el-container class="container">
    <!-- 头部 -->
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
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>商品列表
            </el-menu-item>
            <el-menu-item index="params">
              <i class="el-icon-menu"></i>分类参数
            </el-menu-item>
            <el-menu-item index="categories">
              <i class="el-icon-menu"></i>商品分类
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="orders">
              <i class="el-icon-menu"></i>订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="reports">
              <i class="el-icon-menu"></i>数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
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
    background-color: #b3c0d1;
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
        font-size: 22px;
        // vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
  .main {
    background-color: #e9eef3;
    padding-top: 0;
  }
}
</style>
