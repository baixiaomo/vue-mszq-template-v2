import axios from '../axios'

export function list(params) {
  return axios({
    url: '/sys/param/list',
    method: 'get',
    params
  })
}

export function save(data) {
  return axios({
    url: '/sys/param/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return axios({
    url: '/sys/param/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return axios({
    url: '/sys/param/' + id,
    method: 'delete'
  })
}

export function getParams(code) {
  return axios({
    url: '/sys/param/' + code,
    method: 'get'
  })
}
