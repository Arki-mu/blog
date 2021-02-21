<template>
  <el-row :gutter="24" class="login">
    <el-col :span="24" :offset="0">
      <h3>后台管理系统</h3>
    </el-col>

    <el-col :span="21" :offset="0">
      <el-form
        :model="loginForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号：">
          <el-input
            type="account"
            v-model="loginForm.account"
            autocomplete="off"
            placeholder="输入手机号或邮箱"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.remChecked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit"
            type="primary"
            @click="submitForm('ruleForm')"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        account: "13735539281",
        password: "gmj5927",
        remChecked: true,
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          _this
            .axios({
              method: "post",
              url: "/api/member/login.php",
              data: {
                account: _this.loginForm.account,
                password: _this.loginForm.password,
              },
            })
            .then((res) => {
              // console.log(res);
              let { token, msg, verify } = res.data;
              if (verify) {
                localStorage.setItem("token", token);
                localStorage.setItem("userinfo", JSON.stringify(res.data));
                _this.$message({
                  type: "success",
                  message: msg,
                  duration: 3000,
                });
                setTimeout(function () {
                  _this.$router.push({ name: "AdminIndex" });
                }, 2000);
              } else {
                _this.$message({
                  type: "error",
                  message: msg,
                  duration: 3000,
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  box-shadow: 0 0 10px #c2c2c2;
  border-radius: 5px;
  position: fixed;
  top: 20%;
  left: calc(50% - 200px);
  h3 {
    text-align: center;
    // line-height: 50px;
    margin: 40px 0;
    color: #00a4ff;
  }
  .submit {
    width: 100%;
  }
}
</style>