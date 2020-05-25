<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0;">
      <el-row>
        <el-input
          v-model="searchCondition.name"
          clearable
          class="filter-item"
          size="mini"
          style="width: 185px;"
          placeholder="请输入参数CODE"
          @keyup.enter.native="handleFind"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFind">查找</el-button>
        <wf-button perms="sys:param:add" class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="handleAdd">添加</wf-button>
      </el-row>
    </div>

    <el-table v-loading="loading" :data="tableData" style="width: 100%">

      <el-table-column label="ID" min-width="60" align="center" prop="id" />
      <el-table-column label="名称" min-width="120" align="center" prop="name" />
      <el-table-column label="CODE" min-width="120" align="center" prop="code" />
      <el-table-column label="VALUE" min-width="120" align="center" prop="value" />
      <el-table-column label="状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" header-align="center" min-width="185" align="center">
        <template slot-scope="scope">
          <wf-button perms="sys:param:update" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</wf-button>
          <wf-button perms="sys:param:delete" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</wf-button>
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
    <el-dialog :title="title" center :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input v-model="form.name" style="width: 280px;" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="CODE" label-width="120px" prop="code">
          <el-input v-model="form.code" style="width: 280px;" placeholder="请输入CODE" />
        </el-form-item>
        <el-form-item label="VALUE" label-width="120px" prop="value">
          <el-input v-model="form.value" style="width: 280px;" placeholder="请输入VALUE" />
        </el-form-item>
        <el-form-item label="状态" label-width="120px" prop="name">
          <el-switch v-model="form.enabled" />
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
        code: '',
        value: '',
        enabled: true
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        value: [{ required: true, message: 'value不能为空', trigger: 'blur' }],
        code: [{ required: true, message: 'code不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.configList()
  },
  methods: {
    configList: function() {
      this.loading = true
      this.$api.param.list(this.searchCondition).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.loading = false
      }).catch(err => {
        this.$message({ type: error, message: err })
        this.loading = false
      })
    },
    // 搜索
    handleFind: function() {
      this.searchCondition.pageSize = 10
      this.searchCondition.pageNum = 1
      this.configList()
    },

    // 查看
    handleAdd: function(row) {
      this.form.name = ''
      this.form.code = ''
      this.form.value = ''
      this.form.enabled = true
      this.form.id = ''
      this.dialogFormVisible = true
      this.title = '新增'
    },
    handleUpdate(row) {
      this.form.name = row.name
      this.form.code = row.code
      this.form.value = row.value
      this.form.enabled = row.enabled
      this.form.id = row.id
      this.dialogFormVisible = true
      this.title = '修改'
    },
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 修改
          if (this.form.id) {
            this.$api.param.update(this.form).then(res => {
              if (res.code === 200) {
                this.$message({ type: 'success', message: '修改成功' })
                this.handleFind()
              } else {
                this.$message({ type: 'error', message: '修改失败' })
              }
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message({ type: 'error', message: err })
            })
          } else { // 保存
            this.$api.param.save(this.form).then(res => {
              if (res.code === 200) {
                this.$message({ type: 'success', message: '保存成功' })
                this.handleFind()
              } else {
                this.$message({ type: 'error', message: '保存失败' })
              }
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message({ type: 'error', message: err })
            })
          }
        }
      })
    },

    /**
       * 删除日志
       * @param row
       */
    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将该配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.param.del(row.id).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              that.handleFind()
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }
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
      this.configList()
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.configList()
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
