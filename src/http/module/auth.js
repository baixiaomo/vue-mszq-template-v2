import axios from '../axios'

export const judgeUser = params => {
  return axios({
    url: '/oaIndex',
    method: 'get',
    params
  })
}
