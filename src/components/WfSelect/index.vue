<!--字典下拉框通用组件 author weifei-->
<template>
  <div style="display: inline-block">
    <span v-if="spanModal && disabled">{{ myText }}</span>
    <el-select
      v-else
      :value="myValue"
      :placeholder="placeholder"
      :style="{width:width+'px'}"
      :multiple="multiple"
      :disabled="disabled"
      :size="size"
      :clearable="clearable"
      @input="change($event)"
      @change="handleChange"
      @visible-change="handleVisibleChange"
      @remove-tag="handleRemoveTag"
    >
      <el-option
        v-for="item in myOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'WfSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String | Number | Boolean,
      default: ''
    },
    width: {
      type: Number,
      default: 200
    },
    size: {
      type: String,
      default: 'small'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dictName: { // 字典CODE
      type: String,
      default: ''
    },
    dataUrl: { // 数据URL
      type: String,
      default: ''
    },
    spanModal: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      myOptions: this.options,
      myValue: this.value,
      myText: ''
    }
  },
  watch: {
    myValue(val) {
      this.initMyText()
    },
    value(val) {
      this.myValue = this.value
    },
    myOptions(val) {
      this.initMyText()
    }
  },
  created() {
    this.initData()
  },
  mounted() {
  },
  methods: {
    initMyText() {
      const result = this.myOptions.filter(item => this.myValue === item.value)
      if (result[0]) {
        this.myText = result[0].label
      } else {
        this.myText = ''
      }
    },
    initData() {
      // console.log('子组件...',this.value)
      if (this.options.length > 0) {
        this.myOptions = this.options
      } else {
        this.$api.dict.items(this.dictName).then(res => {
          this.myOptions = res.data
          /* const result = this.myOptions.filter(item => this.myValue === item.value)
          if (result[0]) {
            this.myText = result[0].label
          } else {
            this.myText = ''
          }*/
        })
      }
    },
    change(val) {
      this.$emit('input', val)
    },
    handleChange(val) {
      this.myValue = val
      this.$emit('change', val)
    },
    handleVisibleChange(val) {
      this.$emit('visible-change', val)
    },
    handleRemoveTag(tags) {
      this.$emit('remove-tag', tags)
    }
  }
}
</script>

<style scoped>

</style>
