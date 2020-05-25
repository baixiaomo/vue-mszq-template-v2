<!--流程追踪通用组件-->
<template>
  <div>
    <el-tabs v-model="active">
      <el-tab-pane v-if="'BB01' !== busiType" label="备案审批历史" name="first">
        <history :id="key" status="01" />
      </el-tab-pane>
      <el-tab-pane v-if="'BB01' !== busiType" label="备案流程图" name="third">
        <img :src="baurl">
      </el-tab-pane>
      <el-tab-pane v-if="status === '03' || status === '04'" label="决算审批历史" name="second">
        <history :id="key" :status="status" />
      </el-tab-pane>
      <el-tab-pane v-if="status === '03' || status === '04'" label="决算流程图" name="forth">
        <img :src="jsurl">
      </el-tab-pane>
    </el-tabs>
    <!--<el-collapse v-if="type === 'collapse'" v-model="active">
      <el-collapse-item title="备案审批历史" name="first1">
        <history :id="key" status="01" />
      </el-collapse-item>
      <el-collapse-item v-if="status === '03' || status === '04'" label="决算审批历史" name="first2">
        <history :id="key" :status="status" />
      </el-collapse-item>
      <el-collapse-item title="备案流程图" name="second1">
        <img :src="baurl">
      </el-collapse-item>
      <el-collapse-item v-if="status === '03' || status === '04'" title="决算流程图" name="second2">
        <img :src="baurl">
      </el-collapse-item>
    </el-collapse>-->
  </div>
</template>

<script>
import history from './history'
import Vue from 'vue'
import ImageViewer from 'vue2-viewer'
Vue.use(ImageViewer)
export default {
  name: 'WfWorkflowTrace',
  components: {
    history
  },
  props: {
    busiType: {
      type: String,
      default: ''
    },
    businessKey: {
      type: [String, Number]
    },
    status: {
      type: String,
      default: '01'
    }
  },
  data() {
    return {
      active: 'first',
      key: this.businessKey
    }
  },
  computed: {
    baurl() {
      return encodeURI(process.env.BASE_API + '/busi/wf/processTrackImage.html?bussId=' + this.key + '&status=01')
    },
    jsurl() {
      return encodeURI(process.env.BASE_API + '/busi/wf/processTrackImage.html?bussId=' + this.key + '&status=' + this.status)
    }
  },
  watch: {
    businessKey(val) {
      this.key = val
      this.$forceUpdate()
    },
    status(val) {
      if (this.busiType === 'BB01') {
        this.active = 'second'
      } else {
        this.active = 'first'
      }
    }
  },
  created() {
    if (this.busiType === 'BB01') {
      this.active = 'second'
    }
  },
  methods: {
    print() {
      this.$refs['viewer'].hideFullViewer()
    }
  }
}
</script>

<style>
    .viewer img {
      width: 75%;
      height: 270px;
    }
</style>
