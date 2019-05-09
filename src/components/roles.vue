<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加 -->
    <el-row>
      <el-col :span="6">
        <el-button type="info" plain @click="visible = true">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
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
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            @click="handleCheck(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 -->
    <el-dialog title="添加角色" :visible.sync="visible">
      <el-form :model="addRoleForm" :rules="addRole" ref="addRoleForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="editRoleForm" :rules="editRole" ref="editRoleForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="editRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  naem: "roles",
  data() {
    return {
      tableData: [],

      visible: false,
      addRoleForm: {
        roleName: "",
        roleDesc: ""
      },
      addRole: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },

      editVisible: false,
      editRoleForm: {
        // roleName: "",
        // roleDesc: ""
      },
      editRole: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    getRole() {
      this.$request.getRoles().then(res => {
        let rolesData = res.data.data;
        rolesData.forEach(v => {
          v._children = v.children;
          delete v.children;
        });

        this.tableData = rolesData;
      });
    },
    handleEdit(index, row) {
      this.$request.getRoleById(row.id).then(res => {
        if (res.data.meta.status == 200) {
          this.editRoleForm = res.data.data;
        }
      });
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteRole(row.id).then(res => {
            if (res.data.meta.status == 200) {
              this.getRole();
            }
          });
        })
        .catch(() => {});
    },
    handleCheck(index, row) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addRoleForm") {
            this.$request.addRole(this.addRoleForm).then(res => {
              if (res.data.meta.status == 201) {
                this.visible = false;
                this.$refs[formName].resetFields();
                this.getRole();
              }
            });
          } else if (formName == "editRoleForm") {
            this.editRoleForm.id = this.editRoleForm.roleId
            this.$request.editRole(this.editRoleForm).then(res=>{
              if(res.data.meta.status == 200){
                this.editVisible = false
                this.getRole();
              } 
            })
          }
        } else {
          this.$message.warning("输入错误,请重新输入");
          return false;
        }
      });
    }
  },

  created() {
    this.getRole();
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
