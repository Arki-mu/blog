import axios from "axios";
const article = {
  classAdd(data) {
    return axios({
      method: "post",
      url: "/api/article/classadd.php",
      data,
    });
  },
  classDel(params) {
    return axios({
      method: "get",
      url: "/api/article/classdel.php",
      params,
    });
  },
  classShow(params) {
    return axios({
      method: "get",
      url: "/api/article/classshow.php",
      params,
    });
  },
  articlePost(data) {
    return axios({
      method: "post",
      url: "/api/article/post.php",
      data,
    });
  },
  articleShow(id) {
    return axios({
      method: "get",
      url: "/api/article/list.php",
      params: {
        classid: id,
      },
    });
  },
};

export default article;
