import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    status: false,
    token: getToken(),
    avatar: 'https://bcp.mszq.com:8082/bcp/photos/389.jpg',
    introduction: '',
    roles: [],
    permissions: [],
    routes: [],
    userId: '',
    userName: '',
    userCode: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USERINFO: (state, user) => {
      state.userId = user.userId
      state.userName = user.userName
      state.userCode = user.userCode
    }
  },

  actions: {
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
