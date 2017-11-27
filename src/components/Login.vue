<template>
	<div class="container">
        <img src="../assets/login_bg.png" alt="">
        <div class="main">
            <div class="header">
                <img src="../assets/head_diagram.png" alt="">
            </div>
            <!-- 登陆 -->
            <div class="panel" v-if="showPanel==1">
                <h3>登陆</h3>
                <hr>
                <input type="text" placeholder="手机号/邮箱" v-model="loginParams.username">
                <input type="password" placeholder="密码" v-model="loginParams.password">
                <div class="getImgCode" v-show="isshowLogincode">
                    <input type="text" placeholder="验证码" v-model="loginParams.captcha">
                    <img v-bind:src="getImgCodeParam" alt="" @click="getImgCode()">
                </div>
                <input type="button" value="登陆" @click="login()">
                <div>
                    <span @click="showPanel=2">忘记密码？</span>
                    <span @click="showPanel=3">新用户注册</span>
                </div>
                <a href="/"><img src="../assets/weixin_login.png" alt=""></a>
            </div>
            <!-- 找回密码 -->
            <div class="panel findpanel" v-if="showPanel==2">
                <ul class="find">
                    <li v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}" :key="item">{{item}}</li>
                </ul>
                <hr>
                <div v-show="nowIndex==0">
                    <input type="text" placeholder="绑定手机" v-model="mfindPwd.phone">
                    <div class="getCode">
                        <input type="text" placeholder="验证码" v-model="mfindPwd.code">
                        <span v-show="show" @click="sendFindPwdCode()">获取验证码</span>
                        <span v-show="!show" class="count">{{count}} s</span>
                    </div>
                    <input type="password" placeholder="新密码" v-model="mfindPwd.password">
                    <input type="button" value="确认" @click="findPwd(1)">
                </div>
                <div v-show="nowIndex==1">
                    <input type="text" placeholder="输入注册邮箱" v-model = "efindPwd.email">
                    <div class="getImgCode">
                        <input type="text" placeholder="验证码" v-model="efindPwd.captcha">
                        <img v-bind:src="getImgCodeParam" alt="" @click="getImgCode()">
                    </div>
                    <input type="button" value="发送验证邮件" @click="findPwd(2)">
                </div>
                <a @click="showPanel=1">返回上一级</a>
            </div>
            <!-- 注册 -->
            <div class="panel findpanel" v-if="showPanel==3">
                <ul class="find">
                    <li v-for="(item,index) in registertabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}" :key="item">{{item}}</li>
                </ul>
                <hr>
                <div v-show="nowIndex==0">
                    <input type="text" placeholder="常用手机号码" v-model="mRegisterParams.phone">
                    <input type="password" placeholder="密码" v-model="mRegisterParams.password">
                    <div class="getCode">
                        <input type="text" placeholder="验证码" v-model="mRegisterParams.code">
                        <span v-show="show" @click="sendRegisterCode">获取验证码</span>
                        <span v-show="!show" class="count">{{count}}s</span>
                    </div>
                    <input type="text" placeholder="昵称" v-model="mRegisterParams.name">
                    <input type="button" value="注册" @click="mobileRegister()">
                </div>
                <div v-show="nowIndex==1">
                    <input type="text" placeholder="输入注册邮箱" v-model="eRegisterParams.email">
                    <input type="password" placeholder="密码" v-model="eRegisterParams.password">
                    <div class="getImgCode">
                        <input type="text" placeholder="验证码" v-model="eRegisterParams.captcha">
                        <img v-bind:src="getImgCodeParam" alt="" @click="getImgCode()">
                    </div>
                    <input type="text" placeholder="昵称" v-model="eRegisterParams.name">
                    <input type="button" value="注册" @click="emailRegister()">
                </div>
                <a @click="showPanel=1">已有账号？直接登陆</a>
            </div>
        </div>
        <footer>
            <div class="top">
                <img src="../assets/blurb.png" alt="">
                <ul>
                    <h4>联系我们</h4>
                    <li><a href="">项目/职位咨询：markmo@tianyantv.com</a></li>
                    <li><a href="">内容、品牌合作：hefan@tianyantv.com</a></li>
                    <li><a href="">产品建议/问题反馈：chengyuan@tianyantv.com</a></li>
                </ul>
                <ul>
                    <h4>常见问题</h4>
                    <li><a href="">如何成为主播</a></li>
                    <li><a href="">如何开播</a></li>
                    <li><a href="">其他使用问题</a></li>
                </ul>
            </div>
            <p></p>
            <div class="bottom">
                <a href="http://weibo.com/u/5815791757?refer_flag=1001030001_&amp;nick=%E5%A4%A9%E7%9C%BC%E9%80%9A%E8%A7%86%E9%A2%91&amp;is_hot=1"><img src="../assets/weibo_list.png" alt=""></a>
                <p>Copyright&nbsp;2015-2017&nbsp;天眼通&nbsp;All Rights Reserved &gt;京ICP备16002486号</p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
    .show{display: block!important;}
    .mask{width:100%;height:100%;background:rgba(0,0,0,.4);position: fixed;top:0;left:0;z-index: 2;display: none;}
    .panel{border-radius: 5px;background: #fff;width:390px;padding:36px 24px 20px;margin:0 auto;box-shadow: 2px 0 8px rgba(0,0,0,.4);}
    .panel>h3{font-size: 22px;color:#666;font-weight: normal;text-align: left;}
    .panel>hr{border:0;height:1px;background: #e6e6e6;margin:24px auto
        ;}
    .panel input,.getCode{width:100%;height:40px;margin-bottom:26px;background:#f4f4f4;border-radius: 5px;border:1px solid #ddd;color:#bbb;font-size: 14px;text-indent: 10px;}
    .panel input[type="button"] {text-align: center;cursor: pointer;border:0;}
    /*.panel>div{overflow: hidden;}*/
    .panel span{cursor: pointer;}
    .panel span:nth-child(1){float: left;}
    .panel span:nth-child(2){float: right;}
    .panel>a{margin-top:16px;display: block;width:100%;height:100%;}
    .panel ul{overflow: hidden;}
    .panel ul li{width:50%;text-align: center;float: left;font-size: 18px;color:#c8c8c8;cursor: pointer;}
    .panel ul li.active{color:#666;}
    .panel.findpanel a{text-decoration: underline;font-size: 12px;color:#666;cursor: pointer;}
    .panel input[type="button"]:hover {background: #999;color:#fff;}
    .getCode input[type="text"],.getImgCode input[type="text"]{width: 70%;float: left;border:0;}
    .getCode span{width:100px;float:right;height: 35px;background: #999;margin-top: 2.5px;color:#fff;line-height: 35px;text-align: center;border-radius: 5px;}
    .getImgCode input[type="text"]{width:60%;border:1px solid #ddd;}
    .getImgCode img{height:38px;float: right;border: 1px solid #ddd}
    .main{position: fixed;top:40px;width:100%;}
    .main>.header{margin:0 auto 66px;}
     .container>img{width:100%;}
     
     footer{width:100%;background:#fff;position: fixed;bottom: 0;}
     footer>div{width:1200px;margin:0 auto;}
     footer .top{height:174px;}
     footer .top img{margin-top:20px;margin-right:72px;}
     footer .top ul{float:right;margin-top:40px;}
     footer .top ul:nth-child(3){margin-right:100px;}
     footer .top ul h4{font-size:15px;color:#333;margin-bottom:12px;text-align: left;}
     footer .top ul li{font-size:14px;color:#999;margin-bottom:6px;float: none;text-align: left;}
     footer .top ul li a{color:#999;}
     footer>p{height:1px;background:#e0e0e0;width:100%;}
     footer .bottom{height:35px;}
     footer .bottom a{width:20px;height:17px;float: left;margin-left: 135px;}
     footer .bottom img{width:20px;height:17px;margin-top:8px;}
     footer .bottom p{float:right;line-height:35px;display:inline-block;font-size:12px;color:#666;}

</style>

<script>
import {login,emailRegister,sendRegCode,mobileRegister,findPwdByPhone,findPwdByEmail,sendFindCode} from '@/utils/http'
import { mapState, mapActions } from 'vuex'
import Tool from "../utils/Tool"

export default {
	created() {
        document.title="天眼通登录"
	},
	mounted() {
		
	},
	computed: {
		...mapState({
			route: state => state.route,
		}),
		btnFlag(){
			return this.text.trim().length == 0;
        },
		subBtnFlag(){
			return this.subText.trim().length == 0;
        },
        slicedRecordInfo(){
            return this.recordinfo.slice(0,8)
        },
        id(){
            return this.route.params.id;
        }
	},
	methods: {
         toggleTabs(index){
            this.nowIndex=index;
        },
        getCode(){
            const TIME_COUNT = 3;
            if (!this.timer) {
               this.count = TIME_COUNT;
               this.show = false;
               this.timer = setInterval(() => {
               if (this.count > 0 && this.count <= TIME_COUNT) {
                 this.count--;
                } else {
                 this.show = true;
                 clearInterval(this.timer);
                 this.timer = null;
                }
               }, 1000)
            }
        },
        getImgCode(){
            this.getImgCodeParam="http://192.168.10.121/user/captcha?_"+new Date().getTime();
        },
        async sendRegisterCode(){
            if(!this.mRegisterParams.phone){
                Tool.text("请输入手机号");
                return false;
            }
            const res = await sendRegCode({'phone':this.mRegisterParams.phone})
            console.log(res)
            if(res.error==0&&res.error){
                Tool.text("验证码发送成功");
                this.getCode();
            } else {
                Tool.text(res.desc)
            }
        },
        async sendFindPwdCode(){
            if(!this.mfindPwd.phone){
                Tool.text("请输入手机号");
                return false;
            }
            const res = await sendFindCode({'phone':this.mfindPwd.phone})
            console.log(res)
            if(res.error==0){
                Tool.text("验证码发送成功");
                this.getCode();
            } else {
                Tool.text(res.desc)
            }
        },
        async login() {
            const res = await login(this.loginParams)
            this.logindata = res;
            if(this.logindata.error==0){
                Tool.localItem("token",this.logindata.token);
                window.location.href = "www.tianyantv.com"
            } else {
                Tool.text('密码错误三次');
                this.isshowLogincode = !this.isshowLogincode;
            }
        },
        async emailRegister() {
            const res = await emailRegister(this.eRegisterParams)
            this.eRegisterdata = res;
            if(res.error==0){
                // Tool.localItem("token",res.token);
                // window.location.reload();
            }  else {
                Tool.text(res.desc)
            }
        },
        async mobileRegister(){
            const res = await mobileRegister(this.mRegisterParams)
            this.mRegisterdata = res;
            if(res.error==0){
                Tool.text("注册成功")
            } else {
                Tool.text(res.desc)
            }
        },
        async findPwd(type){
            //type 1：手机 2：邮箱
            switch (type) {
                case 1:

                    const res = await findPwdByPhone(this.mfindPwd);
                    if(res.error==0){
                        Tool.text(res.desc)
                    };
                    return false;
                case 2:
                    const res1 = await findPwdByEmail();
                    if(res1.error==0){

                    } else {
                        Tool.text(res1.desc)
                    };
                    return false;
            }
        }
	},
	data() {
		return {
            show: true,
            count: '',
            timer: null,
            showPanel:2,//1登陆 2找回密码 3注册
            tabsParam:['手机找回','邮箱找回'],
            registertabsParam:['手机注册','邮箱注册'],
            nowIndex:0,//默认第一个tab为激活状态
            loginParams:{},//login model
            logindata:{},
            eRegisterParams:{},//邮箱注册 model
            eRegisterdata:{},
            getImgCodeParam:'http://192.168.10.121/user/captcha',//图片验证码
            mRegisterParams:{},//手机注册 model
            mRegisterdata:{},
            isshowLogincode:false,
            mfindPwd:{},//找回密码 by mobile 
            efindPwd:{},//找回密码 by email
		}
	}
}
</script>