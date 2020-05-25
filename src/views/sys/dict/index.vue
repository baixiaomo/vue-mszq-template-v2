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
          placeholder="请输入字典名称"
          @keyup.enter.native="handleFind"
        />
        <el-input
          v-model="searchCondition.code"
          clearable
          class="filter-item"
          size="mini"
          style="width: 185px;"
          placeholder="请输入字典编码"
          @keyup.enter.native="handleFind"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFind">查找</el-button>
        <wf-button perms="sys:dict:add" class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="handleAdd(0)">新增</wf-button>
      </el-row>
    </div>

    <el-table
      ref="dicTable"
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :load="load"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >

      <el-table-column label="ID" min-width="60" align="center" prop="id" />
      <el-table-column label="名称" min-width="120" align="center" prop="name" />
      <el-table-column label="CODE" min-width="120" align="center" prop="code" />
      <el-table-column label="父节点" min-width="80" align="center" prop="parentId" />
      <el-table-column label="状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" min-width="80" align="center" prop="sort" />
      <el-table-column label="备注" min-width="120" align="center" prop="remark" />
      <el-table-column label="操作" fixed="right" header-align="center" min-width="185" align="center">
        <template slot-scope="scope">
          <wf-button perms="sys:dict:add" type="warning" size="mini" icon="el-icon-plus" @click="handleAdd(scope.row.id)">新增</wf-button>
          <wf-button perms="sys:dict:update" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</wf-button>
          <wf-button perms="sys:dict:delete" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</wf-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <!--<el-pagination style="margin-top: 10px;float: right"
                   background
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                   layout="total, sizes, prev, pager, next"
                   :current-page="searchCondition.pageNum"
                   :page-size="searchCondition.pageSize"
                   :total="total">
    </el-pagination>-->
    <el-dialog :title="title" center :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input v-model="form.name" style="width: 280px;" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="CODE" label-width="120px" prop="code">
          <el-input v-model="form.code" style="width: 280px;" placeholder="请输入CODE" />
        </el-form-item>
        <el-form-item label="父节点" label-width="120px" prop="parentId">
          <el-input v-model="form.parentId" style="width: 280px;" placeholder="请输入父节点ID" />
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item label="排序" label-width="120px">
          <el-input-number v-model="form.sort" />
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input v-model="form.remark" type="textarea" style="width: 280px;" placeholder="请输入备注" />
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
        code: ''
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
        parentId: '',
        remark: '',
        sort: '',
        enabled: true
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        parentId: [{ required: true, message: 'parentId不能为空', trigger: 'blur' }],
        code: [{ required: true, message: 'code不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.dictList(0)
  },
  methods: {
    dictList: function(id) {
      this.loading = true
      this.$api.dict.tree(id).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    // 搜索
    handleFind: function() {
      this.dictList(0)
    },
    load(tree, treeNode, resolve) {
      this.loading = true
      const params = new URLSearchParams()
      this.$api.dict.tree(tree.id).then(res => {
        resolve(res.data)
        this.loading = false
      })
    },
    // 新增
    handleAdd: function(parentId) {
      this.form.name = ''
      this.form.code = ''
      this.form.parentId = parentId
      this.form.enabled = true
      this.form.id = ''
      this.form.remark = ''
      this.form.sort = 0
      this.dialogFormVisible = true
      this.title = '新增'
    },
    handleUpdate(row) {
      this.form.name = row.name
      this.form.code = row.code
      this.form.parentId = row.parentId
      this.form.enabled = row.enabled
      this.form.sort = row.sort
      this.form.remark = row.remark
      this.form.id = row.id
      this.dialogFormVisible = true
      this.title = '修改'
    },
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 修改
          if (this.form.id) {
            this.$api.dict.update(this.form).then(res => {
              if (res.code === 200) {
                this.$message({ type: 'success', message: '修改成功' })
                this.dictList(0)
              } else {
                this.$message({ type: 'error', message: '修改失败' })
              }
              this.dialogFormVisible = false
            }).catch(err => {
              this.$message({ type: 'error', message: err })
            })
          } else { // 保存
            this.$api.dict.save(this.form).then(res => {
              if (res.code === 200) {
                this.$message({ type: 'success', message: '保存成功' })
                this.dictList(0)
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
      this.$confirm('此操作将该字典, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.dict.del(row.id).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              that.dictList(0)
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
