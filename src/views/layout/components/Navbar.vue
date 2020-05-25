<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">

      <!--<lang-select class="right-menu-item hover-effect" />-->

      <el-tooltip content="更换主题" effect="dark" placement="bottom">
        <theme-picker class="right-menu-item hover-effect" @themeChange="themeChange" />
      </el-tooltip>
      <el-tooltip content="待办提醒" effect="dark" placement="bottom">
        <span class="right-menu-item hover-effect">
          <el-badge :value="taskSize" class="badge" :hidden="taskSize==0" style="height: 30px;line-height: 30px">
            <!--<li :style="{color:taskSize>0?'#F56C6C':'#5A5E66'}" class="fa fa-bell-o fa-lg" @click="task()" />-->
            <img :src="tixing" width="32" height="32" @click="task()">
          </el-badge>
        </span>
      </el-tooltip>
      <!--个人-->

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div>{{ userName }}</div>
        <!--<div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          &lt;!&ndash;<i class="el-icon-caret-bottom" />&ndash;&gt;
        </div>-->
        <!-- <span class="right-menu-item">{{userName}}|{{userCode}}</span>-->
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ThemePicker from '@/components/ThemePicker'
import tixing from '../../../assets/tixing.png'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'userName'
    ]),
    taskSize() {
      return this.$store.getters.taskSize
    }
  },
  data() {
    return {
      tixing
    }
  },
  mounted() {
    this.$api.task.tasksCount().then(response => {
      this.$store.commit('TASK_SIZE', response.data)
    })
  },
  methods: {
    themeChange(theme) { // 记录当前主题颜色
      this.$store.commit('SET_THEME', theme)
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    // 退出登录
    logout() {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    },
    // 进入待办
    task() {
      this.$router.push('/project/task')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
