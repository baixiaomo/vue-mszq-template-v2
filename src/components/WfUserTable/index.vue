<!--
  人员Table组件
-->
<template>
  <div class="user_table">
    <el-row>
      <el-input
        v-model="searchCondition.query"
        size="mini"
        clearable
        style="width: 200px;"
        placeholder="请输入名称"
      />
      <el-button size="mini" type="primary" icon="el-icon-search" @click="search">查找</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%"
      size="mini"
      highlight-current-row
      @current-change="change"
    >
      <el-table-column label="ID" min-width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" min-width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px;float: right"
      background
      layout="total, sizes,prev, pager, next"
      :current-page="searchCondition.pageNum"
      :page-size="searchCondition.pageSize"
      :pager-count="2"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import list from '../../mixins/list'
export default {
  name: 'Index',
  mixins: [list],
  props: {},
  data() {
    return {
      searchCondition: {
        query: ''
      },
      data: []
    }
  },
  created() {
    this.findData()
  },
  methods: {
    findData() { // 父组件需要重写数据加载方法
      this.loading = true
      this.$api.users.list(this.searchCondition).then(response => {
        this.loading = false
        this.data = response.data.records
        this.total = response.data.total
      })
    },
    search() {
      this.searchCondition.pageSize = 10
      this.searchCondition.pageNum = 0
      this.findData()
    },
    change(row) {
      this.$emit('input', row.id)
    }
  }
}
</script>

<style>
  .user_table .el-table__body tr.current-row>td {
    background-color: #b5d3f5;
  }
</style>
