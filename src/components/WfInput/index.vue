<!--
@author: weifei
@desc: 支持数字格式化的input组件

-->
<template>
  <div class="wf_input" style="display: inline-block;width: 165px">
    <span v-if="required" style="display: inline-block;color: #F56C6C;">*</span>
    <el-input v-if="editable" v-model="getFormatValue" :class="{'require': myRequired, 'wf_input_required': required}" v-bind="$attrs" v-on="$listeners" @blur="blurHandler">
      <span slot="suffix" style="margin-left: 10px;line-height: 28px"><slot name="wsuffix" /></span>
    </el-input>
    <span v-else>{{ value | fmoney }}</span>
  </div>
</template>

<script>
export default {
  name: 'WfInput',
  props: {
    value: {
      type: [String, Number]
    },
    editable: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myRequired: false,
      formatValue: this.value
    }
  },
  computed: {
    getFormatValue: {
      get() {
        return this.format(this.formatValue)
      },
      set(val) {
        this.formatValue = this.resetFormat(val)
      }
    }
  },
  watch: {
    formatValue(val) {
      if (!val) return 0
      val = val.toString().replace(',', '')
      if (isNaN(val)) {
        this.$emit('input', 0)
      } else {
        this.$emit('input', Number(val))
      }
    },
    value(val) {
      this.formatValue = val
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    },
    format(value) {
      if (value === 0) return '0'
      if (!value) return ''
      if (isNaN(value)) {
        return ''
      }

      var intPart = value.toString().split('.')[0] // 获取整数部分

      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

      if (value.toString().indexOf('.') > -1) {
        var xiaoshu = value.toString().split('.')
        intPartFormat = intPartFormat + '.' + xiaoshu[1]
      }
      return intPartFormat
    },
    resetFormat(val) {
      if (!val) return 0
      val = val.toString().replace(/,/g, '')
      if (isNaN(val)) {
        return 0
      } else {
        return val
      }
    },
    changeHandler(val) {
      if (this.required && !this.formatValue) {
        this.myRequired = true
      } else {
        this.myRequired = false
      }
    },
    blurHandler() {
      if (this.required && !this.formatValue && this.formatValue !== 0) {
        this.myRequired = true
      } else {
        this.myRequired = false
      }
    },
    warning() {
      this.myRequired = true
    }
  }
}
</script>

<style>
  .el-input__inner:after{
    content: '*';
  }
  .wf_input_required{
    width: 150px;
    float: right
  }
  .wf_input .require .el-input__inner{
    border: 1px solid #F56C6C;
    border-radius: 5px;
  }
</style>
