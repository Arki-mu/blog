const Article = {
  path: "article",
  name: "ArticleIndex",
  component: () => import("@/pages/index/views/admin/article/Index.vue"),
  // beforeEnter: (to, from, next) => {
  //   if (localStorage.getItem("level")) {
  //     let userLevel = localStorage.getItem("level");
  //     if (userLevel === "0") {
  //       next();
  //     } else {
  //       alert("权限不足");
  //     }
  //   } else {
  //     next("/login");
  //   }
  // },
  meta: {
    title: "文章管理",
    name: "文章管理",
    icon:"el-icon-reading",
    leftNav: true,
    keepAlive: false,
    requireAuth: true,
  },
  children: [
    {
      path: "search",
      name: "ArticleSearch",
      component: () => import("@/pages/index/views/admin/article//Search.vue"),
      meta: {
        title: "文章查看",
        name: "文章查看",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
    {
      path: "post",
      name: "ArticlePost",
      component: () => import("@/pages/index/views/admin/article/Post.vue"),
      meta: {
        title: "文章发布",
        name: "文章发布",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
    {
      path: "class",
      name: "ArticleClass",
      component: () => import("@/pages/index/views/admin/article/Class.vue"),
      meta: {
        title: "文章分类",
        name: "文章分类",
        leftNav: true,
        keepAlive: false,
        requireAuth: true,
      },
    },
    {
      path: "edit/:aid",
      name: "ArticleEdit",
      component: () => import("@/pages/index/views/admin/article/Edit.vue"),
      meta: {
        title: "文章修改",
        name: "文章修改",
        leftNav: false,
        keepAlive: false,
        requireAuth: true,
      },
    },
  ],
};

export default Article;
