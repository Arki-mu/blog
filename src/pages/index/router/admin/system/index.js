const System = {
  path: "system",
  name: "SystemIndex",
  component: () => import("@/pages/index/views/admin/system/Index.vue"),
  // beforeEnter: (to, from, next) => {
  //   if (localStorage.getItem("level")) {
  //     let userLevel = localStorage.getItem("level");
  //     if (userLevel === "0") {
  //       next();
  //     } else {
  //       alert("权限不足");
  //       // next("");
  //     }
  //   } else {
  //     next("/login");
  //   }
  // },
  meta: {
    title: "系统设置",
    name: "系统设置",
    icon: "el-icon-setting",
    leftNav: true,
    keepAlive: false,
    requiresAuth: true,
  },
  children: [
    {
      path: "setting",
      name: "Setting",
      component: () => import("@/pages/index/views/admin/system/Setting.vue"),
      meta: {
        title: "全局配置",
        name: "全局配置",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
  ],
};

export default System;
