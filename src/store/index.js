import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters'
// import axios from 'axios';
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
  // state: {
  //   userobj:''
  // },
  // mutations: {
  //   login(state, payload) {
  //    state.userobj = payload;
  //   },
  //   logout(state, payload) {
  //     state.userobj = '';
  //   }
  // },
  // actions: {

  // }
})

export default store;