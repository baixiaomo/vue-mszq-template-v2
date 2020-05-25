
const app = {
  state: {
    sidebar: {
      opened: window.sessionStorage.getItem('sidebarStatus') ? !!+window.sessionStorage.getItem('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: window.sessionStorage.getItem('language') || 'zh',
    size: window.sessionStorage.getItem('size') || 'medium',
    theme: '#409EFF',
    taskSize: '',
    menus: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        window.sessionStorage.setItem('sidebarStatus', 1)
      } else {
        window.sessionStorage.setItem('sidebarStatus', 0)
      }
    },
    TASK_SIZE: (state, size) => {
      state.taskSize = size
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      window.sessionStorage.setItem('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      window.sessionStorage.setItem('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      window.sessionStorage.setItem('size', size)
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
