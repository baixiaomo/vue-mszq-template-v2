<!--部门通用组件 author weifei-->
<template>
  <div style="display: inline-block">
    <el-popover ref="popover" :disabled="readonly" :placement="placement" trigger="click" :width="width">
      <el-tree
        ref="popupTree"
        :data="data"
        :props="props"
        :lazy="lazy"
        :node-key="nodeKey"
        :default-expand-all="defaultExpandAll"
        :highlight-current="true"
        :expand-on-click-node="true"
        @current-change="currentChangeHandle"
      />
    </el-popover>
    <span />
    <el-input
      :value="myValue"
      :style="{width:width+'px'}"
      :placeholder="placeholder"
      :size="size"
      :readonly="readonly"
      style="cursor:pointer;display: none"
    />
    <el-input
      v-popover:popover
      :value="myLable"
      :style="{width:width+'px'}"
      :placeholder="placeholder"
      :size="size"
      :readonly="readonly"
      style="cursor:pointer;"
    />
  </div>
</template>

<script>
export default {
  name: 'WfInputTree',
  props: {
    display: {
      type: String,
      default: 'inline'
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    size: {
      type: String,
      default: 'small'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: String | Number,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    width: {
      type: Number,
      default: 200
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myValue: this.value,
      myLable: '',
      disabled: !this.readonly,
      props: {
        label: 'name',
        children: 'children'
      }
    }
  },
  watch: {
    myValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    // 加载部门数据
    this.findDept(this.data)
  },
  mounted() {
    if (this.myValue) {
      this.$refs.popupTree.setCurrentKey(this.myValue)
    }
  },
  methods: {
    currentChangeHandle(data, node) {
      this.myValue = data.id
      this.myLable = data.name
      this.$emit('change', data)
    },
    findDept(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['id'] === this.value) {
          this.myLable = data[i]['name']
          console.log('this label', this.myLable)
          return
        } else if (data[i]['children']) {
          this.findDept(data[i]['children'])
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
