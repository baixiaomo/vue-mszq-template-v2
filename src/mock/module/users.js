import { random, template } from '../mock'
// 模拟部门人员树数据
const userTree = [
  {
    'id': 9,
    'name': '财务管理中心',
    'parentId': 0,
    'parentName': null,
    'flag': 0,
    children: [
      {
        'id': 24,
        'name': '核算管理部',
        'parentId': 9,
        'parentName': '财务管理中心',
        'flag': 0,
        children: [
          {
            'id': 1,
            'name': '李抒',
            'sort': 1,
            'deptName': '财务管理中心-核算管理部',
            'flag': 1
          },
          {
            'id': 2,
            'name': '韩科军',
            'deptName': '财务管理中心-核算管理部',
            'level': 2,
            'flag': 1
          }
        ]
      },
      {
        'id': 25,
        'name': '资金管理部',
        'parentId': 9,
        'parentName': '财务管理中心',
        'flag': 0,
        children: [
          {
            'id': 11,
            'name': '何为',
            'deptName': '财务管理中心-资金管理部',
            'flag': 1
          },
          {
            'id': 22,
            'name': '石辉博',
            'deptName': '财务管理中心-资金管理部',
            'flag': 1
          }
        ]
      },
      {
        'id': 26,
        'name': '财务规划部',
        'parentId': 9,
        'sort': 1,
        'createTime': '2019-04-21T22:53:33',
        'updateTime': null,
        'delFlag': null,
        'parentName': '财务管理中心',
        'level': 2,
        'flag': 0,
        children: []
      }
    ]
  },
  {
    'id': 17,
    'name': '投资银行事业部',
    'parentId': 0,
    'parentName': null,
    'flag': 0,
    children: [
      {
        'id': 61,
        'name': '投资银行一部',
        'level': 2,
        'flag': 0,
        children: [
          {
            'id': 171,
            'name': '于春宇',
            'deptName': '投资银行事业部-投资银行一部',
            'flag': 1
          },
          {
            'id': 172,
            'name': '丁力',
            'parentName': '投资银行事业部-投资银行一部',
            'flag': 1
          }
        ]
      },
      {
        'id': 62,
        'name': '投资银行二部',
        'flag': 0,
        children: [
          {
            'id': 1711,
            'name': '朱炳辉',
            'deptName': '投资银行事业部-投资银行二部',
            'flag': 1
          },
          {
            'id': 1722,
            'name': '白英才',
            'parentName': '投资银行事业部-投资银行二部',
            'flag': 1
          }
        ]
      }
    ]
  },
  {
    'id': 18,
    'name': '固定收益事业部',
    'flag': 0,
    children: [
      {
        'id': 37,
        'name': '债券销售交易部',
        'flag': 0,
        children: [
          {
            'id': 371,
            'name': '陆俊妤',
            'deptName': '固定收益事业部-债券销售交易部',
            'flag': 1
          }
        ]
      },
      {
        'id': 38,
        'name': '债券做市交易部',
        'flag': 0,
        children: [
          {
            'id': 3712,
            'name': '江明昊',
            'deptName': '固定收益事业部-债券做市交易部',
            'flag': 1
          }
        ]
      }
    ]
  },
  {
    'id': 22,
    'name': '经纪业务事业部',
    'flag': 0,
    children: [
      {
        'id': 219,
        'name': '运营服务部',
        'flag': 0,
        children: [
          {
            'id': 2191,
            'name': '陈昕',
            'deptName': '经纪业务事业部-运营服务部',
            'flag': 1
          }
        ]
      },
      {
        'id': 220,
        'name': '机构客户部',
        'flag': 0,
        children: [
          {
            'id': 21291,
            'name': '石泉',
            'deptName': '经纪业务事业部-机构客户部',
            'flag': 1
          }
        ]
      }
    ]
  }
]
// 人员列表数据
const userList = []
for (let i = 0; i < random.natural(5, 10); i++) {
  const row = {
    'userId': i,
    'username': random.cname(),
    'password': null,
    'id': null,
    'jobId': 4,
    'email': random.email(),
    'phone': template({ 'phone|1': /^1[0-9]{10}$/ }).phone,
    'avatar': null,
    'createTime': random.datetime(),
    'updateTime': '2019-06-18T18:11:43',
    'lockFlag': '0',
    'delFlag': '0',
    'roleList': [
      {
        'roleId': 7,
        'roleName': '开发人员',
        'roleCode': 'DEV_ROLE',
        'roleDesc': '开发人员',
        'dsType': 1,
        'dsScope': '2',
        'createTime': '2019-04-24T21:11:28',
        'updateTime': '2019-06-15T23:40:30',
        'delFlag': '0',
        'roleDepts': null
      }
    ],
    'deptName': '研发部',
    'jobName': '软件测试',
    'key': null
  }
  userList.push(row)
}

export const getUserTree = {
  type: 'post',
  url: '/user/userTree',
  data: {
    'code': 200,
    'data': userTree,
    'msg': 'success'
  }
}
export const getUserList = {
  type: 'get',
  url: '/user/userList',
  data: {
    'code': 200,
    'data': {
      records: userList,
      'total': 2,
      'size': 10,
      'current': 1,
      'orders': [],
      'searchCount': true,
      'pages': 1
    },
    'msg': 'success'
  }
}
export const userAdd = {
  type: 'post',
  url: '/user',
  data: {
    'code': 200,
    'data': '',
    'msg': 'success'
  }
}
