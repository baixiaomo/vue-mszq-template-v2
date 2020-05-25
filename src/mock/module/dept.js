// 模拟部门数据
const depts = [
  {
      'deptId': 9,
    'name': '财务管理中心',
    'parentId': 0,
    'sort': 1,
    'createTime': '2019-04-21T22:53:33',
    'updateTime': null,
    'delFlag': null,
    'parentName': null,
    'level': 1,
    children: [
      {
        'deptId': 24,
        'name': '核算管理部',
        'parentId': 9,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '资产管理事业部',
        'level': 2,
        children: []
      },
      {
        'deptId': 25,
        'name': '资金管理部',
        'parentId': 9,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '资产管理事业部',
        'level': 2,
        children: []
      },
      {
        'deptId': 26,
        'name': '财务规划部',
        'parentId': 9,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '资产管理事业部',
        'level': 2,
        children: []
      }
    ]
  },
  {
    'deptId': 17,
    'name': '投资银行事业部',
    'parentId': 0,
    'sort': 1,
    'createTime': '2019-04-21T22:53:33',
    'updateTime': null,
    'delFlag': null,
    'parentName': null,
    'level': 1,
    children: [
      {
        'deptId': 61,
        'name': '投资银行一部',
        'parentId': 17,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '投资银行事业部',
        'level': 2,
        children: []
      },
      {
        'deptId': 62,
        'name': '投资银行二部',
        'parentId': 17,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '投资银行事业部',
        'level': 2,
        children: []
      }
    ]
  },
  {
    'deptId': 18,
    'name': '固定收益事业部',
    'parentId': 0,
    'sort': 1,
    'createTime': '2019-04-21T22:53:33',
    'updateTime': null,
    'delFlag': null,
    'parentName': null,
    'level': 1,
    children: [
      {
        'deptId': 37,
        'name': '债券销售交易部',
        'parentId': 18,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '固定收益事业部',
        'level': 2,
        children: []
      },
      {
        'deptId': 38,
        'name': '债券做市交易部',
        'parentId': 18,
        'sort': 2,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '固定收益事业部',
        'level': 2,
        children: []
      }
    ]
  },
  {
    'deptId': 22,
    'name': '经纪业务事业部',
    'parentId': 0,
    'sort': 0,
    'createTime': '2019-04-21T22:53:33',
    'updateTime': null,
    'delFlag': null,
    'parentName': null,
    'level': 1,
    children: [
      {
        'deptId': 219,
        'name': '运营服务部',
        'parentId': 0,
        'sort': 0,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': null,
        'level': 1,
        children: []
      },
      {
        'deptId': 220,
        'name': '机构客户部',
        'parentId': 22,
        'sort': 0,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '经纪业务事业部',
        'level': 2,
        children: []
      }
    ]
  }
]

export const findTree = {
  type: 'get',
  url: '/dept/findTree',
  data: {
    'code': 200,
    'data': depts,
    'msg': 'success'
  }
}

export const all = {
  type: 'get',
  url: '/dept/all',
  data: {
    'code': 200,
    'msg': 'success',
    'data': {
      'total': 3,
      'size': 10,
      'current': 1,
      'orders': [],
      'searchCount': true,
      'pages': 1,
      'records': depts
    }
  }
}

export const save = {
  type: 'post',
  url: '/dept/save',
  data: {
    code: 200,
    msg: 'success'
  }
}
export const del = {
  type: 'delete',
  url: '/dept/delete',
  data: {
    code: 200,
    msg: 'success'
  }
}
export const update = {
  type: 'put',
  url: '/dept/update',
  data: {
    code: 200,
    msg: 'success'
  }
}
