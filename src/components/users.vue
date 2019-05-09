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
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          @keyup.native.enter="getUsers"
          v-model="usersData.query"
        >
          <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
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
          <el-button type="success" icon="el-icon-check" size="mini" plain @click="handleCheck(scope.$index, scope.row)" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="usersData.pagenum"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="usersData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="usersData.totalpage"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>

    <!-- 添加框 -->
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
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑框 -->
    <el-dialog title="编辑用户" :visible.sync="editVisible">
      <el-form :model="editUserForm" :rules="addUserRules" ref="editUserForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="editUserForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="120px">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editUserForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="roleVisible">
      <el-form :model="roleForm" :rules="addUserRules" ref="roleForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="roleForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="选择分配角色" label-width="120px">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option :value="-1" label="未分配" ></el-option>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
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
        pagesize: 10,
        totalpage: 0
      },
      visible: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
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
      },
      editVisible: false,
      editUserForm: {
        username: "",
        email: "",
        mobile: ""
      },
      roleVisible: false,
      roleForm: {},
      roles:[],
      roleValue:''
    };
  },

  methods: {
    getUsers() {
      this.$request.getUsers(this.usersData).then(res => {
        this.tableData = res.data.data.users;
        this.usersData.totalpage = res.data.data.total;
      });
    },

    handleEdit(index, row) {
      // console.log(index, row);
      this.editVisible = true;
      // this.editUserForm = row;
      this.$request.getUserById(row.id).then(res => {
        // console.log(res);
        this.editUserForm = res.data.data;
      });
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
          if (formName === "editUserForm") {
            this.$request.updateUser(this.editUserForm).then(res => {
              this.getUsers();
              // this.$refs[formName].resetFields(); //请求是异步的 , 所以这两行代码要写在里面
              this.editVisible = false;
            });
          } else if(formName === "roleForm"){
            this.$request.updateUserRole({id:this.roleForm.id,rid:this.roleValue}).then(res=>{
              // console.log(res);
              this.roleVisible = false;
            })
          } else {
            this.$request.addUser(this.addUserForm).then(res => {
              this.getUsers();
              this.$refs[formName].resetFields(); //请求是异步的 , 所以这两行代码要写在里面
              this.visible = false;
            });
          }
        } else {
          this.$message.warning("输入错误,请重新输入");
          return false;
        }
      });
    },
    sizeChange(size) {
      this.usersData.pagesize = size;
      this.getUsers();
    },
    currentChange(num) {
      this.usersData.pagenum = num;
      this.getUsers();
    },
    handleCheck(index,row){
      this.roleVisible = true
      this.$request.getUserById(row.id).then(res=>{
        // console.log(res.data.dta);
        this.roleForm = res.data.data
        this.roleValue = res.data.data.rid
      })
      this.$request.getRoles().then(res=>{
        // console.log(res);
        this.roles = res.data.data
      })
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
