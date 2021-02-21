import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { Loading, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Qs from "qs";

import member from "./member";
import article from "./article.js";

Vue.use(VueAxios, axios);

// axios.defaults.baseURL ="http://yunxiaodian.xyz/";//配置接口地址
// axios.defaults.baseURL = "https://ty.php800.cn/"; //配置接口地址
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded";
// axios.defaults.headers.common["TOKEN"] = localStorage.getItem("token");
// axios.defaults.headers.common["SAT"] = "1234567";
axios.defaults.timeout = 5000; //响应时间
axios.defaults.withCredentials = true;
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
axios.defaults.transformRequest = [
  // 对 data 进行任意转换处理
  function(data) {
    if (data instanceof FormData) {
      return data;
    } else {
      return Qs.stringify(data);
    }
  },
];

// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
// axios.defaults.transformResponse = [
//   function(data) {
//     // 对 data 进行任意转换处理
//     return data;
//   },
// ];

// `params` 是即将与请求一起发送的 URL 参数
// 必须是一个无格式对象(plain object)或 URLSearchParams 对象
// `paramsSerializer` 是一个负责 `params` 序列化的函数
axios.defaults.paramsSerializer = function(params) {
  return Qs.stringify(params);
};

//添加请求拦截器
let loadingInstance;

//请求拦截
axios.interceptors.request.use(
  function(config) {
    config.headers.common["TOKEN"] = localStorage.getItem("token");
    config.headers.common["SAT"] = "1234567";
    //发送请求前
    loadingInstance = Loading.service({
      //   fullscreen: true,
      lock: true,
      text: "拼命加载中",
      //   spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    return config;
  },
  function(error) {
    //发送请求错误
    loadingInstance.close();
    Message({
      showClose: true,
      message: error,
      type: "error",
    });
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  function(response) {
    // 响应数据
    loadingInstance.close();
    return response;
  },
  function(error) {
    loadingInstance.close();
    //响应错误
    Message({
      showClose: true,
      message: error,
      type: "error",
    });
    return Promise.reject(error);
  }
);

const api = {
  member,
  article,
};

export default api;
