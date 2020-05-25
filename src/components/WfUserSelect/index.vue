<!--部门用户通用组件 author weifei-->
<template>
  <div style="display: inline-block">
    <el-popover ref="popover" :disabled="readonly" :placement="placement" trigger="click" style="width: 180px">
      <div style="height: 250px;width:180px;overflow-y: auto;resize: both">
        <el-tree
          ref="popupTree"
          :data="data"
          :props="props"
          lazy
          :load="loadNode"
          node-key="id"
          :default-expand-all="false"
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
    <!--<el-select :value="myValue"
    :placeholder="placeholder"
    :style="{width:width+'px'}">
      <option></option>
    </el-select>-->
  </div>
</template>

<script>

export default {
  name: 'WfUserSelect',
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
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
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
      default: 250
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: [],
      myValue: this.value,
      myLable: this.label,
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
    },
    label(val) {
      this.myLable = this.label
    }
  },
  created() {
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
        this.$api.dept.etree({ deptId: '' }).then(res => {
          resolve(res.data)
        })
      } else if (node.data.hasChildren) {
        this.$api.dept.etree({ deptId: node.data.id }).then(res => {
          resolve(res.data)
        })
      } else {
        resolve([])
      }
    },
    currentChangeHandle(data, node) {
      if (data && data.leaf) {
        this.$emit('input', data.id)
        debugger
        this.myValue = data.id
        this.myLable = data.name
        let firstDeptId = data.parentId
        let firstDeptName = data.parentName
        let secondDeptId = ''
        let secondDeptName = ''
        let pnode = this.$refs.popupTree.getNode(data.parentId)
        while (pnode.data.parentId && pnode.data.parentId !== 1) {
          secondDeptId = firstDeptId
          secondDeptName = firstDeptName
          firstDeptId = pnode.data.parentId
          firstDeptName = pnode.data.parentName
          pnode = this.$refs.popupTree.getNode(pnode.data.parentId)
        }
        if (secondDeptId === '') {
          secondDeptId = firstDeptId
          secondDeptName = firstDeptName
          firstDeptId = ''
          firstDeptName = ''
        }
        /* let pparentId = ''
        let pparentName = ''
        if (pnode) {
          pparentId = pnode.data.parentId
          pparentName = pnode.data.parentName
        }
        data['pparentId'] = pparentId
        data['pparentName'] = pparentName*/
        data['pparentId'] = firstDeptId
        data['pparentName'] = firstDeptName
        data['parentId'] = secondDeptId
        data['parentName'] = secondDeptName
        this.$emit('change', data, this.index)
      }
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
