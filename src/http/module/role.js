import axios from '../axios'
/*
 * 角色管理模块
 */

export const list = params => {
  return axios({
    url: '/sys/role/list',
    method: 'get',
    params: params
  })
}

export const save = data => {
  return axios({
    url: '/sys/role/save',
    method: 'post',
    data
  })
}

export const update = data => {
  return axios({
    url: '/sys/role/update',
    method: 'put',
    data
  })
}

export const del = id => {
  return axios({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

export const getRoleMenu = params => {
  return axios({
    url: '/sys/roleMenu/all',
    method: 'get',
    params
  })
}

export const saveRoleMenu = data => {
  return axios({
    url: '/sys/roleMenu/role',
    method: 'post',
    data
  })
}
export const all = params => {
  return axios({
    url: '/sys/role/all',
    method: 'get',
    params
  })
}

export const saveUserRole = data => {
  return axios({
    url: '/sys/userRole/role',
    method: 'post',
    data
  })
}
