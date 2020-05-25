<!--部门通用组件 author weifei-->
<template>
  <div style="display: inline-block">
    <el-popover ref="popover" :disabled="readonly" :placement="placement" trigger="click" style="width: 180px">
      <div style="height: 250px;width:180px;overflow-y: auto;resize: both">
        <el-tree
          ref="popupTree"
          :data="data"
          :props="props"
          :lazy="lazy"
          :load="loadNode"
          node-key="deptId"
          :default-expand-all="defaultExpandAll"
          :highlight-current="true"
          :expand-on-click-node="true"
          @current-change="currentChangeHandle"
        />
      </div>
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
      clearable
      style="cursor:pointer;"
      @clear="clear"
    />
  </div>
</template>

<script>
export default {
  name: 'WfDeptSelect',
  props: {
    display: {
      type: String,
      default: 'inline'
    },
    size: {
      type: String,
      default: 'small'
    },
    lazy: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String | Number,
      default: ''
    },
    nodeKey: {
      type: String,
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
      data: [],
      myValue: this.value,
      myLable: '',
      disabled: !this.readonly,
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    myValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    const params = new URLSearchParams()
    params.append('deptId', '')
    this.$api.dept.children(params).then(res => {
      this.data = res.data
    })
  },
  mounted() {
    if (this.myValue) {
      this.$refs.popupTree.setCurrentKey(this.myValue)
    }
  },
  methods: {
    clear() {
      this.myLable = ''
      this.myValue = ''
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.dept.children({ deptId: '' }).then(res => {
          resolve(res.data)
        })
      } else if (!node.data.leaf) {
        this.$api.dept.children({ deptId: node.data.id }).then(res => {
          resolve(res.data)
        })
      } else {
        resolve([])
      }
    },
    currentChangeHandle(data, node) {
      this.myValue = data.id
      this.myLable = data.name
      this.$emit('input', data.id)
      this.$emit('change', data)
    },
    findDept(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['deptId'] === this.value) {
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
