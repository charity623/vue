<template>
	<div class="container">
        <img src="../assets/login_bg.png" alt="">
        <div class="main">
            <div class="header">
                <img src="../assets/head_diagram.png" alt="">
            </div>
            <div class="panel" v-if="showPanel==1">
                <h3>登陆</h3>
                <hr>
                <input type="text" placeholder="手机号/邮箱">
                <input type="password" placeholder="密码">
                <input type="button" value="登陆">
                <div>
                    <span @click="showPanel=2">忘记密码？</span>
                    <span @click="showPanel=3">新用户注册</span>
                </div>
                <a href="/"><img src="../assets/weixin_login.png" alt=""></a>
            </div>
            <div class="panel findpanel" v-if="showPanel==2">
                <ul class="find">
                    <li v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}" :key="item">{{item}}</li>
                </ul>
                <hr>
                <div v-show="nowIndex==0">
                    <input type="text" placeholder="绑定手机">
                    <div class="getCode">
                        <input type="text" placeholder="验证码">
                        <span v-show="show" @click="getCode">获取验证码</span>
                        <span v-show="!show" class="count">{{count}} s</span>
                    </div>
                    <input type="button" value="登陆">
                </div>
                <div v-show="nowIndex==1">
                    <input type="text" placeholder="输入注册邮箱">
                    <input type="button" value="发送验证邮件">
                </div>
                <a @click="showPanel=1">返回上一级</a>
            </div>
            <div class="panel findpanel" v-if="showPanel==3">
                <ul class="find">
                    <li v-for="(item,index) in registertabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}" :key="item">{{item}}</li>
                </ul>
                <hr>
                <div v-show="nowIndex==0">
                    <input type="text" placeholder="常用手机号码">
                    <input type="password" placeholder="密码">
                    <div class="getCode">
                        <input type="text" placeholder="验证码">
                        <span v-show="show" @click="getCode">获取验证码</span>
                        <span v-show="!show" class="count">{{count}} s</span>
                    </div>
                    <input type="text" placeholder="昵称">
                    <input type="button" value="注册">
                </div>
                <div v-show="nowIndex==1">
                    <input type="text" placeholder="输入注册邮箱">
                    <input type="button" value="注册">
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
.panel{border-radius: 5px;background: #fff;width:390px;padding:36px 24px 20px;margin:0 auto;}
.panel>h3{font-size: 22px;color:#666;font-weight: normal;text-align: left;}
.panel>hr{border:0;height:1px;background: #e6e6e6;margin:24px auto
    ;}
.panel input,.getCode{width:100%;height:40px;margin-bottom:26px;background:#f4f4f4;border-radius: 5px;border:1px solid #ddd;color:#bbb;font-size: 14px;text-indent: 10px;}
.panel input[type="button"] {text-align: center;cursor: pointer;border:0;}
.panel>div{overflow: hidden;}
.panel span{cursor: pointer;}
.panel span:nth-child(1){float: left;}
.panel span:nth-child(2){float: right;}
.panel>a{margin-top:16px;display: block;width:100%;height:100%;}
.panel ul{overflow: hidden;}
.panel ul li{width:50%;text-align: center;float: left;font-size: 18px;color:#c8c8c8;cursor: pointer;}
.panel ul li.active{color:#666;}
.panel.findpanel a{text-decoration: underline;font-size: 12px;color:#666;cursor: pointer;}
.panel input[type="button"]:hover {background: #999;color:#fff;}
.getCode input[type="text"]{width: 70%;float: left;border:0;}
.getCode span{width:100px;float:right;height: 35px;background: #999;margin-top: 2.5px;color:#fff;line-height: 35px;text-align: center;border-radius: 5px;}
.main{position: fixed;top:40px;width:100%;}
.main>.header{margin:0 auto 66px;}
     footer{width:100%;background:#fff;margin-top:30px;}
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
import {} from '@/utils/http'
import { mapState, mapActions } from 'vuex'
import Tool from "../utils/Tool"

export default {
	created() {
		// this.getMsglist();
  //       this.getRecordlist();
	},
	mounted() {
		console.log(Tool.localItem("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI4NSwiaXNzIjoiaHR0cDpcL1wvd3d3LnRpYW55YW50di5jb21cL2dldHRva2VuIiwiaWF0IjoxNTA5NjA5NTI4LCJleHAiOjE1MDk4Njg3MjgsIm5iZiI6MTUwOTYwOTUyOCwianRpIjoiZTAxNzRiNDJmNzE0ZjY1OTBkNzUyYTc3NjA0YmMwNTUifQ.JUfXcoc25PlIoq3B4J1T4L9rqyH5rp0T2EJgXshwjIM"))
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
   }  
	},
	data() {
		return {
            show: true,
            count: '',
            timer: null,
            showPanel:3,
            tabsParam:['手机找回','邮箱找回'],
            registertabsParam:['手机注册','邮箱注册'],
            nowIndex:0,//默认第一个tab为激活状态
		}
	}
}
</script>