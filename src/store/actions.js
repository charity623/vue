// import http from "@/utils/http"
import Tool from "@/utils/Tool"
import { URL } from "@/utils/API"
import axios from "axios";

// export const fun = ({ commit }) => {
//   axios.get('http://rapapi.org/mockjsdata/22512/test', {
//     params: {
//       request: 12345
//     }
//   })
//   .then(data => {
//     commit({
//       type: 'getMsg',
//       data,
//     })
//   })
//   .catch(error => console.log(error));
// }

export const getPlanBySysId = ({ commit }) => {
	var sysList = http.get(URL.getSysByUserId, {
    params: {
      userId: Tool.getCookie("userId"),
      isAdmin: Tool.getCookie("isadmin")
    }
  })
  console.log(sysList)
}
