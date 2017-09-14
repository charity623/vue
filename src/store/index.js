import Vue from 'vue'; 
import Vuex from 'vuex'; 
import * as actions from './actions'; 
import * as getters from "./getters"; 
import mutations from './mutations'; 
import state from "./rootState"; 

Vue.use(Vuex)

let store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

export default store