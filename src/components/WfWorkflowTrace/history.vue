<template>
  <div>
    <el-table v-loading="loading" :data="data" size="mini" style="width: 100%">
      <el-table-column prop="actionTime" label="开始时间" min-width="70" />
      <el-table-column prop="taskName" label="节点名称" min-width="70" />
      <el-table-column prop="assigneeName" label="操作者" min-width="50" />
      <el-table-column prop="actionTypeName" label="操作" min-width="50" />
      <el-table-column label="处理意见" min-width="300">
        <template slot-scope="scope">
          {{ scope.row.comment }}<br>
          <ul v-for="attachment in scope.row.attachments" style="padding-left: 0">
            <li style="list-style: none"><el-link type="primary" :href="baseUrl + attachment.attachmentId">{{ attachment.attachmentName }}</el-link></li>
          </ul>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px;float: right"
      background
      layout="total, sizes, prev, pager, next"
      :current-page="searchCondition.pageNum"
      :page-size="searchCondition.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    id: {
      type: [Number, String]
    },
    status: {
      type: String
    }
  },
  data() {
    return {
      searchCondition: {
        pageNum: 1,
        pageSize: 10,
        projectId: this.id,
        status: this.status
      },
      data: [], // table数据
      loading: false,
      total: 0,
      baseUrl: ''
    }
  },
  watch: {
    id(val) {
      this.searchCondition.projectId = val
      this.findData()
    }
  },
  created() {
    this.findData()
    this.baseUrl = process.env.BASE_API + '/wf/task/attachment?id='
  },
  methods: {
    handleCurrentChange: function(val) {
      this.searchCondition.pageNum = val
      this.findData()
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.findData()
    },
    findData() {
      this.loading = true
      this.$api.task.history(this.searchCondition).then(response => {
        this.loading = false
        this.data = response.data.records
        this.total = response.data.total
      })
    }
  }
}
</script>

<style scoped>

</style>
