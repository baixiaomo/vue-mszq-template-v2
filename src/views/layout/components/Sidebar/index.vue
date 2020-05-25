<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      :unique-opened="true"
      mode="vertical"
    >
      <!-- 修改logo -->
      <el-menu-item :class="{'submenu-title-noDropdown':isCollapse}" index="0" style="pointer-events: none;">
        <!-- 缩小时显示的logo，可以自定义，这里直接使用图标库中的 -->
        <div v-if="isCollapse" style="height: 100%;text-align: center; padding-top: 1px">
          <img :src="logo" alt="bcms-ui系统logo" style="max-width: 60%;max-height: 60%">
        </div>
        <!--正常状态下显示的，可以使用本地的logoImg-->
        <div v-else style="height: 100%;text-align: center; padding-top: 1px">
          <img :src="logo" alt="bcms-ui系统logo" style="width: 38px;height: 36px;margin-left: -10px">
          <span style="margin-left: 5px">VUE-MSZQ-V2.0</span>
        </div>
      </el-menu-item>
      <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />-->
      <sidebar-items v-for="menu in menus" :key="menu.id" :item="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItems from './SidebarItems'
import logo from '@/assets/logo.png'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItems },
  data() {
    return {
      logo
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'menus'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
