<!--
  人员Table组件
-->
<template>
  <div class="dept_table">
    <el-table
      style="height: 580px;overflow: auto"
      :data="tableTreeData"
      row-key="id"
      :load="load"
      lazy
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @current-change="change"
    >
      <el-table-column prop="id" label="ID" width="100" align="right" />
      <el-table-column prop="name" label="部门名称" min-width="100" />
      <el-table-column prop="abbrName" label="部门简称" width="100" />
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      tableTreeData: [],
      loading: false
    }
  },
  created() {
    this.findTreeData('')
  },
  methods: {
    // 获取数据
    findTreeData: function(id) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('deptId', id)
      this.$api.dept.children(params).then(res => {
        console.log(res)
        this.tableTreeData = res.data
        this.loading = false
      })
    },
    load(tree, treeNode, resolve) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('deptId', tree.id)
      this.$api.dept.children(params).then(res => {
        resolve(res.data)
      })
    },
    change(row) {
      this.$emit('input', row.id)
    }
  }
}
</script>

<style>
  .dept_table .el-table__body tr.current-row>td {
    background-color: #b5d3f5;
  }
</style>
