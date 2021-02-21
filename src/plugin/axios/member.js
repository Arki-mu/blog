import axios from "axios";
const member = {
  search(id) {
    let params = {
      id,
    };
    return axios({
      method: "get",
      url: "/api/member/search.php",
      params,
    });
  },
};

export default member;
