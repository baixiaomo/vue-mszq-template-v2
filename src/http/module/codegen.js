import axios from '../axios'

export function table(params) {
  return axios({
    url: '/sys/db/tables',
    method: 'get',
    params
  })
}

export function columns(params) {
  return axios({
    url: '/sys/db/columns',
    method: 'get',
    params
  })
}

