<template>
  <div>
    <editor ref="editor" v-model="code" lang="xml" theme="chrome" width="100%" :height="height" @init="editorInit" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      businessKey: '',
      code: '',
      height: '600px'
    }
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  created() {
    this.businessKey = this.$route.query.businessKey
  },
  mounted() {
    this.$api.workflow.code({ businessKey: this.businessKey }).then(res => {
      this.code = res
    })
    this.$nextTick(() => {
      const deviceHeight = document.documentElement.clientHeight
      this.height = (deviceHeight - 125) + 'px'
    })
  },
  methods: {
    editorInit: function() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/xml')
      require('brace/theme/chrome')
    }
  }
}
</script>

<style scoped>

</style>
