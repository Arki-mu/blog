<template>
  <el-row class="roleadd">
    <el-divider content-position="left">添加角色</el-divider>
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
          <el-checkbox-group v-model="role.roleauth">
            <template v-for="(item, index) in children">
              <el-checkbox :key="index" :label="item.name" name="roleauth">
                {{ item.meta.name }}
              </el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addrole">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import children from "../../../../router/admin/children";
import { success, error } from "../../../../../../plugin/element/response";
export default {
  name: "roleadd",
  computed: {
    children() {
      return children;
    },
  },
  data() {
    return {
      role: {
        rolename: "",
        roleauth: [],
        // authority: 9,
      },
    };
  },
  methods: {
    addrole() {
      let _this = this;
      // let formdata = new FormData();
      // formdata.append("rolename", this.role.rolename);
      // formdata.append("authority", this.role.authority);
      // formdata.append("roleauth", this.role.roleauth);
      // this.axios.post("/api/api/member/roleadd.php", formdata).then((res) => {
      //   // console.log(res);
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
      // });
      let roleauth = _this.role.roleauth;
      this.axios({
        method: "post",
        url: "/api/member/roleadd.php",
        data: {
          rolename: _this.role.rolename,
          // authority: _this.role.authority,
          roleauth: roleauth.toString(),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.verify) {
            // this.$message({
            //   type: "success",
            //   message: res.data.msg,
            // });
            success(res.data.msg);
            this.$emit("onshowComponent", {
              isComponent: "roleList",
            });
          } else {
            // this.$message({
            //   type: "error",
            //   message: res.data.msg,
            // });
            error(res.data.msg);
          }
        })
        .catch((err) => {
          error(err);
        });
    },
  },
  created() {
    // let formdata=new FormData();
    // formdata.append('rolename',this.role.rolename);
    // formdata.append('roleauth',this.role.roleauth);
    // this.axios.post("/api/api/member/roleadd.php",formdata).then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style lang="scss">
.roleadd {
  .role {
    padding-top: 15px;
  }
}
</style>