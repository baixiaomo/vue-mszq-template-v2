<template>
  <div class="menu-wrapper">

    <template v-if="!item.children || item.children.length === 0">
      <!--<app-link v-if="item.meta" :to="item.path">-->
      <el-menu-item v-if="!item.hidden"
        :index="'' + item.id"
        :class="{'submenu-title-noDropdown':!isNest}"
        :style="{color:(isActive(item.path)?theme:'#BFCBD9')}"
        @click="handleRoute(item)"
      >
        <i v-if="isCollapse" style="width: 20px; margin-left: 20px" :class="item.meta.icon" />
        <i v-else style="width: 20px;" :class="item.meta.icon" />
        <span slot="title">{{ generateTitle(item.meta.title) }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" popper-append-to-body :index="'' + item.id">
      <template slot="title">
        <i v-if="isCollapse" style="width: 20px; margin-left: 20px" :class="item.meta.icon" />
        <i v-else style="width: 20px;" :class="item.meta.icon" />
        <span slot="title">{{ generateTitle(item.meta.title) }}</span>
      </template>
      <sidebar-items
        v-for="child in item.children"
        :key="child.id"
        :is-nest="true"
        :item="child"
        class="nest-menu"
        :base-path="item.path"
      />
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItems',
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
    theme() {
      return this.$store.state.app.theme
    },
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleRoute(menu) {
      // 如果是嵌套页面，转换成iframe的path
      /* let path = getIFramePath(menu.url)
        if (!path) {
          path = menu.url
        }*/
      // 通过菜单URL跳转至指定路由
      /* let path = ''
        if(this.basePath) {
          path = this.basePath + menu.path
        }else{
          path = menu.path
        }*/
      this.$router.push(menu.path)
    },
    isActive(path) {
      // console.log('---', this.resolvePath(path), this.$route.path)
      return path === this.$route.path
    },
    hasOneShowingChild(children = [], parent) {
      if (children != null) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      }
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },

    generateTitle
  }
}
</script>
