/**
 * 首页接口模块
 */
import axios from '../axios'

// 统计公司不同流程状态的所有项目的总数量
export const count = () => {
  return axios({
    url: '/busi/home/count',
    method: 'get'
  })
}

// 统计公司不同流程状态的所有项目的项目收入总金额
export const income = () => {
  return axios({
    url: '/busi/home/income',
    method: 'get'
  })
}

// 统计公司正在决算、已决算状态的所有项目的净收益
export const netProfit = () => {
  return axios({
    url: '/busi/home/netProfit',
    method: 'get'
  })
}

// 统计公司正在备案、已备案状态的所有项目的预计收入
export const incomeRecord = () => {
  return axios({
    url: '/busi/home/income/record',
    method: 'get'
  })
}

// 统计正在备案、已备案、正在决算、已决算四种不同流程状态的全公司所有项目的项目数量
export const countStatus = () => {
  return axios({
    url: '/busi/home/count/status',
    method: 'get'
  })
}
// 统计正在备案、已备案、正在决算、已决算四种不同流程状态的全公司所有项目的项目金额
export const incomeStatus = () => {
  return axios({
    url: '/busi/home/income/status',
    method: 'get'
  })
}

// 统计项目主办部门（一级部门）的所有项目的项目收入情况
export const incomeSponsor = () => {
  return axios({
    url: '/busi/home/income/sponsor',
    method: 'get'
  })
}

// 统计项目协同部门（一级部门）的所有项目的项目收入情况
export const incomeCoord = () => {
  return axios({
    url: '/busi/home/income/coord',
    method: 'get'
  })
}
