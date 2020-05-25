import axios from '../axios'
/*
 * 菜单管理模块
 */

/**
 * 分页数据
 * @param params
 * @returns {*}
 */
export function list(params) {
  return axios({
    url: '/sys/menu/list',
    method: 'get',
    params
  })
}
/**
 * 全部数据
 * @param params
 * @returns {*}
 */
export function all(params) {
  return axios({
    url: '/sys/menu/all',
    method: 'get',
    params
  })
}

export function tree() {
  return axios({
    url: '/sys/menu/tree',
    method: 'get'
  })
}
/**
 * 保存
 * @param params
 * @returns {*}
 */
export function save(data) {
  return axios({
    url: '/sys/menu/save',
    method: 'post',
    data
  })
}

/**
 * 修改
 * @param params
 * @returns {*}
 */
export function update(data) {
  return axios({
    url: '/sys/menu/update',
    method: 'put',
    data
  })
}

/**
 * 删除
 * @param id
 * @returns {*}
 */
export function del(id) {
  return axios({
    url: '/sys/menu/' + id,
    method: 'delete'
  })
}

/**
 * 查询
 * @param id
 * @returns {*}
 */
export function get(id) {
  return axios({
    url: '/sys/menu/' + id,
    method: 'get'
  })
}

export function menus() {
  return axios({
    url: '/sys/menu/menus',
    method: 'get'
  })
}

export function saveMenuRole(data) {
  return axios({
    url: '/sys/roleMenu/menu',
    method: 'post',
    data
  })
}
