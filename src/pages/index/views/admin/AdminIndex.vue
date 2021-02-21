<template>
  <div class="admin">
    <el-container>
      <!-- <el-header height="">
        Header content
        AdminIndex-管理员主页
      </el-header> -->
      <el-container>
        <el-aside width="200px">
          <!-- Aside content -->
          <el-scrollbar height="100%">
            <!-- {{leftMenu}} -->
            <!-- gutter	栅格间隔 默认0-->
            <el-row :gutter="0">
              <!-- span	栅格占据的列数 默认24-->
              <!-- offset	栅格左侧的间隔格数 默认0-->
              <el-col :span="24" :offset="0">
                <el-menu
                  default-active="1-0"
                  @open="handleOpen"
                  @close="handleClose"
                >
                  <el-submenu
                    v-for="(submenus, index) in leftMenu"
                    :index="index + 1 + ''"
                    :key="index"
                  >
                    <template slot="title">
                      <i :class="submenus.meta.icon"></i>
                      {{ submenus.meta.name }}
                    </template>

                    <template v-for="(item, subIndex) in submenus.children">
                      <el-menu-item
                        v-if="item.meta.leftNav"
                        :key="subIndex"
                        :index="index + 1 + '-' + (subIndex + 1)"
                        @click="pageShow(item.name)"
                      >
                        {{ item.meta.name }}
                      </el-menu-item>
                    </template>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main height="">
            <!-- Main content -->
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-home"></i> 首页
              </el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(item, index) in breadArr"
                :key="index"
                :to="{ name: item.name }"
              >
                <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                {{ item.meta.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
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
                <el-dropdown-item @click.native="avaChange">
                  头像更改
                </el-dropdown-item>
                <el-dropdown-item disabled>个人主页</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">
                  登出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <avatarChange
              @hidden="avaHidden"
              v-show="avaChangeShow"
            ></avatarChange>
            <router-view></router-view>
          </el-main>
          <el-footer height="">
            <!-- Footer content -->
            <a href="https://beian.miit.gov.cn/" target="_blank">
              ICP证：浙ICP备2020041337号-1
            </a>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import children from "../../router/admin/children.js";
import AvatarChange from "../../components/avatarChange";
export default {
  name: "admin",
  components: {
    AvatarChange,
  },
  computed: {
    leftMenu() {
      return children;
    },
  },
  data() {
    return {
      isCollapse: true,
      breadArr: [],
      userinfo: {
        circleUrl: "",
        username: "",
      },
      avaChangeShow: false,
    };
  },
  methods: {
    avaChange() {
      this.avaChangeShow = true;
    },
    avaHidden() {
      this.avaChangeShow = false;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    pageShow(aim) {
      this.$router.push({ name: aim });
    },
    userDetail() {
      if (localStorage.getItem("userinfo")) {
        let detail = JSON.parse(localStorage.getItem("userinfo"));
        let { id } = detail.user;
        this.$api.member.search(id).then((res) => {
          console.log(res);
          let { member, verify } = res.data;
          if (verify) {
            this.userinfo.circleUrl = member[0].useravatar;
            this.userinfo.username = member[0].nickname;
          }
        });
      } else {
        this.userinfo.circleUrl =
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        this.userinfo.username = "请登录";
      }
    },
    logout() {
      localStorage.removeItem("userinfo");
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$router.go(0);
    },
  },
  created() {
    this.userDetail();
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        // console.log(to)
        this.breadArr = [];
        let newArr = to.matched;
        for (let i = 0; i < newArr.length; i++) {
          const item = newArr[i];
          if (item.path != "/admin") {
            this.breadArr.push(item);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background-color: #ddd;
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow: scroll;
    width: 110%;
    height: 120%;
  }
}

.el-main {
  padding: 0;
  min-width: 500px;
  position: relative;
  .userinfo {
    position: absolute;
    top: 5px;
    right: 30px;
    .el-dropdown-link {
      display: flex;
      span {
        display: block;
        line-height: 40px;
        margin-left: 10px;
      }
    }
  }
  .el-breadcrumb {
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #ddd;
  }
}
</style>