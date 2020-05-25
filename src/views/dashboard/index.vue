<!--项目首页-->
<template>
  <div class="dashboard-editor-container" :style="{height: height + 'px'}">
    <panel-group :data="data" />
    <el-row :gutter="16">
      <!--<line-chart :chart-data="lineChartData" />-->
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart :x-alias="data.projectNumTable.xAlias" :data="data.projectNumTable.data" series-name="项目数量" title="项目数量" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart :x-alias="data.projectAmountTable.xAlias" :data="data.projectAmountTable.data" item-color="#36a3f7" series-name="项目金额" title="项目金额（单位：万元）" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :legend-data="data.sDeptNetIncomePie.legend" :series-data="data.sDeptNetIncomePie.data" series-name="主办部门项目净收入" title="主办部门项目净收入" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :legend-data="data.cDeptNetIncomePie.legend" :series-data="data.cDeptNetIncomePie.data" series-name="协同部门项目净收入" title="协同部门项目净收入" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    PieChart,
    BarChart
  },
  data() {
    return {
      data: {
        height: 800,
        projectNum: 0, // 项目数量
        projectAmount: 0, // 项目金额
        projectNetIncome: 0, // 项目净收入
        projectExpectIncome: 0, // 预计产生收入
        // 项目数量条形图数据
        projectNumTable: {
          data: [], // 列数据
          xAlias: [] // 横坐标
        },
        // 项目金额条形图数据
        projectAmountTable: {
          data: [], // 列数据
          xAlias: [] // 横坐标
        },
        sDeptNetIncomePie: { // 主办部门净收入饼形图数据
          data: [],
          legend: [] // 标题
        },
        cDeptNetIncomePie: { // 协同部门净收入饼形图数据
          data: [],
          legend: [] // 标题
        }
      }
    }
  },
  computed: {
    projectNumTable() {
      return this.data.projectNumTable
    }
  },
  watch: {
  },
  created() {
    this.initData()
    this.height = document.documentElement.clientHeight - 90
    console.log('height', this.height)
  },
  methods: {
    initData() {
      this.$api.dashboard.count().then(res => {
        this.data.projectNum = res.data
      })
      this.$api.dashboard.income().then(res => {
        this.data.projectAmount = res.data
      })
      this.$api.dashboard.netProfit().then(res => {
        this.data.projectNetIncome = res.data
      })
      this.$api.dashboard.incomeRecord().then(res => {
        this.data.projectExpectIncome = res.data
      })
      this.$api.dashboard.countStatus().then(res => {
        const xAlias = []
        const data = []
        for (const key in res.data) {
          xAlias.push(key)
          data.push(res.data[key])
        }
        this.data.projectNumTable.xAlias = xAlias
        this.data.projectNumTable.data = data
      })
      this.$api.dashboard.incomeStatus().then(res => {
        const xAlias = []
        const data = []
        for (const key in res.data) {
          xAlias.push(key)
          data.push(res.data[key])
        }
        this.data.projectAmountTable.xAlias = xAlias
        this.data.projectAmountTable.data = data
      })
      this.$api.dashboard.incomeSponsor().then(res => {
        const data = []
        const legend = []
        for (const key in res.data) {
          data.push({ name: key, value: res.data[key] })
          legend.push(key)
        }
        this.data.sDeptNetIncomePie.data = data
        this.data.sDeptNetIncomePie.legend = legend
      })
      this.$api.dashboard.incomeCoord().then(res => {
        const data = []
        const legend = []
        for (const key in res.data) {
          data.push({ name: key, value: res.data[key] })
          legend.push(key)
        }
        this.data.cDeptNetIncomePie.data = data
        this.data.cDeptNetIncomePie.legend = legend
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 15px 15px 0;
    margin-bottom: 15px;
  }
}
</style>
