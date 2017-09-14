import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/components/Home';
import Person from '@/components/Person';
// import SysInfo from '@/components/SysInfo';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Person',
      component: Person,
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    //   children: [{
    //     path: '/home',
    //     component: function (resolve) {
    //       require(['@/components/SysInfo.vue'], resolve)
    //     },
    //   }]
    // },
    // {
    //   path: '/plans',
    //   name: 'plans',
    //   component: Home,
    //   children: [{
    //     path: '/plans',
    //     component: function (resolve) {
    //       require(['@/components/Plans.vue'], resolve)
    //     },
    //   }]
    // },
    // {
    //   path: '/compile',
    //   name: 'compile',
    //   component: Home,
    //   children: [{
    //     path: '/compile',
    //     component: function (resolve) {
    //       require(['@/components/Compile.vue'], resolve)
    //     },
    //   }]
    // },
    // {
    //   path: '/irrigate',
    //   name: 'irrigate',
    //   component: Home,
    //   children: [{
    //     path: '/irrigate',
    //     component: function (resolve) {
    //       require(['@/components/Irrigate.vue'], resolve)
    //     },
    //   }]
    // },
    // {
    //   path: '/setting',
    //   name: 'setting',
    //   component: Home,
    //   children: [{
    //     path: '/setting',
    //     component: function (resolve) {
    //       require(['@/components/Setting.vue'], resolve)
    //     },
    //   },{
    //     path: 'personal',
    //     component: function (resolve) {
    //       require(['@/components/Personal.vue'], resolve)
    //     },
    //   },{
    //     path: 'modify',
    //     component: function (resolve) {
    //       require(['@/components/Modify.vue'], resolve)
    //     },
    //   }]
    // },
  ],
});

export default router
