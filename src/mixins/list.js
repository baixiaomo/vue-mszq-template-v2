/**
 * 列表通用属性
 */
export default {
  data() {
    return {
      searchCondition: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      loading: false
    }
  },
  methods: {
    handleCurrentChange: function(val) {
      this.searchCondition.pageNum = val
      this.findData()
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.findData()
    },
    clear() {
      for (const key in this.searchCondition) {
        this.searchCondition[key] = ''
      }
      this.searchCondition.pageSize = 10
      this.searchCondition.pageNum = 1
    },
    refresh() {
      this.searchCondition.pageNum = 0
      this.searchCondition.pageSize = 10
      this.findData()
    }
  }
}
