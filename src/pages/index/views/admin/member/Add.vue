<template>
  <el-row class="add">
    <el-divider content-position="left">添加用户</el-divider>

    <!-- 表单 -->
    <el-form
      ref="userAdd"
      :model="userAdd"
      :rules="userAddRules"
      label-width="100px"
    >
      <!-- 用户头像 -->
      <el-avatar :size="60" :src="userAdd.useravatar"></el-avatar>
      <el-form-item label="用户头像：" prop="useravatar">
        <el-col :span="12">
          <el-input v-model="userAdd.useravatar"> </el-input>
        </el-col>
      </el-form-item>
      <!-- 用户昵称 -->
      <el-form-item label="用户昵称：" prop="nickname">
        <el-col :span="8">
          <el-input v-model="userAdd.nickname"> </el-input>
        </el-col>
      </el-form-item>
      <!-- 手机号码 -->
      <el-form-item label="手机号码：" prop="phone">
        <el-col :span="8">
          <el-input v-model="userAdd.phone"></el-input>
        </el-col>
      </el-form-item>
      <!-- 电子邮箱 -->
      <el-form-item label="电子邮箱：" prop="email">
        <el-col :span="8">
          <el-input v-model="userAdd.email"></el-input>
        </el-col>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码：" prop="password">
        <el-col :span="8">
          <el-input type="password" v-model="userAdd.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码：" prop="passcheck">
        <el-col :span="8">
          <el-input type="password" v-model="userAdd.passcheck"></el-input>
        </el-col>
      </el-form-item>
      <!-- 选择角色 -->
      <el-form-item label="选择角色：" prop="roleid">
        <el-select v-model="userAdd.roleid" placeholder="请选择角色">
          <el-option
            v-for="item in userAdd.role"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
          <!-- <el-option label="角色2" value="2"></el-option> -->
        </el-select>
        roleid:{{ userAdd.roleid }}
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别：">
        <el-radio-group v-model="userAdd.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userAdd')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('userAdd')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    // 密码验证
    var valPass = (rule, value, callback) => {
      // console.log(rule);
      // console.log(value);
      // console.log(callback);
      if (value === "") {
        callback(new Error("密码不得为空！"));
      } else {
        if (this.userAdd.passcheck != "") {
          this.$refs.userAdd.validateField("passcheck");
        }
        callback();
      }
    };
    var valPassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userAdd.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      // 初始值
      userAdd: {
        useravatar:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        nickname: "",
        phone: "",
        email: "",
        password: "",
        passcheck: "",
        roleid: "",
        role: [],
        gender: "0",
      },
      // 规则
      userAddRules: {
        useravatar: [
          {
            required: true,
            message: "图片链接不能为空",
            trigger: "blur",
          },
          { type: "url", message: "图片链接格式错误", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 2, message: "输入的昵称长度应该大于2", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: valPass,
            trigger: "blur",
          },
        ],
        passcheck: [
          {
            required: true,
            validator: valPassCheck,
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "角色不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getRole() {
      this.axios.get("/api/member/role.php").then((res) => {
        this.userAdd.role = res.data.role;
        // console.log(this.userAdd.role);
      });
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // let formdata=new FormData();
          // formdata.append('nickname',this.userAdd.nickname);
          // formdata.append('roleid',this.userAdd.roleid);
          // formdata.append('useravatar',this.userAdd.useravatar);
          // formdata.append('phone',this.userAdd.phone);
          // formdata.append('email',this.userAdd.email);
          // console.log(_this.userAdd.roleid);
          // this.axios({
          //   method: "get",
          //   url: "/api/api/member/role.php",
          //   params: {
          //     id: _this.userAdd.roleid,
          //   },
          // }).then((res) => {
          //   // console.log(res);
          //   let [{ authority }] = res.data.role;
          //   // console.log(authority);
          //   console.log(authority);
          this.axios({
            method: "post",
            url: "/api/member/userregister.php",
            data: {
              nickname: _this.userAdd.nickname,
              roleid: _this.userAdd.roleid,
              useravatar: _this.userAdd.useravatar,
              phone: _this.userAdd.phone,
              email: _this.userAdd.email,
              password: _this.userAdd.password,
              password2: _this.userAdd.passcheck,
              gender: _this.userAdd.gender,
              // authority: ,
            },
          }).then((resp) => {
            // console.log(resp);
            if (resp.data.verify) {
              this.$message({
                type: "success",
                message: resp.data.msg,
                duration: 3000,
              });
              setTimeout(() => {
                _this.$router.push({ name: "MemberSearch" });
              }, 2000);
            } else {
              this.$message({
                type: "error",
                message: resp.data.msg,
                duration: 3000,
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请根据提示注册！",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.getRole();
  },
};
</script>
<style lang="scss" scoped>
.add {
  .el-form {
    padding: 15px 20px;
    .el-avatar {
      margin-left: 15px;
    }
  }
}
</style>