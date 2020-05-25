<!-- 通用table组件 author weifei -->
<template>
  <div>
    <!--表格栏-->
    <el-table
      v-loading="loading"
      :data="data"
      :highlight-current-row="highlightCurrentRow"
      element-loading-text="数据加载中..."
      :border="border"
      :stripe="stripe"
      :show-overflow-tooltip="showOverflowTooltip"
      :max-height="maxHeight"
      :height="height"
      :size="size"
      :align="align"
      style="width:98%;"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
    >
      <el-table-column v-if="showSelection" type="selection" width="40" />

      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        header-align="center"
        align="center"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :type="column.type"
        :formatter="column.formatter"
        :sortable="column.sortable==null?false:column.sortable"
      />
      <slot name="columns" />
      <slot name="operate" />
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :current-page="pageRequest.pageNum"
        :page-size="pageRequest.pageSize"
        :total="data.length"
        style="float:right;"
        @current-change="refreshPageRequest"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KtTable',
  props: {
    showSelection: { // 是否显示复选框
      type: Boolean,
      default: false
    },
    columns: Array, // 表格列配置
    data: Array, // 表格分页数据
    size: { // 尺寸样式
      type: String,
      default: 'mini'
    },
    align: { // 文本对齐方式
      type: String,
      default: 'left'
    },
    maxHeight: { // 表格最大高度
      type: Number,
      default: 550
    },
    height: { // 表格最大高度
      type: Number,
      default: 400
    },
    showOperation: { // 是否显示操作组件
      type: Boolean,
      default: true
    },
    border: { // 是否显示边框
      type: Boolean,
      default: false
    },
    stripe: { // 是否显示斑马线
      type: Boolean,
      default: true
    },
    highlightCurrentRow: { // // 是否高亮当前行
      type: Boolean,
      default: true
    },
    showOverflowTooltip: { // 是否单行显示
      type: Boolean,
      default: true
    },
    showBatchDelete: { // 是否显示操作组件
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      // 分页信息
      pageRequest: {
        pageNum: 1,
        pageSize: this.pageSize
      },
      loading: false, // 加载标识
      selections: [] // 列表选中列
    }
  },
  mounted() {
    this.refreshPageRequest(1)
  },
  methods: {
    // 分页查询
    findPage: function() {
      this.loading = true
      const callback = res => {
        this.loading = false
      }
      this.$emit('findPage', { pageRequest: this.pageRequest, callback: callback })
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections
      this.$emit('selectionChange', { selections: selections })
    },
    // 选择切换
    handleCurrentChange: function(val) {
      this.$emit('handleCurrentChange', { val: val })
    },
    // 换页刷新
    refreshPageRequest: function(pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    }
  }
}
</script>

<style scoped>

</style>
