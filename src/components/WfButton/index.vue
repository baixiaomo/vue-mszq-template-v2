<!--权限按钮通用组件 author weifei-->
<template>
  <div v-show="!perms || hasPermission(this.perms)" style="display: inline-block">
    <el-button v-bind="$attrs" v-on="$listeners">
      <slot />
    </el-button>
  </div>
</template>

<script>
import { hasPermission } from '../../utils/permission'
export default {
  name: 'WfButton',
  props: {
    perms: { // 权限标识，多个权限用逗号隔开
      type: String
    }
  },
  data() {
    return {
      visible: true
    }
  },
  created() {

  },
  methods: {
    hasPermission,
    hasPerms() {
      // 根据权限标识和外部指示状态进行权限判断
      if (!this.perms || hasPermission(this.perms)) {
        this.visible = true
      } else {
        this.visible = false
      }
    }
  }
}
</script>

<style scoped>

</style>
