import axios from '@/http/api'
const version = '/api'

// oauth path
export const oauthPath = () => {
  return '/login'
  // return '/api/oauth2/login' // 微博登录
}

export const websocketURL = () => {
  // process.env.NODE_ENV === 'production' ?
  return 'ws://47.93.35.179:8099/websocket/'
}

// 省份边界
// 参数province_code 省份编码，默认 610000
export const provinceBoundary = () => {
  return axios({
    url: `${version}/gis/province_boundary`,
    method: 'get'
  })
}

// 城市边界
// 参数province_code 省份编码，默认 610000
export const cityBoundary = () => {
  return axios({
    url: `${version}/gis/city_boundary`,
    method: 'get'
  })
}

// 区县边界
// 参数province_code 省份编码，默认 610000
export const countyBoundary = () => {
  return axios({
    url: `${version}/gis/district_boundary`,
    method: 'get'
  })
}

export default {
  oauthPath,
  websocketURL,
  provinceBoundary,
  cityBoundary,
  countyBoundary
}
