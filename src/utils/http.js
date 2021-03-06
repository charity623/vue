import axios from "axios";

// axios.defaults.baseURL = 'http://192.168.10.121'
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
	  return (data,token) => Axios.connect({
	    url: url,
	    method: 'get',
	    headers: {
	      	'Authorization': 'Bearer '+token
	      },
	    params: data,
	  })
	}
	static post (url) {
	  return (data, token) => Axios.connect({
	      url: url,
	      method: 'post',
	      headers: {
	      	'Authorization': 'Bearer '+ token
	      },
	      data,
	    }
	  )
	}
	static delete (url) {
	  return (data, token) => Axios.connect({
	      url: url,
	      method: 'delete',
	      headers: {
	      	'Authorization': 'Bearer '+ token
	      },
	      data,
	    }
	  )
	}
	static connect (data) {
	  return axios(data)
	    .then((response) => {
	    	if(response.status == 200){
	    		// if(response.data.error == 0){
	    		// 	return response.data
	    		// } else {
	    		// 	console.log(response.data.desc)
	    		// }
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
            error: 404,
            desc: '接口地址不正确'
          }
        } else if (e === '服务器接口异常') {
          return {
            error: false,
            desc: '服务器接口异常'
          }
        }
        else if (e === '500') {
          return {
            error: false,
            desc: '内部服务器错误'
          }
        }else{
        	return {
            error: false,
            desc: '网络连接异常，请重试！'
          }
        }
	    })
	}
}
// person.vue
export const recordlist = Axios.get('/live/recordlist');//获取视频列表
export const userinfo = Axios.get;//根据uid获取用户个人信息
export const msglist = Axios.get('/live/messageboard');//获取留言板列表
export const sendmsg = Axios.post('/live/messageboard');//发送留言
export const addVisitorhis = Axios.post('/user/addvisitorhis');//添加访客记录
export const getVisitorhis = Axios.post('/user/visitorhis');//获取访客列表
export const getAssocbylid = Axios.post('/live/getassocbylid');//根据uid查询主播关联主播
export const getLoginUserinfo = Axios.post('/user/getuserdetail');//根据token获取用户个人信息
export const livedetail = Axios.post('/live/livedetail');//根据token获取直播间信息
export const noticeUser = Axios.post('/user/focusto');//关注主播
export const sendPrivate = Axios.post('/user/message');//发送私信

//login.vue
export const login = Axios.post('/user/login');//login
export const emailRegister = Axios.post('/user/register');//邮箱注册
export const sendRegCode = Axios.post('/user/sendregcode');//发送注册验证码 用于（注册，绑定，更新手机号）
export const sendFindCode = Axios.post('/user/sendcode');//发送验证码 用于（找回，重置）
export const mobileRegister = Axios.post('/user/phoneregister')//手机注册
export const findPwdByPhone = Axios.post('/user/phoneresetpwd')//手机找回密码
export const findPwdByEmail = Axios.post('/user/forget')//邮箱找回密码






