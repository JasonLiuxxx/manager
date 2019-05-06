<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  naem: "reports ",
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style lang="scss" >
    .breadcrumb{
        height: 45px;
        line-height: 45px;
        background-color: #d3dce6;
        padding-left: 10px;
    }
</style>
