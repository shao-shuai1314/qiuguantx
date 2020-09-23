import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  //getters可以认为是store的计算属性
  getters: {
    userInfo_ss(state) {
      return state.userInfo
    }
  },
  mutations: {
    getUserInfo(state, list) {
      // state.userInfo.push(list)
      Vue.set(state, "userInfo", list)
    }
  },
  actions: {
    async agetUserInfo(context) {
      const {
        data: res
      } = await axios.get(`/user/userinfo/`);
      context.commit('getUserInfo', res.data)
    }
  },
  modules: {}
})
export default store