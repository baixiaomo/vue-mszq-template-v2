<template>
  <el-link v-if="hasPerms(perms)" v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-link>
</template>

<script>
import { hasPermission } from '@/utils/permission.js'
export default {
  name: 'WfLinkButton',
  props: {
    perms: { // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    hasPerms: function(perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms)
    }
  }
}
</script>

<style scoped>

</style>
