// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import FastClick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import Icon from 'vue-svg-icon/Icon.vue';
// import { ToastPlugin } from 'vux'
import Tool from "@/utils/Tool" 
// import VueScroller from 'vue-scroller'

// Vue.use(VueScroller)
// Vue.use(ToastPlugin)
Vue.component('icon', Icon)
// FastClick.attach(document.body);
Vue.config.productionTip = false;
require('es6-promise').polyfill();
sync(store, router);

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  // store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  //这里判断用户是否登录，我例子中是验证本地存储是否有token
  // if (to.path !== '/' && !Tool.getCookie("Token")) {
  //     next({
  //         path: '/',
  //         query: { redirect: to.fullPath }
  //     })
  // } else {
  //     next()
  // }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  // store.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
