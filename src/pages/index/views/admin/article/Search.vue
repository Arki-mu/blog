<template>
  <el-row>
    <el-divider content-position="left">文章列表</el-divider>
    <el-col :span="22" :offset="1">
      <el-table
        :data="
          blogs.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        stripe
      >
        <el-table-column prop="id" label="ID" :width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          :show-overflow-tooltip="true"
          :width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userid"
          label="文章作者"
          :show-overflow-tooltip="true"
          :width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="datetime"
          label="发布时间"
          :show-overflow-tooltip="true"
          :width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="body"
          label="文章内容"
          :show-overflow-tooltip="true"
          :width="200"
        >
        </el-table-column>
        <el-table-column></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="blogs.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { error } from "../../../../../plugin/element/response";
import { formatDate } from "../../../../scripts/formatDate";
export default {
  data() {
    return {
      blogs: [],
      pagesize: 12,
      currentPage: 1,
    };
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    this.$api.article.articleShow().then((res) => {
      // let _this = this;
      // console.log(res);
      let { verify, blogs, msg } = res.data;
      if (verify) {
        // let items = JSON.parse(JSON.stringify(blogs), function (key, value) {
        //   if (key === "datetime") {
        //     return formatDate(value);
        //   } else if (key === "userid") {
        //     // _this.$api.member.search(value).then((res) => {
        //     //   let { verify, member, msg } = res.data;
        //     //   if (verify) {
        //     //     // console.log(1111);
        //     //     value = member[0].nickname;
        //     //   } else {
        //     //     error(msg);
        //     //   }
        //     //   // console.log(res);
        //     // });

        //     // // console.log(2222);
        //     return value;
        //   } else {
        //     return value;
        //   }
        // });
        for (let i = 0; i < blogs.length; i++) {
          const ele = blogs[i];
          // console.log(ele["userid"]);
          this.$set(ele, "datetime", formatDate(ele["datetime"]));
          this.$api.member.search(ele["userid"]).then((res) => {
            // console.log(res);
            let { verify, member, msg } = res.data;
            if (verify) {
              // value = member.nickname;
              this.$set(ele, "userid", member[0].nickname);
            } else {
              error(msg);
            }
            // console.log(res);
          });
        }

        this.blogs = blogs;
        // console.log(this.blogs);
      } else {
        error(msg);
      }
    });
  },
};
</script>

<style>
</style>