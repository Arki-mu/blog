<template>
  <div class="pagination">
    <el-table
      :data="datas.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      stripe
      style="width: 100%"
      v-for="(item, index) in tips"
      :key="index"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column prop="id" label="ID" width="50" align="center">
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
      <el-table-column label="操作" width="100" align="center">
        <el-button type="text" size="small"> 编辑 </el-button>
        <el-button type="text" size="small"> 删除 </el-button>
      </el-table-column> -->
      <el-table-column> </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="datas.length"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
      tips: [
        {
          label: "ID",
          prop: "id",
          width: "50",
        },
        {
          label: "昵称",
          prop: "nickname",
          width: "100",
        },
        {
          label: "性别",
          prop: "gender",
          width: "50",
        },
        {
          label: "角色",
          prop: "authority",
          width: "100",
        },
        {
          label: "手机号码",
          prop: "phone",
          width: "130",
        },
      ],
      datas: [],
      pagesize: 10,
      currentPage: 1,
    };
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>