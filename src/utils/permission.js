import store from '@/store'
/**
 *  判断用户是否拥有组件的操作权限
 * @param perms 组件操作标识 ，如sys:view:add，{模块}_{页面}_{按钮}
 * @returns {boolean}
 * @author weifei
 */
export const hasPermission = (perms) => {
  // 用户权限集合
  const permissions = store.state.user.permissions
  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i].permission === perms) {
      return true
    }
  }
  return false
}
