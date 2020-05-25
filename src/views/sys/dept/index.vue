<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0;">
      <el-row>
        <el-input
          v-model="keyword"
          clearable
          class="filter-item"
          style="width: 185px;"
          size="mini"
          placeholder="请输入部门名称"
        />
        <el-button size="mini" type="primary" icon="el-icon-search pointer" @click="handleFind">查找</el-button>
        <el-button size="mini" type="success" icon="el-icon-refresh pointer" @click="handleSync">同步数据</el-button>
      </el-row>
    </div>
    <!--表格树内容栏-->
    <el-table
      :data="tableTreeData"
      row-key="id"
      :load="load"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="ID" width="100" align="right" />
      <el-table-column prop="name" label="部门名称" width="220" />
      <el-table-column prop="abbrName" label="部门简称" width="220" />
      <el-table-column prop="directorId" label="部门负责人ID" width="220" />
      <el-table-column prop="directorName" label="部门负责人" width="220" />
      <el-table-column prop="sort" label="排序" width="120" />
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增修改界面 -->
    <el-dialog
      title="修改"
      width="30%"
      center
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        label-width="80px"
        :size="size"
        style="text-align:left;"
        @keyup.enter.native="submitEditForm()"
      >
        <el-form-item label="部门ID">
          <el-input v-model="dataForm.id" readonly />
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="dataForm.name" readonly />
        </el-form-item>
        <el-form-item label="部门简称">
          <el-input v-model="dataForm.abbrName" placeholder="请输入机构简称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" :loading="editLoading" @click="submitEditForm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { parseTime } from '@/utils/index'

export default {
  data() {
    return {
      size: 'small',
      keyword: '',
      tableData: [],
      formLabelWidth: '180px',
      isEditForm: false,
      loading: false,
      dialogVisible: false,
      defaultExpandAll: true,
      dataForm: {
        id: 0,
        name: '',
        abbrName: ''
      },
      tableTreeData: [],
      // 表单校验
      popupTreeData: [],
      popupTreeProps: {
        label: 'name',
        children: 'children'
      },
      editLoading: false
    }
  },
  created() {
    this.findTreeData('')
  },
  methods: {
    parseTime,
    handleFind: function() {
      this.findTreeData('')
    },
    appendChild(data, deptId) {
      if (data.id === deptId) {

      }
    },
    load(tree, treeNode, resolve) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('deptId', tree.id)
      this.$api.dept.children(params).then(res => {
        resolve(res.data)
      })
    },
    // 编辑界面
    handleEdit: function(row) {
      this.dialogVisible = true
      this.dataForm.id = row.id
      this.dataForm.name = row.name
      this.dataForm.abbrName = row.abbrName
    },

    // 获取数据
    findTreeData: function(id) {
      this.loading = true
      const params = new URLSearchParams()
      params.append('deptId', id)
      this.$api.dept.children(params).then(res => {
        console.log(res)
        this.tableTreeData = res.data
        this.popupTreeData = res.data
        this.loading = false
      })
    },
    // 机构树选中
    handleTreeSelectChange(data) {
      this.dataForm.parentId = data.deptId
      this.dataForm.parentName = data.name
    },

    submitEditForm: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            this.$api.dept.update(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.$message({ message: '操作成功', type: 'success' })
              } else {
                this.$message({ message: res.msg, type: 'error' })
              }
              this.editLoading = false
              this.$refs['dataForm'].resetFields()
              this.dialogVisible = false
              this.findTreeData('')
            })
          })
        }
      })
    },

    handleSync() {
      this.$api.dept.syncData().then(res => {
        this.$message({
          type: 'success',
          message: '同步完成'
        })
      })
      this.findTreeData('')
    }
  }
}
</script>
<style>
  .pointer {
    cursor: pointer;
  }
</style>
