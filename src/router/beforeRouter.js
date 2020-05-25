import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, removeToken } from '../utils/auth'
import { getUserInfo, getRouters, buttons } from '../http/module/system'
import { tree } from '../http/module/menu'
import Layout from '@/views/layout/Layout'

export default router => {
  NProgress.configure({ showSpinner: false })
  // 地址白名单
  const whiteList = ['/login', '/sys/menu', '/404']

  router.beforeEach((to, from, next) => {
    // 进度条组件，NProgress是页面跳转是出现在浏览器顶部的进度条 added by weifei
    NProgress.start()
    if (getToken()) {
      /* has token,you have already logged*/
      /* 登陆页面直接跳转到首页*/
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        judgeInfo(router, next, to)
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
function judgeInfo(router, next, to) {
  if (!store.getters.userinfo.userId) {
    // 判断当前用户是否已拉取完user_info信息
    getUserInfo().then(response => {
      const data = response.data
      store.commit('SET_USERINFO', data)
      getRouters().then(res => {
        // 根据roles权限生成可访问的路由表
        const accessedRoutes = addDashboardRoute(filterAsyncRouter(res.data))
        store.commit('SET_ROUTES', accessedRoutes)
        router.addRoutes(accessedRoutes) // 动态添加可访问路由表
        console.log('router', accessedRoutes)
        next({ path: '/' }) // hack方法 确保addRoutes已完成
        tree().then(res => {
          console.log('menus', res)
          // 根据静态路由拼接菜单
          store.commit('SET_MENUS', accessedRoutes[0].children)
          buttons().then(res => {
            console.log('buttons', res)
            store.commit('SET_PERMISSIONS', res.data)
          })
        })
      })
    }).catch(res => {
      store.commit('SET_TOKEN', '')
      removeToken()
      Message.error(res)
      next({ path: '/' })
    })
  } else {
    next()
  }
}
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
        route.component = loadView(route.component)
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views${view}`)
}

const addDashboardRoute = (route) => {
  const asyncRoute = [{
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'fa fa-tachometer' }
      }
    ]
  }]
  asyncRoute[0].children.push(...route)
  return asyncRoute
}
