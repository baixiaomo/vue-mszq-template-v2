<!--
菜单通用table
-->
<template>
  <div class="menu_table">
    <tree-table
      :key="key"
      v-loading="loading"
      :default-expand-all="defaultExpandAll"
      :data="tableTreeData"
      :columns="columns"
      size="small"
      highlight-current-row
      style="height: 580px;overflow: auto"
      @current-change="change"
    >
      <template slot="icon" slot-scope="{scope}">
        <span :class="scope.row.icon" />
      </template>
      <template slot="type" slot-scope="{scope}">
        <el-tag v-if="scope.row.type === 1 || scope.row.type === 0" size="small">菜单</el-tag>
        <el-tag v-else-if="scope.row.type === 2" size="small" type="success">按钮</el-tag>
        <el-tag v-else-if="scope.row.type === 3" size="small" type="warning">页面要素</el-tag>
      </template>
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
export default {
  name: 'Index',
  components: { treeTable },
  data() {
    return {
      tableTreeData: [],
      columns: [
        {
          label: 'ID',
          key: 'id',
          minWidth: 70,
          align: 'center'
        },
        {
          label: '名称',
          key: 'name',
          expand: true,
          minWidth: 150,
          align: 'center'
        },
        {
          label: '图标',
          key: 'icon',
          minWidth: 50
        },
        {
          label: '类型',
          key: 'type',
          minWidth: 80
        }
      ],
      defaultExpandAll: false,
      key: 1
    }
  },
  created() {
    this.findTreeData()
  },
  methods: {
    findTreeData: function() {
      this.loading = true
      const params = {
        'name': ''
      }
      this.$api.menus.all(params).then(res => {
        this.tableTreeData = res.data
        this.popupTreeData = this.getParentMenuTree(res.data)
        this.loading = false
      })
    },
    getParentMenuTree: function(tableTreeDdata) {
      const parent = {
        id: 1,
        name: '根节点',
        children: tableTreeDdata
      }
      return [parent]
    },
    change(row) {
      this.$emit('input', row.id)
    }
  }
}
</script>

<style>
  .menu_table .el-table__body tr.current-row>td {
    background-color: #b5d3f5;
  }
</style>
