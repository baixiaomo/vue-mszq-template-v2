<template>
  <div>
    <iframe :src="designUrl" frameborder="0" width="100%" :height="iframeHeight" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      id: '',
      designUrl: '',
      iframeHeight: '200px'
    }
  },
  created() {
    this.id = this.$route.query.id
    this.designUrl = process.env.BASE_WORKFLOW_URL + this.id
  },
  mounted() {
    this.$nextTick(() => {
      // const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight
      this.iframeHeight = (deviceHeight - 125) + 'px'
    })
  }
}
</script>

<style scoped>

</style>
