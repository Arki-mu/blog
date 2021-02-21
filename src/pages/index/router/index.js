import Vue from "vue";
import VueRouter from "vue-router";
//（非管理员）主页
import Home from "./home/Index";
//登陆
import Login from "./Login";
//管理员
import Admin from "./admin/Index";

Vue.use(VueRouter);

const routes = [Home, Login, Admin];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 导航守卫
//vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。
//有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
//记住参数或查询的改变并不会触发进入/离开的导航守卫。

router.beforeEach((to, from, next) => {
  //$route.matched 一个数组，包含当前路由的所有嵌套路径片段的路由记录 。
  if (to.matched.some((auth) => auth.meta.requiresAuth)) {
    if (to.name === "Login") {
      next();
    } else {
      if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        // ------- 解决跨域问题--------
        Vue.axios({
          url: "/api/token.php",
          headers: {
            TOKEN: token,
          },
        }).then((res) => {
          // console.log(res);
          if (res.data.verify) {
            next();
          } else {
            next("/login");
          }
        });
      } else {
        next("/login");
      }
    }
  } else {
    next();
  }
});

export default router;
