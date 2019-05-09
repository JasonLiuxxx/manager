<template>
  <div>
      <!-- 面包屑导航栏 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" 
    border v-loading="loading" 
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="正在拼命加载中,请稍等......"
    element-loading-spinner="el-icon-loading"
     >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          {{ scope.row.level == 0 ? '一级' : '' }}
          {{ scope.row.level == 1 ? '二级' : '' }}
          {{ scope.row.level == 2 ? '三级' : '' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  naem: "rights",
  data() {
    return {
      tableData: [],
      loading:true
    };
  },
  created() {
    this.$request.getListRights().then(res=>{
      this.loading = true
      if(res.data.meta.status == 200){
        this.tableData = res.data.data
        setTimeout(()=>{
          this.loading = false
        },1000)
      }
    })
  },
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
