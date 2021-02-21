import children from "./children.js";

const Admin = {
  path: "/admin",
  name: "AdminIndex",
  component: () => import("../../views/admin/AdminIndex.vue"),
  meta: {
    title: "管理员界面",
    name: "管理员界面",
    leftNav: true,
    keepAlive: false,
    requiresAuth: true,
  },
  children,
};

export default Admin;
