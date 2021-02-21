<template>
  <el-row :gutter="20" class="homepage">
    <el-col :span="24" class="banner">
      <el-col
        class="bannerbox"
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 20, offset: 2 }"
        :lg="{ span: 18, offset: 3 }"
        :xl="{ span: 14, offset: 5 }"
      >
        <!-- 登陆 -->
        <el-dropdown class="userinfo" ref="user">
          <div class="el-dropdown-link">
            <el-avatar :size="40" :src="userinfo.circleUrl"></el-avatar>
            <span class="">
              {{ userinfo.username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="pageShow('AdminIndex')">
              后台管理
            </el-dropdown-item>
            <el-dropdown-item @click.native="pageShow('Login')">
              登陆
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <router-link to="/admin">后台</router-link> -->
      </el-col>
    </el-col>
    <el-col
      class="article"
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 24, offset: 0 }"
      :md="{ span: 20, offset: 2 }"
      :lg="{ span: 18, offset: 3 }"
      :xl="{ span: 14, offset: 5 }"
    >
      <!-- <el-col
        class="arti"
        :xs="(span = 24)"
        :sm="(span = 24)"
        :md="(span = 10)"
        :lg="(span = 7)"
        :xl="(span = 7)"
        v-for="item in article"
        :key="item.id"
      >
        <h4>{{ item.title }}</h4>
        <div class="arti-body" v-html="item.body"></div>
        <div class="arti-master">作者：{{ item.userid }}</div>
      </el-col> -->
      <el-tabs
        :tab-position="tabPosition"
        style="height: 200px"
        @tab-click="classchange"
      >
        <el-tab-pane label="全部">
          <el-col
            class="arti"
            :xs="(span = 24)"
            :sm="(span = 24)"
            :md="(span = 10)"
            :lg="(span = 7)"
            :xl="(span = 7)"
            v-for="arti in article"
            :key="arti.id"
          >
            <h4>{{ arti.title }}</h4>
            <div class="arti-body" v-html="arti.body"></div>
            <el-col class="arti-master" :span="14">{{ arti.datetime }}</el-col>
            <el-col class="arti-master" :span="10"
              >作者：{{ arti.userid }}</el-col
            >
          </el-col>
        </el-tab-pane>
        <el-tab-pane
          v-for="item in classType"
          :key="item.id"
          :label="item.title"
        >
          <template v-if="tabarticle && tabarticle.length !== 0">
            <el-col
              class="arti"
              :xs="(span = 24)"
              :sm="(span = 24)"
              :md="(span = 10)"
              :lg="(span = 7)"
              :xl="(span = 7)"
              v-for="arti in tabarticle"
              :key="arti.id"
            >
              <h4>{{ arti.title }}</h4>
              <div class="arti-body" v-html="arti.body"></div>
              <el-col class="arti-master" :span="14">
                {{ arti.datetime }}
              </el-col>
              <el-col class="arti-master" :span="10">
                作者：{{ arti.userid }}
              </el-col>
            </el-col>
          </template>
          <template v-else> 该分类下没有文章 </template>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { formatDate } from "../../../scripts/formatDate";
export default {
  data() {
    return {
      tabPosition: "top",
      userinfo: {
        circleUrl: "",
        username: "",
      },
      classType: [],
      article: [],
      tabarticle: [],
    };
  },
  methods: {
    pageShow(aim) {
      this.$router.push({ name: aim });
    },
    userDetail() {
      if (localStorage.getItem("userinfo")) {
        let detail = JSON.parse(localStorage.getItem("userinfo"));
        let { id } = detail.user;
        this.$api.member.search(id).then((res) => {
          // console.log(res);
          let { member, verify } = res.data;
          if (verify) {
            this.userinfo.circleUrl = member[0].useravatar;
            this.userinfo.username = member[0].nickname;
          } else {
            this.userinfo.circleUrl =
              "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
            this.userinfo.username = "请登录";
          }
        });
      } else {
        this.userinfo.circleUrl =
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        this.userinfo.username = "请登录";
      }
    },
    //把实体格式字符串转义成HTML格式的字符串
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    // logout() {
    //   localStorage.removeItem("userinfo");
    //   localStorage.removeItem("token");
    //   this.$router.push("/");
    //   this.$router.go(0);
    // },
    classchange(tab) {
      let _this = this;
      let id = "";
      if (tab.index && tab.index != 0) {
        id = _this.classType[tab.index - 1].id;
      }
      // console.log(event);
      this.$api.article.articleShow(id).then((res) => {
        // console.log(res);
        let { blogs, verify } = res.data;
        if (verify) {
          for (let i = 0; i < blogs.length; i++) {
            const ele = blogs[i];
            this.$set(ele, "datetime", formatDate(ele["datetime"]));
            this.$set(ele, "body", _this.escapeStringHTML(ele["body"]));
            this.$api.member.search(ele["userid"]).then((res) => {
              // console.log(res);
              let { verify, member } = res.data;
              if (verify) {
                // value = member.nickname;
                this.$set(ele, "userid", member[0].nickname);
              } else {
                this.$set(ele, "userid", "该账户已删除");
              }
              // console.log(res);
            });
          }
          this.tabarticle = blogs;
          // console.log(this.tabarticle);
        }
      });
    },
  },
  created() {
    this.userDetail();
    let _this = this;
    this.$api.article.articleShow().then((res) => {
      console.log(res);
      let { blogs, verify } = res.data;
      if (verify) {
        for (let i = 0; i < blogs.length; i++) {
          const ele = blogs[i];
          this.$set(ele, "datetime", formatDate(ele["datetime"]));
          this.$set(ele, "body", _this.escapeStringHTML(ele["body"]));
          this.$api.member.search(ele["userid"]).then((res) => {
            // console.log(res);
            let { verify, member } = res.data;
            if (verify) {
              // value = member.nickname;
              this.$set(ele, "userid", member[0].nickname);
            } else {
              this.$set(ele, "userid", "该账户已删除");
            }
            // console.log(res);
          });
        }
        this.article = blogs;
        // console.log(this.article);
      }
    });
    this.$api.article.classShow().then((res) => {
      // console.log(res);
      this.classType = res.data.classType;
    });
  },
};
</script>
<style lang="scss" scoped>
.homepage {
  .banner {
    color: white;
    background: #159bff;
    height: 50px;
    line-height: 50px;
    .bannerbox {
      position: relative;
      .userinfo {
        position: absolute;
        top: 5px;
        right: 30px;
        .el-dropdown-link {
          display: flex;
          span {
            color: white;
            display: block;
            line-height: 40px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .article {
    .el-tab-pane {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .arti {
      // width: 230px;
      padding: 15px 30px;
      margin: 20px 0;
      border: 1px solid #ddd;
      h4 {
        font-size: 20px;
        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .arti-body {
        padding: 10px 5px 0;
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
        text-indent: 32px;
        font-size: 1em;
        height: 2.5em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /*规定行数*/
        -webkit-box-orient: vertical;
      }
      .arti-master {
        // text-align: right;
        font-size: 0.8em;
        color: gray;
        margin-top: 10px;
      }
    }
  }
}
</style>