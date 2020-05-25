<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="filter-container" style="margin: 10px 0 10px 0;">
          <el-row>
            <el-input
              v-model="searchCondition.name"
              clearable
              class="filter-item"
              style="width: 185px;"
              size="mini"
              placeholder="请输入角色名称/标识"
              @keyup.enter.native="handleFind"
            />
            <el-button size="mini" type="primary" icon="el-icon-search" @click="handleFind">查找
            </el-button>
            <wf-button perms="sys:role:add" size="mini" type="primary" icon="el-icon-plus" @click="handleAdd">添加角色</wf-button>
          </el-row>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          highlight-current-row
          @current-change="roleChange"
        >

          <el-table-column label="ID" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="角色名称" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="角色标识" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="启用状态" min-width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
              <el-tag v-else type="danger">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100" align="center">
            <template slot-scope="scope">
              <wf-button perms="sys:role:update" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
              <wf-button perms="sys:role:delete" type="danger" size="mini" icon="el-icon-delete" circle @click="handleDelete(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 30px;float: right"
          background
          layout="total, sizes,prev, pager, next"
          :current-page="searchCondition.pageNum"
          :page-size="searchCondition.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-col>
      <el-col :span="6">
        <el-tabs v-model="tabName">
          <el-tab-pane label="菜单分配" name="first" :style="{height:treeHeight,overflow:'auto'}">
            <div style="margin-left: 5px;margin-top: 10px;">
              <el-input v-model="menuFilter" prefix-icon="el-icon-search" placeholder="输入菜单名称" size="mini" style="width:50%;margin-bottom: 20px" />
              <span style="display: inline-block;float:right">
                <el-button type="info" size="mini" @click="resetTree(0)">重置</el-button>
                <wf-button perms="sys:role:perm1" size="mini" type="primary" @click="saveTree(0)">授权</wf-button>
              </span>
              <div id="treediv">
                <el-tree
                  ref="menuTree"
                  default-expand-all
                  :data="menuData"
                  size="mini"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  element-loading-text="拼命加载中"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="人员分配" name="second" :style="{height:treeHeight,overflow:'auto'}">
            <div style="margin-left: 5px;margin-top: 10px;">
              <el-input v-model="userFilter" prefix-icon="el-icon-search" placeholder="输入人员名称" size="mini" style="width:50%;margin-bottom: 20px" />
              <span style="display: inline-block;float:right">
                <el-button type="info" size="mini" @click="resetTree(1)">重置</el-button>
                <wf-button perms="sys:role:perm2" size="mini" type="primary" @click="saveTree(1)">授权</wf-button>
              </span>
              <div id="treediv2">
                <el-tree
                  ref="userTree"
                  :data="userData"
                  size="mini"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                  element-loading-text="拼命加载中"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" center :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" label-position="right" :model="form" :rules="dataRule">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色标识" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" auto-complete="off" placeholder="请输入角色标识" />
        </el-form-item>
        <el-form-item label="启用状态" :label-width="formLabelWidth">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off" placeholder="请输入角色介绍" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import WfButton from '../../../components/WfButton/index'
import { formatData, getPar } from '@/utils/webUtils'
import { Loading } from 'element-ui'

