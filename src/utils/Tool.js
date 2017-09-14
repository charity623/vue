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
	formatDate(str) {
		var date = new Date(str.replace(/-/g, '/'));
		var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
		
		if (time < 0) {
			return '---';
		} else if (time / 1000 < 60) {
			return '刚刚';
		} else if ((time / 60000) < 60) {
			return parseInt((time / 60000)) + '分钟';
		} else if ((time / 3600000) < 24) {
			return parseInt(time / 3600000) + '小时';
		} else if ((time / 86400000) < 31) {
			return parseInt(time / 86400000) + '天';
		} else if ((time / 2592000000) < 12) {
			return parseInt(time / 2592000000) + '月';
		} else {
			return parseInt(time / 31536000000) + '年';
		}
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