// 模拟首页图标数据
/**
 * 首页接口模块
 */

// 统计公司不同流程状态的所有项目的总数量
export const count = {
  url: '/busi/home/count',
  method: 'get',
  data: opt => {
    return {
      data: {
        code: 200,
        msg: 'success',
        data: 17
      }
    }
  }
}

// 统计公司不同流程状态的所有项目的项目收入总金额
export const income = {
  url: '/busi/home/income',
  method: 'get',
  data: opt => {
    return {
      data: {
        code: 200,
        msg: 'success',
        data: 164
      }
    }
  }
}

// 统计公司正在决算、已决算状态的所有项目的净收益
export const netProfit = {
  url: '/busi/home/netProfit',
  method: 'get',
  data: opt => {
    return {
      data: {
        code: 200,
        msg: 'success',
        data: null
      }
    }
  }
}

// 统计公司正在备案、已备案状态的所有项目的预计收入
export const incomeRecord = {
  url: '/busi/home/income/record',
  method: 'get',
  data: opt => {
    return {
      data: {
        code: 200,
        msg: 'success',
        data: 164
      }
    }
  }
}

// 统计正在备案、已备案、正在决算、已决算四种不同流程状态的全公司所有项目的项目数量
export const countStatus = {
  url: '/busi/home/count/status',
  method: 'get',
  data: {
    '正在备案': 17,
    '已备案': 0,
    '正在决算': 0,
    '已决算': 0
  }
}
// 统计正在备案、已备案、正在决算、已决算四种不同流程状态的全公司所有项目的项目金额
export const incomeStatus = {
  url: '/busi/home/income/status',
  method: 'get',
  'data': {
    '正在备案': 164,
    '已备案': 0,
    '正在决算': 0,
    '已决算': 0
  }
}

// 统计项目主办部门（一级部门）的所有项目的项目收入情况
export const incomeSponsor = {
  url: '/busi/home/income/sponsor',
  method: 'get',
  data: {}
}

// 统计项目协同部门（一级部门）的所有项目的项目收入情况
export const incomeCoord = {
  url: '/busi/home/income/coord',
  method: 'get',
  data: {}
}
