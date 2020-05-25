import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from './constantRoutes'
import beforeRouter from './beforeRouter'

Vue.use(Router)

const router = new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }), // 控制滚动条回到顶部
  routes: constantRoutes
})

beforeRouter(router)

export default router
