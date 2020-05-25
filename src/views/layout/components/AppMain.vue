<template>
  <section class="app-main">

    <!--根据路由对象的缓存标识判断是否需要缓存-->
    <keep-alive :exclude="excludeViews">
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    excludeViews() {
      return this.$store.getters.excludeViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  /*min-height: calc(100vh - 84px);*/
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

