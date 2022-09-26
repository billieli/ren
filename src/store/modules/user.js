import { login } from '@/api/login'
import { getUserInfo, getUserDatailById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: '',
    userinfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userinfo) {
      state.userinfo = userinfo
    },
    DEL_USERINFO(state) {
      state.userinfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      // commit('SET_USERINFO', data)
      const res = await getUserInfo()
      console.log(res)
      const res1 = await getUserDatailById(res.userId)

      commit('SET_USERINFO', { ... res, ...res1 })
      return JSON.parse(JSON.stringify(res))
    }
  }
}
