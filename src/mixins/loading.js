/**
 * 全屏Loading
 */
export default {
  data() {
    return {
      $_wfLoadingInstance: ''
    }
  },
  methods: {
    startLoading(text, spinner, rgba) {
      text = !text ? 'Loading' : text
      spinner = !spinner ? 'el-icon-loading' : spinner
      rgba = !rgba ? 'rgba(0, 0, 0, 0.7)' : rgba
      this.$_wfLoadingInstance = this.$loading({
        lock: true,
        text: text,
        spinner: spinner,
        background: rgba
      })
    },
    endLoading() {
      this.$_wfLoadingInstance.close()
    }
  }
}
