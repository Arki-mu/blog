import { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

function success(msg) {
  Message({
    showClose: true, //是否显示关闭按钮
    type: "success",
    message: msg,
    duration: 5000, //默认3000
  });
}

function error(msg) {
  Message({
    showClose: true,
    message: msg,
    type: "error",
    duration: 5000,
  });
}

export { success, error };
