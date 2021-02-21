const Member = {
  path: "member",
  name: "MemberIndex",
  component: () => import("@/pages/index/views/admin/member/Index.vue"),
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
    title: "会员管理",
    name: "会员管理",
    icon:"el-icon-user",
    leftNav: true,
    keepAlive: false,
    requireAuth: true,
  },
  children: [
    {
      path: "search",
      name: "MemberSearch",
      component: () => import("@/pages/index/views/admin/member/Search.vue"),
      meta: {
        title: "会员查看",
        name: "会员查看",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
    {
      path: "add",
      name: "MemberAdd",
      component: () => import("@/pages/index/views/admin/member/Add.vue"),
      meta: {
        title: "会员添加",
        name: "会员添加",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
    {
      path: "edit/:uid",
      name: "MemberEdit",
      component: () => import("@/pages/index/views/admin/member/Edit.vue"),
      meta: {
        title: "会员修改",
        name: "会员修改",
        leftNav: false,
        keepAlive: false,
        requireAuth: true,
      },
    },
    {
      path: "role",
      name: "MemberRole",
      component: () => import("@/pages/index/views/admin/member/Role.vue"),
      meta: {
        title: "角色管理",
        name: "角色管理",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
  ],
};

export default Member;
