<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 添加按钮 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="success" plain @click="visible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
    ></el-pagination>

    <el-dialog title="添加用户" :visible.sync="visible">
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="120px">
          <el-input v-model="addUserForm.mobeil" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  naem: "users",
  data() {
    return {
      tableData: [],
      usersData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      visible: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobeil: ""
      },
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    getUsers() {
      this.$request.getUsers(this.usersData).then(res => {
        this.tableData = res.data.data.users;
      });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$request.deleteUser(row.id).then(res => {
          if (res.data.meta.status === 200) {
            this.getUsers();
          }
        });
      });
    },
    updateStatus(row) {
      this.$request.updateUserStatus(row).then(res => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$request.addUser(this.addUserForm).then(res => {
            this.getUsers();
            this.$refs[formName].resetFields(); //请求是异步的 , 所以这两行代码要写在里面
            this.visible = false;
          });
        } else {
          this.$message.warning("输入错误,请重新输入");
          return false;
        }
      });
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style lang="scss" >
.breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
