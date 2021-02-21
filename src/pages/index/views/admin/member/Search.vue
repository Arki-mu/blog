<template>
  <div class="member">
    <el-table
      :data="
        meDatas.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="50" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" align="center">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="50" align="center">
      </el-table-column>
      <el-table-column prop="authority" label="角色" width="100" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="130" align="center">
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="registrationtime"
        label="注册时间"
        width="180"
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column label="操作" width="100" align="center">
        <el-button type="text" size="small"> 编辑 </el-button>
        <el-button type="text" size="small"> 删除 </el-button>
      </el-table-column> -->
      <el-table-column> </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="meDatas.length"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { formatDate } from "../../../../scripts/formatDate";
export default {
  name: "member",
  data() {
    return {
      meDatas: [],
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
    this.$api.member.search().then((res) => {
      // let _this = this;
      // console.log(res);
      // this.meDatas = res.data.member;
      let datas = JSON.parse(
        JSON.stringify(res.data.member),
        function (key, value) {
          // console.log(key, value);
          if (key === "gender") {
            return value == 0 ? "女" : "男";
          } else if (key === "authority") {
            if (value == 9) {
              value = "注册会员";
            } else if (value == 0) {
              value = "超级管理员";
            } else if (value == 1) {
              value = "普通管理员";
            }
            return value;
          } else if (key === "registrationtime") {
            return formatDate(value);
          } else {
            return value;
          }
        }
      );
      // console.log(datas);
      this.meDatas = datas;
    });
  },
};
</script>
<style lang="scss" scoped>
.member {
  padding: 5px 20px;
  .el-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>