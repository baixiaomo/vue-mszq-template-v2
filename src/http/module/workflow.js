/**
 * 流程管理接口模块
 */

import axios from '../axios'

// 流程列表
export const list = (params) => {
  return axios({
    method: 'get',
    url: '/wf/model/list',
    params
  })
}

// 流程保存
export const save = data => {
  return axios({
    method: 'post',
    url: '/wf/model/save',
    data
  })
}
// 流程更新
export const update = data => {
  return axios({
    method: 'put',
    url: '/wf/model/update',
    data
  })
}
// 流程删除
export const del = id => {
  return axios({
    method: 'delete',
    url: '/wf/model/' + id
  })
}
// 部署
export const deploy = params => {
  return axios({
    method: 'post',
    url: '/wf/model/deploy/',
    params
  })
}
export const code = params => {
  return axios({
    method: 'get',
    url: '/wf/model/codeRead',
    params
  })
}
export const copy = params => {
  return axios({
    method: 'get',
    url: '/wf/model/copy',
    params
  })
}
