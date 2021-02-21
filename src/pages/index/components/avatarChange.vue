<template>
  <div class="avatar">
    <input type="file" ref="inp" @change="avatarChan" />
    <div class="avaimg" v-if="imgsrc">
      <img :src="imgsrc" />
    </div>
    <i class="el-icon-close" @click="hidden"></i>
  </div>
</template>
<script>
import { success, error } from "../../../plugin/element/response";
export default {
  name: "avatar",
  data() {
    return {
      imgsrc: "",
    };
  },
  methods: {
    hidden() {
      this.$emit("hidden");
    },
    avatarChan() {
      let _this = this;
      let file = _this.$refs.inp.files[0];
      //   console.log(_this.$refs.inp.files[0]);
      var reader = new FileReader();
      reader.onload = function (event) {
        // 文件里的文本会在这里被打印出来
        // console.log(event.target.result);
        let base64 = event.target.result;
        _this.imgsrc = base64;
        let items = JSON.parse(localStorage.getItem("userinfo"));
        // console.log(items.user.id);
        // console.log(base64);
        _this
          .axios({
            method: "post",
            url: "/api/member/avatar.php",
            data: {
              userid: items.user.id,
              base64: base64,
            },
          })
          .then((res) => {
            // console.log(res);
            if (res.data.verify) {
              success(res.data.msg );
              _this.$router.go(0);
            } else {
              error(res.data.msg);
            }
          });
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  background: white;
  box-shadow: 0 0 8px #ddd;
  width: 500px;
  height: 200px;
  position: fixed;
  z-index: 20;
  top: 0;
  left: calc(50% - 200px);
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
  .el-icon-close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  input {
    display: block;
    margin: auto 0;
  }
  .avaimg {
    margin: auto 20px;
    width: 178px;
    height: 178px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>