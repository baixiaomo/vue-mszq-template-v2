/**
 * 登陆模块接口
 */
import axios from '../axios'

// 登陆接口
export const login = data => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 拉取登陆用户的信息
export function getUserInfo() {
  return axios({
    url: '/info',
    method: 'get'
  })
}

// 登出
export const logout = () => {
  return axios({
    url: '/logout',
    method: 'get'
  })
}

/**
 * 获取路由
 * @returns {*}
 */
export const getRouters = () => {
  return axios({
    url: '/sys/menu/build',
    method: 'get'
  })
}

/**
 * 获取菜单
 * @returns {*}
 */
export function buttons() {
  return axios({
    url: '/sys/menu/button',
    method: 'get'
  })
}
