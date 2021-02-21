<template>
  <el-row class="list">
    <el-col :span="24">
      <el-table
        class="tablelist"
        :data="
          classLists.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        stripe
      >
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="title" label="分类标题" width="150">
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="classLists.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { error } from "../../../../../../plugin/element/response";
export default {
  name: "list",
  data() {
    return {
      classLists: [],
      pagesize: 11,
      currentPage: 1,
    };
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    this.$api.article
      .classShow()
      .then((res) => {
        // console.log(res);
        let { verify, classType, msg } = res.data;
        if (verify) {
          this.classLists = classType;
        } else {
          error(msg);
        }
        // console.log(this.classLists);
      })
      .catch((err) => {
        error(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.list {
  .tablelist {
    min-height: 570px;
  }
}
</style>