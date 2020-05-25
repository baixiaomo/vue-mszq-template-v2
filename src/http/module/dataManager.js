import axios from '../axios'

export const submit = data => {
  return axios({
    url: '/sys/permission/save',
    method: 'post',
    data
  })
}

export const list = params => {
  return axios({
    url: '/sys/permission/list',
    method: 'get',
    params
  })
}

export const del = id => {
  return axios({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}
