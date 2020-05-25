import Mock from 'mockjs'
import * as system from './module/system'
import * as dashboard from './module/dashboard'
import * as dictionary from './module/dictionary'
import * as dept from './module/dept'
import * as user from './module/users'
import * as menu from './module/menu'
import * as role from './module/role'
import * as params from './module/params'
const modules = [dashboard, dictionary, dept, user, menu, role, params, system]

Mock.setup({
  timeout: '100-200' // 设置mock请求的超时时间
})

const baseUrl = process.env.BASE_API

for (const module of modules) {
  for (const key in module) {
    const url = baseUrl + module[key].url
    const type = module[key].type || module[key].method
    Mock.mock(new RegExp(url), type, (opt) => {
      opt['data'] = opt.body ? JSON.parse(opt.body) : null
      console.log('\n')
      console.log('%cmock拦截, 请求: ', 'color:blue', opt)
      const cb = module[key].data
      if (typeof cb === 'function') {
        return cb(opt)
      } else {
        return cb
      }
    })
  }
}
