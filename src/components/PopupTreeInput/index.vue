<template>
  <div>
    <el-popover ref="popover" :placement="placement" trigger="click" :width="width">
      <el-tree
        ref="popupTree"
        :data="data"
        :props="props"
        node-key="nodeKey"
        :default-expand-all="defaultExpandAll"
        :highlight-current="true"
        :expand-on-click-node="true"
        @current-change="currentChangeHandle"
      />
    </el-popover>
    <el-input v-model="prop" v-popover:popover :readonly="true" :placeholder="placeholder" style="cursor:pointer;" />
  </div>
</template>

<script>
export default {
  name: 'PopupTreeInput',
  props: {
    data: {
      type: Array,
      default: []
    },
    props: {
      type: Object,
      default: () => []
    },
    prop: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '点击选择内容'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    width: {
      type: Number,
      default: 500
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    currentChangeHandle: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
