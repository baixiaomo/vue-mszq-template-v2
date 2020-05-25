/**
 * 用户信息接口
 */
import axios from '../axios'

export const getUserTree = (data) => {
  return axios({
    method: 'post',
    url: '/user/userTree',
    params: data
  })
}

// 获取用户列表
export function getUserList(parms) {
  return axios({
    url: '/user/userList',
    method: 'get',
    params: parms
  })
}

// 新增用户
export function addUser(data) {
  return axios({
    url: '/user',
    method: 'post',
    data: data
  })
}

export const list = params => {
  return axios({
    url: '/sys/user/list',
    method: 'get',
    params
  })
}

export const saveUserRole = data => {
  return axios({
    url: '/sys/userRole/user',
    method: 'post',
    data
  })
}

export const userRole = params => {
  return axios({
    url: '/sys/userRole/all',
    method: 'get',
    params
  })
}

export const syncData = () => {
  return axios({
    url: '/sys/user/sync',
    method: 'get'
  })
}

export const modPwd = params => {
  return axios({
    url: '/sys/user/modPwd',
    method: 'get',
    params
  })
}
