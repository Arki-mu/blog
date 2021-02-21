<template>
  <el-row class="roleedit">
    <el-divider content-position="left"
      >编辑角色 : {{ role.rolename }}</el-divider
    >
    <el-col :span="12">
      <el-form :model="role" ref="role" label-width="100px" class="role">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="role.rolename"></el-input>
        </el-form-item>
        <!-- <el-form-item label="会员级别" prop="authority">
          <el-input
            type="text"
            v-model="role.authority"
            maxlength="1"
            show-word-limit
          >
          </el-input>
        </el-form-item> -->
        <el-form-item label="权限选择" prop="roleauth">
          {{ role.roleauth }}
          <el-checkbox-group v-model="roleauthfilter">
            <template v-for="(item, index) in children">
              <el-checkbox :key="index" :label="item.name" name="roleauth">
                {{ item.meta.name }}
              </el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editrole"> 修改 </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import children from "../../../../router/admin/children";
export default {
  name: "roleedit",
  props: {
    listId: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      role: {
        rolename: "",
        roleauth: "",
        // authority: null,
      },
    };
  },
  computed: {
    children() {
      return children;
    },
    roleauthfilter: {
      get() {
        return this.role.roleauth.split(",");
      },
      set(value) {
        // console.log(value);
        this.role.roleauth = value.join(",");
      },
    },
  },
  methods: {
    getRole() {
      this.axios({
        url: "/api/member/role.php",
        params: {
          id: this.listId,
        },
      }).then((res) => {
        // console.log(res);
        let {
          data: { role },
        } = res;
        this.role = role[0];
      });
    },
    editrole() {
      // var formdata = new FormData();
      // formdata.append("id", this.listId);
      // formdata.append("rolename", this.role.rolename);
      // formdata.append("roleauth", this.role.roleauth);
      // formdata.append("authority", this.role.authority);
      // this.axios.post("/api/api/member/roleedit.php", formdata).then((res) => {
      //   console.log(res);
      //   if (res.data.verify) {
      //     this.$message({
      //       type: "success",
      //       message: res.data.msg,
      //     });
      //     this.$emit("onshowComponent", {
      //       isComponent: "roleList",
      //     });
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: res.data.msg,
      //     });
      //   }
      // })
      let _this = this;
      let roleauth = _this.role.roleauth;
      // console.log(roleauth);
      this.axios({
        method: "post",
        url: "/api/member/roleedit.php",
        data: {
          id: _this.listId,
          rolename: _this.role.rolename,
          // authority: _this.role.authority,
          roleauth: roleauth.toString(),
        },
      }).then((res) => {
        console.log(res);
        if (res.data.verify) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.$emit("onshowComponent", {
            isComponent: "roleList",
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    },
  },
  created() {
    this.getRole();
  },
};
</script>

<style lang='scss'>
</style>