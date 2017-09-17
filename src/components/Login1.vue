<template>
  <div class="loginPanel">
    <p class="logo"><img src="../assets/logo.gif" alt=""></p>
    <p class="title">自动化轮灌系统123</p>
    <!-- <group>
      <x-input placeholder="请输入账号" type="text" pattern="[0-9]*" required ref="username" v-model="loginName">
        <icon class="icon" slot="label" name="user" :scale="2.5"></icon>
      </x-input>
      <x-input placeholder="请输入密码" class="password" type="password" ref="password" required v-model="loginPass">
        <icon class="icon" slot="label" name="password" :scale="2.5"></icon>
      </x-input>
    </group>
    <check-icon class="remember" :value.sync="remember" type="plain">记住密码?</check-icon>
    <x-button type="primary" @click.native="login">登录</x-button> -->
  </div>
</template>

<script>
// import { Group, XInput, XButton, CheckIcon } from 'vux'
import axios from "axios"
import { URL } from "@/utils/API"
import Tool from "@/utils/Tool"
// import { login, login2 } from '@/utils/http'

export default {
  // components: {
  //   Group,
  //   XInput,
  //   XButton,
  //   CheckIcon,
  // },
  mounted(){
    this.$store.commit('updateLoadingStatus', {isLoading: false})
    const remember = Tool.getCookie("remember");
    if(Tool.getCookie("Token")){
      this.$router.push("/home");
    }
    if(remember == "true"){
      this.remember = true;
      this.loginName = Tool.getCookie("loginName");
      this.loginPass = Tool.getCookie("loginPass");
    }
    // this.get1()
  },
  methods: {
    login(){
      const _this = this;
      const username = this.$refs.username;
      const password = this.$refs.password;
      if(!username.currentValue || !password.currentValue){
        Tool.toast(this, '请输入手机号、密码');
      }
      if(username.valid && password.valid){
        if(_this.remember){
          Tool.setCookie("remember", _this.remember, 1);
          Tool.setCookie("loginName", username.currentValue, 1);
          Tool.setCookie("loginPass", password.currentValue, 1);
        }else{
          Tool.setCookie("remember", _this.remember, -1);
          Tool.setCookie("loginName", username.currentValue, -1);
          Tool.setCookie("loginPass", password.currentValue, -1);
        }
        axios.get(URL.LOGIN + "?username="+username.currentValue+"&password="+password.currentValue+"")
          .then(function (response) {
            if(response.data.status ==  true){
              Tool.setCookie("userId", response.data.result.id, 1);
              Tool.setCookie("userName", response.data.result.userName, 1);
              Tool.setCookie("isadmin", response.data.result.isAdmin, 1);
              Tool.setCookie("Token", response.data.result.openToken, 1);
              Tool.setCookie("unismName", response.data.result.account, 1);
              Tool.setCookie("apiKey", response.data.result.apiKey, 1);
              Tool.setCookie("groupId", response.data.result.groupId, 1);
              Tool.setCookie("ConsoleToken", response.data.result.token, 1);
              Tool.setCookie("userNum", response.data.result.userNum, 1);
              Tool.setCookie("groupName", response.data.result.groupName, 1);
              Tool.setCookie("isLeader", response.data.result.leader, 1);
              _this.$router.push("/home");
            }
            Tool.toast(_this, response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    async get1() {
      let res = await login({ username: 'admin', password: 'dbadmin2018' })
      console.log(res)
      let res2 = await login2({ username: 'admin', password: 'dbadmin2018', msg: res.message })
      console.log(res2)
      // let parallelDataFetch = await Promise.all([
      //     login({ username: 'admin', password: 'dbadmin2018' }),
      //     login2({ username: 'admin', password: 'dbadmin2018' }),
      // ]);
      // console.log('Async parallel+fetch >>>', parallelDataFetch);
    }
  },
  data() {
    return {
      remember: false,
      loginName: "",
      loginPass: "",
      // isMobile: function (value) {
      //   return {
      //     valid: /^1[3|4|5|7|8]\d{9}$/.test(value),
      //     msg: '请输入合法手机号'
      //   }
      // },
    };
  },
};
</script>

<style>
body { background-color: #fbf9fe; width: 10rem!important; height:100%; margin: 0 auto; }
.title{ color: #333; font-size: 30px;}
.logo{ width: 100%; height: 80px; margin: 50px auto 50px; }
.logo>img{ width: 80%; }
.loginPanel{ padding-top: 50px; }
.loginPanel .svg-icon{ vertical-align: middle; margin-right: 10px; }
.weui-input{ font-size: 16px!important; padding: 5px 15px; vertical-align: bottom; }
.loginPanel .weui-btn_primary { width: 90%!important; margin: 1.5rem auto;}
.remember{ float: right; margin-right: 0.4rem; padding-top: 0.2rem; font-size: 0.4rem; }
.password:after {content: " ";position: absolute;left: 0;bottom: 0;right: 0;height: 1px;border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5);}
</style>
