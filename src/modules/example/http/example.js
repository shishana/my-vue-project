import axios from '@/http/api'

export const version = '/api'

export const getList = () => {
  return axios({
    url: `${version}/get_list`,
    method: 'get'
  })
}