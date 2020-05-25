<template>
  <div>
    <el-dialog ref="userDialog" v-bind="$attrs" v-on="$listeners">
      <slot name="title"><div style="text-align: center" /></slot>

      <div>
        <el-row :gutter="4">
          <el-col :span="6">&nbsp;
            <el-tag v-if="deptName" :closable="true" @close="closeTag">当前部门：{{ deptName }}</el-tag>
          </el-col>
          <el-col :span="18">
            <el-input v-model="searchCondition.query" placeholder="请输入人员名称" style="width:30%" size="mini" />
            <el-button type="primary" size="mini" @click="initUserData">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="6">
            <div style="height: 500px;overflow-y: auto;">
              <el-tree
                ref="deptTree"
                :props="defaultProps"
                :load="loadNode"
                lazy
                @node-click="nodeClick"
              />
            </div>
          </el-col>
          <el-col :span="18">
            <el-table
              v-loading="loading"
              :data="tableData"
              highlight-current-row
              style="width: 100%"
              size="mini"
              @current-change="userChange"
            >
              <!-- <el-table-column type="selection" min-width="30"/>-->
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
              <el-table-column label="手机号" min-width="100" align="center" sortable>
                <template slot-scope="scope">
                  <span>{{ scope.row.mobile }}</span>
                </template>
              </el-table-column>

              <el-table-column label="邮箱" min-width="160" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination
              style="margin-top: 20px;float: right"
              background
              layout="total, sizes, prev, pager, next"
              :current-page="searchCondition.pageNum"
              :page-size="searchCondition.pageSize"
              :total="total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />
          </el-col>
        </el-row>
      </div>

      <slot name="footer" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WfUserDialog',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      tableData: [],
      total: 0,
      searchCondition: {
        query: '',
        deptId: '',
        pageNum: 1,
        pageSize: 10
      },
      deptName: '',
      user: {
        userId: '',
        userName: '',
        userCode: ''
      }
    }
  },
  created() {
    this.initUserData()
  },
  methods: {
    initUserData() {
      this.loading = true
      this.$api.users.list(this.searchCondition).then(response => {
        this.loading = false
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.dept.children({ deptId: '' }).then(res => {
          resolve(res.data)
        })
      } else if (node.data.hasChildren) {
        this.$api.dept.children({ deptId: node.data.id }).then(res => {
          resolve(res.data)
        })
      } else {
        resolve([])
      }
    },
    handleCurrentChange: function(val) {
      this.searchCondition.pageNum = val
      this.initUserData()
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.initUserData()
    },
    nodeClick(data, node, self) {
      this.searchCondition.deptId = data.id
      this.deptName = data.name
      this.initUserData()
    },
    closeTag() {
      this.deptName = ''
      this.searchCondition.deptId = ''
      this.initUserData()
    },
    userChange(currentRow, oldRow) {
      if (currentRow) {
        this.user.userId = currentRow.id
        this.user.userName = currentRow.name
        this.user.userCode = currentRow.code
      }
    },
    get() {
      return this.user
    }
  }
}
</script>

<style scoped>

</style>
