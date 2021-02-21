import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/plugin/axios";
import "@/plugin/element";
import "@/plugin/VueQuillEditor"; //富文本编辑器
import Qs from "qs";
import api from "../../plugin/axios";

Vue.config.productionTip = false; //阻止生成环境报错的提示
Vue.prototype.Qs = Qs;
Vue.prototype.$api = api;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
