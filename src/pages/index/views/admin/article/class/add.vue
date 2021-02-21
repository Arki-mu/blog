<template>
  <el-row class="classadd">
    <el-col :span="8">
      <el-form
        :model="classitem"
        ref="classitem"
        label-width="100px"
        class="classitem"
      >
        <el-form-item label="分类名称：" prop="title">
          <el-input v-model="classitem.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addClass">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { success, error } from "../../../../../../plugin/element/response";
export default {
  name: "classadd",
  data() {
    return {
      classitem: {
        title: "",
      },
    };
  },
  methods: {
    addClass() {
      this.$api.article
        .classAdd(this.classitem)
        .then((res) => {
          //   console.log(res);
          let { verify, msg } = res.data;
          if (verify) {
            success(msg);
          } else {
            error(msg);
          }
        })
        .catch((err) => {
          error(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.classadd {
  padding: 20px 0;
}
</style>