/**
 *  @description: 字典接口mock
 **/

const dictionary = [
  {
    'id': 1,
    'value': 0,
    'label': '停用',
    'name': 'USER_STATUS',
    'description': '用户状态',
    'sort': null,
    'createTime': '2019-05-26T15:13:55',
    'updateTime': null,
    'remark': '用户状态',
    'delFlag': null
  },
  {
    'id': 2,
    'value': 1,
    'label': '启用',
    'name': 'user_status',
    'description': '用户状态',
    'sort': null,
    'createTime': '2019-05-26T15:13:55',
    'updateTime': null,
    'remark': '用户状态',
    'delFlag': null
  }
]
// 字典列表
export const dictList = {
  type: 'get',
  url: '/dict/List',
  data: {
    'code': 200,
    'data': {
      'records': dictionary,
      'total': 3,
      'size': 10,
      'current': 1,
      'orders': [],
      'searchCount': true,
      'pages': 1
    },
    'msg': 'success'
  }
}
// 根据CODE查询字典
export const getDictByCode = {
  type: 'get',
  url: '/dict/getDictDetailList',
  data: {
    'code': 200,
    'data': dictionary,
    'msg': 'success'
  }
}
