<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 查询和其他操作 -->
        <div class="filter-container" style="margin: 10px 0 10px 0;">
          <el-row>
            <el-input
              v-model="searchCondition.query"
              clearable
              size="mini"
              class="filter-item"
              style="width: 185px;"
              placeholder="名称"
              @keyup.enter.native="find"
            />
            <el-button type="primary" icon="el-icon-search" size="mini" @click="findUser">查找</el-button>
            <el-button size="mini" type="success" icon="el-icon-refresh pointer" @click="handleSync">同步数据</el-button>
          </el-row>
        </div>

        <el-table
          v-loading="loading"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          @current-change="userChange"
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

          <el-table-column label="部门" width="130" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.deptName }}</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
              <el-tag v-else type="danger">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle @click.stop="openModPwd(scope.row)" />
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
      </el-col>
      <el-col :span="6">
        <el-input v-model="roleFilter" prefix-icon="el-icon-search" placeholder="输入菜单名称" size="mini" style="width:50%;margin-bottom: 20px" />
        <span style="display: inline-block;float:right">
          <el-button type="info" size="mini" @click="resetTree(0)">重置</el-button>
          <wf-button perms="sys:user:perm" size="mini" type="primary" @click="saveTree(0)">授权</wf-button>
        </span>
        <div id="treediv">
          <el-tree
            ref="roleTree"
            default-expand-all
            :data="roleData"
            size="mini"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :filter-node-method="filterNode"
            element-loading-text="拼命加载中"
            :check-strictly="true"
            @check-change="handleMenuCheckChange"
          />
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改密码" center :visible.sync="dialogFormVisible" width="25%" :before-close="modPwdClose">
      <el-form ref="modForm" label-position="left" :model="form" label-width="80px">
        <el-form-item label="新密码：" prop="password" :rules="{ required: true, message: '请输入新密码', trigger: 'blur' }">
          <el-input v-model="form.password" auto-complete="off" placeholder="请输入新密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;form.password=''">取 消</el-button>
        <el-button type="primary" @click="modPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatData } from '@/utils/webUtils'
import WfButton from '../../../components/WfButton/index'
import { Loading } from 'element-ui'

export default {
  components: {
    WfButton
  },
  data() {
    return {
      // 用户列表
      searchCondition: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      loading: false,
      roleFilter: '',
      roleData: [],
      dialogFormVisible: false,
      form: {
        userCode: '',
        password: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectUserId: '',
      roleIds: []

    }
  },
  watch: {
    roleFilter(val) {
      this.$refs.roleTree.filter(val)
    }
  },
  created() {
    this.find()
    this.findRoleData()
  },
  methods: {
    modPwdClose(done) {
      this.form.password = ''
      done()
    },
    openModPwd(row) {
      this.form.userCode = row.code
      this.dialogFormVisible = true
    },
    modPwd() {
      this.$refs['modForm'].validate(valid => {
        if (valid) {
          this.form.password = this.$md5(this.form.password)
          this.$api.users.modPwd(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.msg
              })
            }
            this.form.password = ''
            this.dialogFormVisible = false
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    findUser() {
      this.searchCondition.pageNum = 1
      this.searchCondition.pageSize = 10
      this.find()
    },
    // 加载用户列表
    find: function() {
      this.loading = true
      this.$api.users.list(this.searchCondition).then(response => {
        this.loading = false
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    findRoleData() {
      this.$api.roles.all({ name: '' }).then(res => {
        this.roleData = res.data
      })
    },
    handleCurrentChange: function(val) {
      this.searchCondition.pageNum = val
      this.find()
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val
      this.find()
    },
    resetTree(flag) {
      this.$refs.roleTree.setCheckedKeys(this.roleIds)
    },
    saveTree(flag) {
      if (!this.selectUserId) {
        this.$message({
          type: 'warning',
          message: '请选择人员'
        })
        return
      }
      let checkedNodes = []
      checkedNodes = this.$refs.roleTree.getCheckedNodes(false, true)
      const data = []
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        data.push({ 'roleId': checkedNodes[i].id, 'userId': this.selectUserId })
      }
      this.$api.users.saveUserRole(data).then(res => {
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
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 树节点选择监听
    handleMenuCheckChange(data, check) {
      if (check) {
        // 节点选中时同步选中父节点
        const parentId = data.parentId
        this.$refs.roleTree.setChecked(parentId, true, false)
      } else {
        // 节点取消选中时同步取消选中子节点
        if (data.children != null) {
          data.children.forEach(element => {
            this.$refs.roleTree.setChecked(element.id, false, false)
          })
        }
      }
    },
    userChange(row) {
      const params = { roleId: '', userId: row.id }
      this.selectUserId = row.id
      const loadingInstance = Loading.service({ target: document.getElementById('treediv') })
      this.$api.users.userRole(params).then((res) => {
        if (res.code === 200) {
          this.roleIds = res.data
          this.$refs.roleTree.setCheckedKeys(res.data)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
        loadingInstance.close()
      })
    },
    handleSync() {
      this.$api.users.syncData().then(res => {
        this.$message({
          type: 'success',
          message: '同步完成'
        })
        this.find()
      })
    }
  }
}
</script>

<style>
</style>
