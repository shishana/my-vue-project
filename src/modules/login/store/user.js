import axios from 'axios'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_TOKEN = 'AUTH_TOKEN'

export const AUTH_REGISTER = 'AUTH_REGISTER'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

const state = {
  user_token: localStorage.getItem('user-token') || '',
  isAdmin: localStorage.getItem('user-admin') === 'true' || false,
  status: '',
  profile: {}
}

const getters = {
  isAuthenticated: (state) => {
    // console.log(state)
    return !!state.user_token
  },
  isAdmin: (state) => {
    return state.isAdmin
  },
  authStatus: state => state.status,
  getProfile: state => state.profile,
  token: state => state.user_token
}

const actions = {
  // user register
  [AUTH_REGISTER]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/user', user).then((response) => {
        let data = response.data

        if (data.code === 200) {
          resolve()
        } else {
          reject(new Error(data.msg))
        }
      }).catch((reason) => {
        reject(new Error('和服务器沟通出错了，容我们修复一下！'))
      })
    })
  },
  // save token when updated.
  [AUTH_TOKEN]: ({ commit, dispatch }, token) => {
    localStorage.setItem('user-token', token)
    // add token to header.
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    let isAdmin = localStorage.getItem('user-admin')
    commit(AUTH_SUCCESS, { token, isAdmin })
  },
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios.post('/api/token', user).then((response) => {
        let data = response.data
        if (data.code !== 200) {
          commit(AUTH_ERROR)
          localStorage.removeItem('user-token')
          localStorage.removeItem('user-admin')
          reject(new Error(data.msg))
        } else {
          localStorage.setItem('user-token', data.result)
          localStorage.setItem('user-admin', data.admin)
          // add token to header.
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.result
          commit(AUTH_SUCCESS, { token: data.result, isAdmin: data.admin })
          resolve(response)
        }
      }).catch((reason) => {
        localStorage.removeItem('user-token')
        localStorage.removeItem('user-admin')
        commit(AUTH_ERROR)
        reject(new Error('和服务器沟通出错了，容我们修复一下'))
      })
    })
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-admin')
      // removethe axios default header
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, { token, isAdmin }) => {
    state.status = 'succcess'
    state.user_token = token
    state.isAdmin = isAdmin
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = ''
    state.user_token = ''
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
