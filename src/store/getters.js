const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  taskSize: state => state.app.taskSize,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  excludeViews: state => state.tagsView.excludeViews.join(','),
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userName: state => state.user.userName,
  userCode: state => state.user.userCode,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  menus: state => state.app.menus,
  permission: state => state.user.permissions,
  userinfo: state => {
    return {
      userId: state.user.userId,
      userName: state.user.userName,
      userCode: state.user.userCode
    }
  }
}
export default getters
