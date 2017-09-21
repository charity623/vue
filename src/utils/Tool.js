const phpcms_path = '/';
const cookie_pre = 'jsgg_';
const cookie_domain = '';
const cookie_path = '/';

export default {
	setCookie(name, value, days) {
	    name = cookie_pre + name;
	    const argc = arguments.length;
	    const argv = arguments;
	    const secure = (argc > 5) ? argv[5] : false;
	    const expire = new Date();
	    if (days == null || days == 0) days = 1;
	    expire.setTime(expire.getTime() + 12*60*60*1000);
	    document.cookie = name + "=" + escape(value) + ("; path=" + cookie_path) + ((cookie_domain == '') ? "" : ("; domain=" + cookie_domain)) + ((secure == true) ? "; secure" : "") + ";expires=" + expire.toGMTString();
	},
	getCookie(name) {
	    name = cookie_pre + name;
	    const arg = name + "=";
	    const alen = arg.length;
	    const clen = document.cookie.length;
	    let i = 0;
	    while (i < clen) {
	        const j = i + alen;
	        if (document.cookie.substring(i, j) == arg) return this.getCookieVal(j);
	        i = document.cookie.indexOf(" ", i) + 1;
	        if (i == 0) break;
	    }
	    return null;
	},
	delCookie(name) {
	    const exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    const cval = this.getCookie(name);
	    name = cookie_pre + name;
	    document.cookie = name + "=" + cval + ";path=" + cookie_path + ";expires=" + exp.toGMTString();
	},
	getCookieVal(offset) {
	    let endstr = document.cookie.indexOf(";", offset);
	    if (endstr == -1)
	        endstr = document.cookie.length;
	    return unescape(document.cookie.substring(offset, endstr));
	},
	localItem(key, value) {
		if (arguments.length == 1) {
			return localStorage.getItem(key);
		} else {
			return localStorage.setItem(key, value);
		}
	},
	removeLocalItem(key) {
		if (key) {
			return localStorage.removeItem(key);
		}
		return localStorage.removeItem();
	},
	formatDate(timeStamp) {
		// var date = new Date(str.replace(/-/g, '/'));
		var time = Date.now() - timeStamp; //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
		if (time < 0) {
			return '---';
		} else if (time / 1000 < 60) {
			return '刚刚';
		} else if ((time / 60000) < 60) {
			return parseInt((time / 60000)) + '分钟前';
		} else if ((time / 3600000) < 24) {
			return parseInt(time / 3600000) + '小时前';
		} else if ((time / 86400000) < 31) {
			return parseInt(time / 86400000) + '天前';
		} else if ((time / 2592000000) < 12) {
			return parseInt(time / 2592000000) + '月';
		} else {
			return parseInt(time / 31536000000) + '年';
		}
	},
	unixToDate(time) {
		var unixtime = time * 1000;
		var date = new Date(unixtime);
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		return date.getFullYear() + "/" + month + "/" + currentDate + " " + hh + ":" + mm + ":" + ss;
		//返回格式：yyyy-MM-dd
	},
	getTheTime(time) {
		var now = this.getUnix(); //当前时间戳
		var today = this.getToday(); //今天0点时间戳
		var year = this.getYear(); //今年0点时间戳
		var timer = now - time;
		var tip = '';
		if (timer < 3600) {
			var min = Math.floor(timer / 60);
			if(min <= 0){
				tip = '刚刚';
			}else{
				tip = Math.floor(timer / 60) + '分钟前';
			}
		} else if (timer >= 3600 && (time - today >= 0)) {
			tip = Math.floor(timer / 3600) + '小时前';
		} else if (time - today < 0 && (time - year >= 0)) {
			tip = this.getLastDate(time, 'month');
		} else {
			tip = this.getLastDate(time, 'year');
		};
		return tip;
	},
	getLastDate(time, type) {
		var unixtime = time * 1000;
		var date = new Date(unixtime);
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		if (type == 'month') {
			return month + "-" + currentDate + ' ' + hh + ':' + mm;
		} else {
			// return date.getFullYear() + '-' + month + "-" + currentDate + ' ' + hh + ':' + mm;
			return hh + ':' + mm;
		};
	},
	getYear() {
		var today = new Date();
		var year = today.getFullYear();
		var month = 0;
		var day = 1;
		var hours = 0;
		var mins = 0;
		var secs = 0;
		var datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
		var tmp_datetime = datetime.replace(/:/g, '-');
		tmp_datetime = tmp_datetime.replace(/ /g, '-');
		var arr = tmp_datetime.split("-");
		var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
		return parseInt(now.getTime() / 1000);
	},
	getToday() {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var hours = 0;
		var mins = 0;
		var secs = 0;
		var datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
		var tmp_datetime = datetime.replace(/:/g, '-');
		tmp_datetime = tmp_datetime.replace(/ /g, '-');
		var arr = tmp_datetime.split("-");
		var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
		return parseInt(now.getTime() / 1000);
	},
	getUnix() {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var hours = today.getHours();
		var mins = today.getMinutes();
		var secs = today.getSeconds();
		var datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
		var tmp_datetime = datetime.replace(/:/g, '-');
		tmp_datetime = tmp_datetime.replace(/ /g, '-');
		var arr = tmp_datetime.split("-");
		var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
		return parseInt(now.getTime() / 1000);
	},
	paramType(data){
    // data['token'] = 'pt';
		let paramArr = []; 
    let paramStr = ''; 
    for (let attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    paramStr = '?' + paramStr;
    return paramStr;
	}
}