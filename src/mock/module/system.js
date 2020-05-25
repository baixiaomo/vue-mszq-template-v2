/**
 *  系统接口模块
 **/

/**
 *登陆接口mock模块
 * @author weifei
 */
// 登陆接口
export const login = {
  type: 'post',
  url: '/login',
  data: opt => {
    return {
      data: {
        code: 200,
        msg: 'success'
      }
    }
  }
}
// 登陆后获取用户信息
export const getUserInfo = {
  type: 'get',
  url: '/info',
  data: {
    'code': 200,
    'data': {
      'roles': [
        'admin'
      ],
      'userName': 'Mocker',
      'userId': 111222,
      'userCode': '110110',
      'avatar': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3657970788,4073077696&fm=11&gp=0.jpg'
    },
    'msg': 'success'
  }
}

const routes = [
  {
    'id': 2,
    'name': '系统管理',
    'type': 1,
    'parentId': 0,
    'path': '/sys',
    'component': '/sys/index',
    'redirect': '/sys/dept',
    'hidden': false,
    'sort': 90,
    'enabled': true,
    'meta': {
      'title': '系统管理',
      'icon': 'fa fa-cog'
    },
    children: [
      {
        'id': 74,
        'name': '部门管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/dept',
        'component': '/sys/dept',
        'hidden': false,
        'sort': 0,
        'enabled': true,
        'meta': {
          'title': '部门管理',
          'icon': 'fa fa-building'
        },
        'children': []
      },
      { 'id': 72,
        'name': '人员管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/user',
        'component': '/sys/user',
        'hidden': false,
        'sort': 1,
        'enabled': true,
        'meta': {
          'title': '人员管理',
          'icon': 'fa fa-user'
        },
        'children': []
      },
      {
        'id': 71,
        'name': '角色管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/role',
        'component': '/sys/role',
        'hidden': false,
        'sort': 2,
        'enabled': true,
        'meta': {
          'title': '角色管理',
          'icon': 'fa fa-users'
        },
        'children': []
      },
      {
        'id': 16,
        'name': '菜单管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/menu',
        'component': '/sys/menu',
        'hidden': false,
        'sort': 3,
        'enabled': true,
        'meta': {
          'title': '菜单管理',
          'icon': 'fa fa-bars'
        },
        'children': []
      },
      {
        'id': 76,
        'name': '字典管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/dict',
        'icon': 'fa fa-file-text',
        'component': '/sys/dict',
        'hidden': false,
        'sort': 7,
        'enabled': true,
        'meta': { 'title': '字典管理', 'icon': 'fa fa-file-text' },
        'children': []
      },
      {
        'id': 75,
        'name': '参数管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/config',
        'component': '/sys/config',
        'hidden': false,
        'sort': 8,
        'enabled': true,
        'meta': { 'title': '参数管理', 'icon': 'fa fa-database' },
        'children': []
      },
      {
        'id': 98,
        'name': '代码管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/codegen',
        'component': '/sys/codegen',
        'hidden': false,
        'sort': 9,
        'enabled': true,
        'meta':
          {
            'title': '代码管理',
            'icon': 'fa fa-codiepie'
          },
        'children': []
      },
      {
        'id': 101,
        'name': '流程管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/workflow',
        'component': '/sys/workflow',
        'hidden': false,
        'sort': 10,
        'enabled': true,
        'meta': { 'title': '流程管理', 'icon': 'fa fa-sitemap' },
        'children': []
      },
      {
        'id': 103,
        'name': '流程管理设计',
        'type': 1,
        'parentId': 2,
        'path': '/sys/workflow/workflowdesign',
        'component': '/sys/workflow/workflowdesign',
        'hidden': true,
        'sort': 12,
        'enabled': true,
        'meta': { 'title': '流程管理设计', 'icon': '' },
        'children': []
      },
      {
        'id': 104,
        'name': '流程管理代码',
        'type': 1,
        'parentId': 2,
        'path': '/sys/workflow/workflowcode',
        'component': '/sys/workflow/workflowcode',
        'hidden': true,
        'sort': 13,
        'enabled': true,
        'meta': { 'title': '流程管理代码', 'icon': '' },
        'children': []
      },
      {
        'id': 121,
        'name': '数据管理',
        'type': 1,
        'parentId': 2,
        'path': '/sys/data',
        'component': '/sys/data',
        'hidden': false,
        'sort': 4,
        'enabled': true,
        'meta': { 'title': '数据管理', 'icon': 'fa fa-calculator' },
        'children': []
      },
    ]
  }
]

/**
 * 获取路由接口，可根据该接口的返回体，构建系统路由，并构建导航栏
 * @type {{type: string, url: string, data: {code: number, data: *[], msg: string}}}
 */
export const getRoute = {
  type: 'get',
  url: '/sys/menu/build',
  data: {
    'code': 200,
    'data': routes,
    'msg': 'success'
  }
}

/**
 * 获取按钮权限接口，根据该接口显示按钮
 * @type {{url: string, type: string, data: {code: number, msg: string, data: Array}}}
 */
export const buttons = {
  url: '/sys/menu/button',
  type: 'get',
  data: {
    'code': 200,
    'msg': 'success',
    data: []
  }
}
