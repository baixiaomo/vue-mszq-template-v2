import axios from '../axios'

/*
 * 机构管理模块
 */
// 查询机构树
export const findDeptTree = (data) => {
  return axios({
    url: '/dept/findTree',
    method: 'get',
    params: data
  })
}
export const all = params => {
  return axios({
    url: '/dept/all',
    method: 'get',
    params
  })
}
export const save = params => {
  return axios({
    url: '/dept/save',
    method: 'post',
    params
  })
}
// 删除
export const del = (params) => {
  return axios({
    url: '/dept/delete',
    method: 'delete',
    params
  })
}
export const update = data => {
  return axios({
    url: '/sys/dept/update',
    method: 'put',
    data
  })
}

// 获取子部门
export const children = (params) => {
  return axios({
    url: '/sys/dept/children',
    method: 'get',
    params
  })
}

export const etree = params => {
  return axios({
    url: '/sys/dept/eTree',
    method: 'get',
    params
  })
}
export const eAll = params => {
  return axios({
    url: '/sys/dept/eAll',
    method: 'get',
    params
  })
}
export const syncData = () => {
  return axios({
    url: '/sys/dept/sync',
    method: 'get'
  })
}
