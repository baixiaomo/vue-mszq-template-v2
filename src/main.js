import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import md5 from 'js-md5' // MD5
import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './log/errorLog' // error log
import 'babel-polyfill'
import 'url-search-params-polyfill'
import * as filters from './filters' // global filters

import 'font-awesome/css/font-awesome.min.css' // import font-awesome
import '@/assets/iconfont/iconfont.css'

import loading from './mixins/loading'

import api from './http'

import './styles/global.scss'

Vue.use(api)

Vue.mixin(loading)

// 自定义指令
require('./directive/decimal')

Vue.use(Element, {
  size: window.sessionStorage.getItem('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.$md5 = md5

// 开发环境是否启用mock
const openMock = true
if (openMock && process.env.ENV_CONFIG === 'dev') {
  console.log('开启mock')
  require('./mock')
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
