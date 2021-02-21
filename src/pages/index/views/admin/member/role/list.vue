<template>
  <div class="list">
    <el-divider content-position="left">角色列表</el-divider>
    <el-table :data="filterSrole" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" sortable width="80">
      </el-table-column>
      <!-- <el-table-column sortable prop="authority" label="会员级别" width="100">
      </el-table-column> -->
      <el-table-column prop="rolename" label="角色类型" sortable width="180">
      </el-table-column>
      <el-table-column prop="roleauth" label="角色权限" width="240">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            @confirm="removeRole(scope)"
            @cancel="cancel"
            confirm-button-text="确定删除"
            cancel-button-text="取消操作"
            icon="el-icon-info"
            icon-color="red"
            title="是否删除？"
          >
            <el-button type="text" size="small" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column></el-table-column>
    </el-table>
  </div>
</template>

<script>
import children from "../../../../router/admin/children";
export default {
  name: "list",
  data() {
    return {
      role: [],
    };
  },
  computed: {
    filterSrole() {
      let roleArray = [];
      this.role.forEach((item) => {
        // console.log(this.role);
        // console.log(item);
        let roleauth = [];
        children.forEach((citem) => {
          if (item.roleauth.indexOf(citem.name) > -1) {
            roleauth.push(citem.meta.name);
          }
        });
        // console.log(roleauth);
        roleArray.push({
          id: item.id,
          rolename: item.rolename,
          roleauth: roleauth.join(" · "),
          // authority: item.authority,
        });
      });
      return roleArray;
    },
  },
  methods: {
    getRole() {
      this.axios.get("/api/member/role.php").then((res) => {
        // console.log(res);
        this.role = res.data.role;
      });
    },
    handleClick(item) {
      this.$emit("onshowComponent", {
        listId: item.id,
        isComponent: "roleEdit",
      });
    },
    removeRole(scope) {
      this.axios({
        url: "/api/member/roledel.php",
        params: {
          id: scope.row.id,
        },
      }).then((res) => {
        if (res.data.verify) {
          this.role.splice(scope.$index, 1);
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
      // console.log(scope.row.id);
    },
    cancel() {
      this.$message({
        showClose: true,
        message: "取消删除操作",
        type: "info",
      });
    },
  },
  created() {
    this.getRole();
  },
};
</script>

<style lang="scss">
.cell {
  display: flex;
  justify-content: space-between;
}
</style>