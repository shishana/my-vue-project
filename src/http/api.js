import axios from 'axios'
import config from './config.js'
import qs from 'qs'
import $store from '../store'
import $api from './interface.js'

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {
        console.log(data)
      }]
    })

    instance.interceptors.request.use(
      config => {
        if (config.headers === undefined || config.headers === null) {
          config.headers = {}
        }
        let _token = $store.getters.token
        if (_token !== '') {
          config.headers['Authorization'] = 'Bearer ' + _token
        }

        if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
          config.data = qs.stringify(config.data)
        }
        return config
      },

      error => {
        const errorInfo = error.response
        if (errorInfo) {
          const errorStatus = errorInfo.status
          this.router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      response => {
        let data = null
        let rToken = response.headers['refresh-token']
        if (rToken) {
          $store.dispatch('AUTH_TOKEN', rToken)
        }
        try {
          data = JSON.parse(response.data === undefined ? response.request.responseText : response.data)
        } catch (error) {
          return response.request.responseText
        }
        if (data.code === 0) {
          return data
        } else {
          const err = Error(data.description)
          err.data = data
          err.response = response
          throw data
        }
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              $store.dispatch('AUTH_LOGOUT')
              window.location.href = $api.oauthPath()
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        return Promise.reject(err)
      }
    )

    instance(options).then((res) => {
      resolve(res)
      return false
    }).catch((error) => {
      reject(error)
    })
  })
}
