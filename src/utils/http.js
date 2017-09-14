import axios from "axios";

axios.defaults.baseURL = 'http://www.tianyantv.com'
//设置默认请求头
axios.defaults.headers = {
	'Content-Type': 'application/json'
}
// 发送请求前处理request的数据
// axios.defaults.transformRequest = [function(data) {
// 	let newData = ''
// 	for (let k in data) {
// 		newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
// 	}
// 	return newData
// }]
// 带cookie请求
// axios.defaults.withCredentials = true

class Axios {
	static get (url) {
	  return data => Axios.connect({
	    url: url,
	    method: 'get',
	    params: data,
	  })
	}
	static post (url) {
	  return data => Axios.connect({
	      url: url,
	      method: 'post',
	      headers: {
	      	'Authorization': 'Bearer '+''
	      },
	      data,
	    }
	  )
	}
	static connect (data) {
	  return axios(data)
	    .then((response) => {
	    	if(response.status == 200){
	        return response.data
	    	}else{
	    		if (response.status === 404) {
	    		  throw '404'
	    		} else if (response.status >= 500 && response.status < 600) {
	    		  throw '服务器接口异常'
	    		}
	    	}
	    })
	    .catch((e) => {
	      if (e === '404') {
          return {
            status: false,
            message: '接口地址不正确'
          }
        } else if (e === '服务器接口异常') {
          return {
            status: false,
            message: '服务器接口异常'
          }
        }else{
        	return {
            status: false,
            message: '网络连接异常，请重试！'
          }
        }
	    })
	}
}

export const login = Axios.post('/live/livedetail')
