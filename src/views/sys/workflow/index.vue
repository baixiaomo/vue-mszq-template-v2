<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-row>
        <el-input
          v-model="searchCondition.name"
          clearable
          class="filter-item"
          size="mini"
          style="width: 185px;"
          placeholder="请输入流程名称"
          @keyup.enter.native="handleFind"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFind">查找</el-button>
        <wf-button class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="handleAdd">添加</wf-button>
      </el-row>
    </div>

    <el-table v-loading="loading" :data="tableData" style="width: 100%">

      <el-table-column label="ID" min-width="60" align="center" prop="id" />
      <el-table-column label="名称" min-width="120" align="center" prop="name" />
      <el-table-column label="标识" min-width="120" align="center" prop="key" />
      <el-table-column label="分类" min-width="120" align="center" prop="category" />
      <el-table-column label="创建时间" min-width="120" align="center" prop="createTime" />
      <el-table-column label="操作" fixed="right" header-align="center" min-width="360" align="center">
        <template slot-scope="scope">
          <wf-button size="mini" @click="handleUpdate(scope.row)">修改</wf-button>
          <wf-button size="mini" type="primary" @click="handleDesign(scope.row)">设计</wf-button>
          <wf-button size="mini" type="success" @click="handleDeploy(scope.row)">部署</wf-button>
          <wf-button size="mini" type="warning" @click="handleCode(scope.row)">代码</wf-button>
          <wf-button size="mini" @click="handleDownload(scope.row)">下载</wf-button>
          <!--<wf-button size="mini" @click="handleCopy(scope.row)">复制</wf-button>-->
          <wf-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</wf-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      style="margin-top: 30px;float: right"
      background
      layout="total, sizes, prev, pager, next"
      :current-page="searchCondition.pageNum"
      :page-size="searchCondition.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!--新增窗口-->
    <el-dialog :title="title" center :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input v-model="form.name" style="width: 280px;" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="标识" label-width="120px" prop="code">
          <el-input v-model="form.key" style="width: 280px;" placeholder="请输入key" />
        </el-form-item>
        <el-form-item label="分类" label-width="120px" prop="type">
          <el-input v-model="form.category" style="width: 280px;" placeholder="请输入分类" />
        </el-form-item>
        <el-form-item label="备注" label-width="120px" prop="remark">
          <el-input v-model="form.desc" style="width: 280px;" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import WfButton from '../../../components/WfButton/index'
export default {
  components: {
    WfButton
  },
  data() {
    return {
      searchCondition: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      tableData: [],
      title: '新增',
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        key: '',
        category: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        category: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
        key: [{ required: true, message: 'code不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.workflowList()
  },
  mounted() {
    this.$nextTick(() => {
      const deviceHeight = document.documentElement.clientHeight
      this.iframeHeight = (deviceHeight - 125) + 'px'
    })
  },
  methods: {
    workflowList: function() {
      this.loading = true
      this.$api.workflow.list(this.searchCondition).then(response => {
        this.tableData = response.records
        this.total = response.total
        this.loading = false
      }).catch(err => {
        this.$message({ type: 'error', message: err })
        this.loading = false
      })
    },
    // 搜索
    handleFind: function() {
      this.workflowList()
    },

    // 新增
    handleAdd: function(row) {
      this.form.name = ''
      this.form.key = ''
      this.form.category = ''
      this.form.desc = ''
      this.form.id = ''
      this.dialogFormVisible = true
      this.title = '新增'
    },
    // 修改
    handleUpdate(row) {
      this.form.name = row.name
      this.form.key = row.key
      this.form.category = row.category
      this.form.desc = row.desc
      this.form.id = row.id
      this.dialogFormVisible = true
      this.title = '修改'
    },
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 修改
          if (this.form.id) {
            this.$api.workflow.save(this.form).then(res => {
              this.$message({ type: 'success', message: '修改成功' })
              this.workflowList()
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message({ type: 'error', message: err })
            })
          } else { // 保存
            this.$api.workflow.save(this.form).then(res => {
              this.$message({ type: 'success', message: '保存完毕' })
              this.workflowList()
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message({ type: 'error', message: err })
            })
          }
        }
      })
    },
    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将该流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.workflow.del(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除完毕'
            })
            that.workflowList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 换页
    handleCurrentChange: function(val) {
      this.searchCondition.pageNum = val
      this.workflowList()
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.workflowList()
    },

    handleDesign(row) {
      this.$router.push({ path: '/sys/workflowdesign', query: { id: row.id }})
    },
    handleDeploy(row) {
      const params = { id: row.id }
      this.$api.workflow.deploy(params).then(response => {
        this.$message({
          type: 'success',
          message: '部署完毕'
        })
        this.workflowList()
      }).catch(res => {
        this.$message({
          type: 'error',
          message: res
        })
      })
    },
    handleDownload(row) {
      const a = document.createElement('a')
      a.download = '流程代码下载'
      a.href = process.env.BASE_API + '/wf/sys/downDeployFile?id=' + row.id
      a.click()
    },
    handleCopy(row) {
      const params = { id: row.id }
      this.$api.workflow.deploy(params).then(res => {
        this.$message({
          type: 'success',
          message: '复制完毕'
        })
        this.workflowList()
      })
    },
    handleCode(row) {
      this.$router.push({ path: '/sys/workflowcode', query: { businessKey: row.key }})
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .uploadImgBody :hover {
    border: dashed 1px #00ccff;
  }
  img {
    width: 100px;
    height: 100px;
  }
</style>
