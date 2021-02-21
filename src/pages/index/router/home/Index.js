const Home = {
  path: "/",
  alias: "/index", //别名配置
  name: "Index",
  meta:{
    title:"首页",
    name:"首页",
    icon:"el-icon-s-home"
  },
  component: () => import("../../views/Index/Index.vue"),
};
export default Home;
