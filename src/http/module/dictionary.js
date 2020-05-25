import axios from '../axios'

// 根据CODE获取字典
export const getDictByCode = (data) => {
  return axios({
    url: '/dict/getDictByCode',
    method: 'get',
    data
  })
}

// 新增字典
export function save(data) {
  return axios({
    url: '/sys/dict/save',
    method: 'post',
    data
  })
}
// 修改
export function update(data) {
  return axios({
    url: '/sys/dict/update',
    method: 'put',
    data
  })
}

// 删除
export function del(id) {
  return axios({
    url: '/sys/dict/' + id,
    method: 'delete'
  })
}

// 树
export function tree(id) {
  return axios({
    url: '/sys/dict/tree/' + id,
    method: 'get'
  })
}

export function get(id) {
  return axios({
    url: '/sys/dict/' + id,
    method: 'get'
  })
}

export function list(params) {
  return axios({
    url: '/sys/dict/list',
    method: 'get',
    params
  })
}

export function items(code) {
  return axios({
    url: '/sys/dict/items/' + code,
    method: 'get'
  })
}

export function busiType(busiLine) {
  return axios({
    url: '/sys/dict/busiType/' + busiLine,
    method: 'get'
  })
}
