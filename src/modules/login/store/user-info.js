import Vue from 'vue'

export const GET_USER_INFO = 'GET_USER_INFO'
export const SET_USER_INFO = 'SET_USER_INFO'
export const DELETE_USER_INFO = 'DELETE_USER_INFO'

const state = {
  userInfo: {}
}

const getters = {
  userInfo: (state) => {
    return state.userInfo
  }
}

const actions = {
  [GET_USER_INFO]: ({ commit, dispatch }, context) => {
    return new Promise((resolve, reject) => {
      context.$api.getUserInfo().then(res => {
        commit('SET_USER_INFO', res.data)
        resolve(res)
      }).catch(err => {
        context.$msgMnger.httpError(err)
        reject(err)
      })
      // let userInfo = JSON.parse(localStorage.getItem('user-info')) || null
      // if (userInfo) {
      //   commit('SET_USER_INFO', userInfo)
      //   resolve(userInfo)
      // } else {
      //   let err = new Error('获取用户信息失败, 请重新登录!')
      //   context.$msgMnger.httpError(err)
      //   reject(err)
      // }
    })
  },
  [DELETE_USER_INFO]: ({ commit, dispatch }) => {
    commit(DELETE_USER_INFO)
  }
}

const mutations = {
  [SET_USER_INFO]: (state, userInfo) => {
    state.userInfo = {}
    for (let key in userInfo) {
      Vue.set(state.userInfo, key, userInfo[key])
    }
  },
  [DELETE_USER_INFO]: (state) => {
    state.userInfo = {}
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
