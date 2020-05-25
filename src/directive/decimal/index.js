import Vue from 'vue'

/**
 * 数字格式化指令
 * @author weifei
 */
Vue.directive('decimal', {
  bind: (el, binding, vnode) => {
    console.log('自定义指令decimal：', el, binding, vnode)
    const element = el.getElementsByTagName('input')[0]
    let len = binding.value // 初始化设置
    if (!len) {
      len = 0
    }
    element.value = Number(element.value).toFixed(len)
    element.addEventListener('blur', function() {
      if (isNaN(element.value)) {
        vnode.data.model.callback(0)
      } else {
        vnode.data.model.callback(Number(element.value).toFixed(len))
      }
    })
  }
})

Vue.directive('percent',
  (el, binding, vnode) => {
    console.log('自定义指令percent：', el, binding, vnode)
    const element = el.getElementsByTagName('input')[0]
    let len = binding.value // 初始化设置
    if (!len) {
      len = 0
    }
    if (isNaN(element.value)) {
      vnode.data.model.callback('0')
    } else {
      vnode.data.model.callback(Number(element.value) * 100 + '%')
    }
    /* element.addEventListener('blur', function() {
      if (isNaN(element.value)) {
        vnode.data.model.callback(0)
      } else {
        vnode.data.model.callback(element.value + '%')
      }
    })*/
  })

