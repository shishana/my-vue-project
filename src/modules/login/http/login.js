import axios from '@/http/api'
const version = '/api'

export const bcLogin = (params) => {
  return axios({
    url: `${version}/user/login`,
    method: 'post',
    data: params
  })
}

export const getUserInfo = () => {
  return axios({
    url: `${version}/user/user_info`,
    method: 'get'
  })
}

export const checkUserName = (name) => {
  return axios({
    url: `${version}/user/check_name?name=${name}`,
    method: 'get'
  })
}

export const getUserBindCode = (phone, flag) => {
  return axios({
    url: `${version}/user/bind_code?name=${phone}&flag=${flag}`,
    method: 'get'
  })
}

export const userRegister = params => {
  return axios({
    url: `${version}/user/create_user`,
    method: 'post',
    data: params
  })
}

export const resetPwd = params => {
  return axios({
    url: `${version}/user/reset_pwd`,
    method: 'post',
    data: params
  })
}

export const userLogin = params => {
  return axios({
    url: `${version}/user/login`,
    method: 'post',
    data: params
  })
}

// password retrieve
export const pwdRetrieve = params => {
  return axios({
    url: `${version}/user/retrive`,
    method: 'post',
    data: params
  })
}
