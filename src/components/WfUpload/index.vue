<!--
  @desc: 文件上传通用组件
  @author: weifei
-->
<template>
  <div>
    <el-upload
      ref="upload"
      v-bind="$attrs"
      style="display: inline-block;margin-top: 5px"
      :on-change="handleFileChange"
      :on-remove="removeFile"
      :auto-upload="false"
      :multiple="true"
      :accept="accept"
      :show-file-list="true"
      action=""
      v-on="$listeners"
    >
      <el-button :size="buttonSize" type="primary">{{ buttonText }}</el-button>
      <span style="color: #ff281c;font-size: 12px">{{ tips }}</span>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    tips: {
      type: String,
      default: ' 可上传.doc、.docx、.xls、.xlsx、.pdf、.png、.gif、.jpg等文本文档'
    },
    buttonText: {
      type: String,
      default: '上传附件'
    },
    buttonSize: {
      type: String,
      default: 'small'
    },
    accept: {
      type: String,
      default: '.doc,.docx,.xls,.xlsx,.pdf,.png,.gif,.jpg'
    }
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    handleFileChange(file, fileList) {
      this.files.push(file.raw)
      this.$emit('input', this.files)
    },
    removeFile(file, fileList) {
      this.files = this.files.filter(item => item.name !== file.name)
      this.$emit('input', this.files)
    },
    getFiles() {
      return this.files
    }
  }
}
</script>

<style scoped>

</style>
