<template>
  <el-row>
    <!-- <el-divider content-position="left">文章分类</el-divider> -->
    <el-col :span="24" :offset="0">
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看全部分类" name="classList">
          <classList></classList>
        </el-tab-pane>
        <el-tab-pane label="添加分类" name="classAdd">
          <classAdd></classAdd>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import classAdd from "./class/add.vue";
import classList from "./class/list.vue";
export default {
  name: "class",
  components: {
    classAdd,
    classList,
  },
  data() {
    return {
      activeName: "classList",
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.el-tabs {
  padding:  5px 10px;
}
</style>