export default {
  components: {
    WfButton
  },
  data() {
    return {
      menuFilter: '',
      userFilter: '',
      tabName: 'first',
      tableData: [],
      treeHeight: '',
      searchCondition: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      title: '',
      dialogFormVisible: false, // 控制弹出框
      formLabelWidth: '120px',
      isEditForm: false,
      form: {
        id: 0,
        name: '',
        code: '',
        remark: '',
        enabled: true,
        roleMenus: [],
        dsType: 0,
        deptName: '',
        deptId: 1
      },
      selectRoleId: '',
      menuIds: [],
      userIds: [],
      // 分类菜单列表
      menuData: [],
      userData: [],
      // tree配置项
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      checkAll: false,
      // 表单校验
      dataRule: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '角色标识不能为空', trigger: 'blur' }]
      },
      loading: false,
      total: 0,
      deptIds: []
    }
  },
  watch: {
    menuFilter(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  created() {
    this.findTreeData()
    this.roleList()
    this.$api.dept.eAll().then(res => {
      this.userData = res.data
      this.getTreeHeight()
    })
  },
  mounted() {

  },
  methods: {
    getTreeHeight() {
      this.$nextTick(() => {
        // const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight
        this.treeHeight = (deviceHeight - 200) + 'px'
        console.log('treeHeight', this.treeHeight)
      })
    },
    // 分页
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.roleList()
    },
    handleCurrentChange(val) {
      this.searchCondition.pageNum = val
      this.roleList()
    },
    // 获取角色
    roleList: function() {
      this.loading = true
      this.$api.roles.list(this.searchCondition).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.loading = false
      })
    },
    // 获取菜单树
    findTreeData: function() {
      this.$api.menus.getRouters().then((res) => {
        this.menuData = res.data
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.dept.etree({ deptId: '' }).then(res => {
          resolve(res.data)
        })
      } else if (node.data.hasChildren) {
        this.$api.dept.etree({ deptId: node.data.id }).then(res => {
          resolve(res.data)
        })
      } else {
        resolve([])
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleFind: function() {
      this.searchCondition.pageSize = 10
      this.searchCondition.pageNum = 1
      this.roleList()
    },
    // 添加角色
    handleAdd: function() {
      this.dialogFormVisible = true
      this.title = '增加角色'
      this.form = {
        id: '',
        name: '',
        code: '',
        remark: '',
        enabled: true,
        roleMenus: [],
        roleDepts: [],
        // 数据权限类型
        dsType: '',
        deptName: '',
        deptId: 1
      }
      this.isEditForm = false
    },

    // 编辑角色
    handleEdit: function(row) {
      this.dialogFormVisible = true
      this.isEditForm = true
      this.title = '编辑角色'
      this.form = row
    },
    // 重置选择树
    resetTree(flag) {
      if (flag === 0) {
        this.$refs.menuTree.setCheckedKeys(this.menuIds)
      } else {
        this.$refs.userTree.setCheckedKeys(this.userIds)
      }
    },
    saveTree(flag) {
      if (!this.selectRoleId) {
        this.$message({
          type: 'warning',
          message: '请选择角色'
        })
        return
      }
      let checkedNodes = []
      const data = []
      if (flag === 0) {
        checkedNodes = this.$refs.menuTree.getCheckedNodes(false, false)
        for (let i = 0, len = checkedNodes.length; i < len; i++) {
          data.push({ 'menuId': checkedNodes[i].id, 'roleId': this.selectRoleId })
        }
      } else {
        checkedNodes = this.$refs.userTree.getCheckedNodes(true, false)
        for (let i = 0, len = checkedNodes.length; i < len; i++) {
          data.push({ 'userId': checkedNodes[i].id, 'roleId': this.selectRoleId })
        }
      }
      let save = ''
      if (flag === 0) {
        save = this.$api.roles.saveRoleMenu
      } else {
        save = this.$api.roles.saveUserRole
      }
      save(data).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    // 角色选择改变监听
    roleChange(row) {
      const params = { menuId: '', roleId: row.id }
      this.selectRoleId = row.id
      const loadingInstance = Loading.service({ target: document.getElementById('treediv') })
      const loadingInstance2 = Loading.service({ target: document.getElementById('treediv2') })
      const that = this
      this.$api.roles.getRoleMenu(params).then((res) => {
        if (res.code === 200) {
          this.menuIds = res.data
          this.$refs.menuTree.setCheckedKeys(res.data)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
        loadingInstance.close()
        that.$api.users.userRole({ userId: '', roleId: row.id }).then(res => {
          if (res.code === 200) {
            that.userIds = res.data
            that.$refs.userTree.setCheckedKeys(res.data)
          } else {
            that.$message({
              type: 'error',
              message: res.msg
            })
          }
          loadingInstance2.close()
        })
      })
    },

    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将把角色删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.roles.del(row.id).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
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
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isEditForm) {
            this.$api.roles.update(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.dialogFormVisible = false
                this.handleFind()
              } else {
                this.$message({
                  type: 'error',
                  message: response.msg
                })
              }
            })
          } else {
            this.$api.roles.save(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
                this.dialogFormVisible = false
                this.handleFind()
              } else {
                this.$message({
                  type: 'error',
                  message: response.msg
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>
