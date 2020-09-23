import { postLogin, getAdLogin, getLogout } from '@/api/user'

const user = {
  state: {
    token: localStorage.getItem('token') || '',
    nickname: localStorage.getItem('name') || ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, nickname) => {
      state.nickname = nickname
    }
  },

  actions: {
    // 普通登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        postLogin(userInfo).then(response => {
          const data = response.data
          if (response.code === 200) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.user.username)
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', data.user.username)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // Ad域登录
    LoginAd ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getAdLogin({
          params: userInfo
        }).then(response => {
          const data = response.data
          if (response.code === 200) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.user.username)
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', data.user.username)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出登陆
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        getLogout().then((res) => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          localStorage.setItem('token', '')
          localStorage.setItem('name', '')
          resolve(res)
        })
      })
    }

  }
}

export default user
