<!--suppress ALL -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="filter-container" style="margin: 10px 0 10px 0;">
          <wf-button size="mini" type="primary" icon="el-icon-refresh" @click="handleFind">刷新</wf-button>
          <wf-button perms="sys:menu:add" size="mini" type="primary" icon="el-icon-plus" @click="handleAdd">添加</wf-button>
          <span style="margin-left: 10px;">
            <el-tag>{{ defaultExpandAll ? '折叠' : '展开' }}</el-tag>
            <el-switch
              v-model="defaultExpandAll"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </span>

        </div>
        <!--表格树内容栏-->
        <tree-table
          :key="key"
          :default-expand-all="defaultExpandAll"
          :data="tableTreeData"
          :columns="columns"
          size="small"
          highlight-current-row
          :style="{height:treeHeight,overflow:'auto'}"
          @current-change="menuChange"
        >
          <template slot="icon" slot-scope="{scope}">
            <span :class="scope.row.icon" />
          </template>
          <template slot="type" slot-scope="{scope}">
            <el-tag v-if="scope.row.type === 1 || scope.row.type === 0" size="small">菜单</el-tag>
            <el-tag v-else-if="scope.row.type === 2" size="small" type="success">按钮</el-tag>
            <el-tag v-else-if="scope.row.type === 3" size="small" type="warning">页面要素</el-tag>
          </template>
          <template slot="hidden" slot-scope="{scope}">
            <el-tag v-if="scope.row.hidden" size="small" type="warning">隐藏</el-tag>
            <el-tag v-else size="small" type="success">显示</el-tag>
          </template>
          <template slot="operation" slot-scope="{scope}">
            <div style="width: 100px;">
              <wf-button perms="sys:menu:update" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
              <wf-button perms="sys:menu:delete" type="danger" size="mini" icon="el-icon-delete" circle @click="handleDelete(scope.row)" />
            </div>
          </template>
        </tree-table>
      </el-col>
      <el-col :span="6">
        <el-input v-model="roleFilter" prefix-icon="el-icon-search" placeholder="输入菜单名称" size="mini" style="width:50%;margin-bottom: 20px" />
        <span style="display: inline-block;float:right">
          <el-button type="info" size="mini" @click="resetTree(0)">重置</el-button>
          <wf-button perms="sys:menu:perm" size="mini" type="primary" @click="saveTree(0)">授权</wf-button>
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
    <!-- 查询和其他操作 -->

    <!-- 新增修改界面 -->
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      width="40%"
      center
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        label-width="120px"
        :size="size"
        style="text-align:left;"
      >
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="dataForm.type">
            <el-radio v-for="(type, index) in menuTypeList" :key="index" :label="index+1">{{ type }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--<el-form-item v-if="dataForm.type === 1" label="菜单图标">
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="dataForm.icon" placeholder="点击选择图标" readonly>
              <svg-icon
                v-if="dataForm.icon"
                slot="prefix"
                :icon-class="dataForm.icon"
                class="el-input__icon"
                style="height: 32px;width: 16px;"
              />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>-->
        <el-form-item v-if="dataForm.type === 1" label="菜单图标">
          <el-input v-model="dataForm.icon" placeholder="请录入fontawesome图标，如：fa fa-tachometer" />
        </el-form-item>
        <el-form-item :label="menuTypeList[dataForm.type-1] + '名称'" prop="name">
          <el-input v-model="dataForm.name" :placeholder="menuTypeList[dataForm.type-1] + '名称'" />
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentName">
          <!--<popup-tree-input
            :data="popupTreeData"
            :props="popupTreeProps"
            :prop="dataForm.parentName == null||dataForm.parentName === ''?'根节点':dataForm.parentName"
             node-key="id"
            :current-change-handle="handleTreeSelectChange"
          />-->
          <wf-input-tree v-model="dataForm.parentId" :data="popupTreeData" @change="handleTreeSelectChange" />
        </el-form-item>
        <el-form-item v-if="" :label="dataForm.type === 2 ? '授权标识' : 'URL'" prop="permission">
          <el-input v-model="dataForm.permission" :placeholder="dataForm.type === 2 ? '如: sys:user:add' : '部门URL:/sys/dept'" />
        </el-form-item>
        <el-form-item v-if="dataForm.type === 1 && dataForm.frame" label="路由组件" prop="component">
          <el-row>
            <el-col :span="22">
              <el-input v-model="dataForm.component" placeholder="路由组件" :readonly="false" />
            </el-col>
            <el-col :span="2" class="icon-list__tips">
              <el-tooltip placement="top" effect="light" style="padding: 10px;">
                <div slot="content">
                  <p>URL格式：</p>
                  <p>1.常规业务开发的功能URL，如用户管理，Views目录下页面路径为 @view/sys/user, 此处填写 sys/user。</p>
                  <p>2.嵌套外部网页，如通过菜单打开百度网页，此处填写 http://www.baidu.com，http:// 不可省略。</p>
                  <p>示例：用户管理：/sys/user 嵌套百度：http://www.baidu.com 嵌套网页：http://127.0.0.1:8000</p></div>
                <i class="el-icon-warning" />
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="dataForm.type === 1" label="路由Path" prop="path">
          <el-input v-model="dataForm.path" :placeholder="menuTypeList[dataForm.type-1]+'URL'" />
        </el-form-item>
        <el-form-item v-if="dataForm.type === 1" label="内部菜单" prop="frame">
          <el-switch v-model="dataForm.frame" />
        </el-form-item>
        <el-form-item label="启用状态">
          <el-switch v-model="dataForm.enable" />
        </el-form-item>
        <el-form-item v-if="dataForm.type === 1" label="隐藏状态">
          <el-switch v-model="dataForm.hidden" />
        </el-form-item>

        <el-form-item v-if="dataForm.type === 1" label="排序编号" prop="sort">
          <el-input-number
            v-model="dataForm.sort"
            controls-position="right"
            :min="0"
            label="排序编号"
          />
        </el-form-item>
        <el-form-item label="菜单级别">
          <el-input-number
            v-model="dataForm.level"
            controls-position="right"
            :min="0"
            label="菜单级别"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import PopupTreeInput from '@/components/PopupTreeInput'
import treeTable from '@/components/TreeTable'
import WfInputTree from '@/components/WfInputTree'
import WfButton from '../../../components/WfButton/index'
import WfLinkButton from '@/components/WfLinkButton'
import { formatData, getPar } from '@/utils/webUtils'
import { Loading } from 'element-ui'

export default {
  components: { PopupTreeInput, treeTable, WfInputTree, WfButton, WfLinkButton },
  data() {
    return {
      size: 'small',
      treeHeight: '',
      roleFilter: '',
      selectMenuId: '',
      readonly: true,
      pageNum: 0,
      pageSize: 10,
      formLabelWidth: '120px',
      isEditForm: false,
      loading: false,
      dialogVisible: false, // 控制弹出框
      menuTypeList: ['菜单', '按钮', '页面要素'],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataForm: {
        id: 0,
        type: 1,
        title: '',
        name: '',
        parentId: 22,
        component: '',
        frame: 'true',
        parentName: '',
        path: '',
        level: 0,
        permission: '',
        sort: 0,
        icon: '',
        hidden: false,
        enable: true,
        remark: ''
      },
      tableTreeData: [],
      // 表单校验
      dataRule: {
        name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        path: [{ required: true, message: 'URL不能为空', trigger: 'blur' }],
        component: [{ required: true, message: '路由组件不能为空', trigger: 'blur' }]
      },

      popupTreeData: [],
      popupTreeProps: {
        label: 'name',
        children: 'children'
      },
      roleData: [],
      key: 1,
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
        },
        {
          label: '隐藏',
          key: 'hidden',
          minWidth: 80
        },
        {
          label: '上级菜单',
          key: 'parentId',
          align: 'center',
          minWidth: 80
        },
        {
          label: '菜单级别',
          key: 'level',
          align: 'center',
          minWidth: 50
        },
        {
          label: '授权标识',
          key: 'permission',
          align: 'center'
        },
        {
          label: '排序',
          key: 'sort',
          align: 'center',
          minWidth: 50
        },
        {
          label: '操作',
          key: 'operation',
          fixed: 'right'
        }
      ],
      defaultExpandAll: true

    }
  },
  watch: {
    roleFilter(val) {
      this.$refs.roleTree.filter(val)
    }
  },
  created() {
    this.findTreeData()
    this.findRoleData()
  },

  methods: {
    selected(name) {
      this.dataForm.icon = name
    },
    getTreeHeight() {
      this.$nextTick(() => {
        const deviceHeight = document.documentElement.clientHeight
        this.treeHeight = (deviceHeight - 200) + 'px'
        console.log('treeHeight', this.treeHeight)
      })
    },
    // 获取数据
    findTreeData: function() {
      this.loading = true
      const params = {
        'name': ''
      }
      this.$api.menus.all(params).then(res => {
        this.tableTreeData = res.data
        this.popupTreeData = this.getParentMenuTree(res.data)
        this.loading = false
        this.getTreeHeight()
      })
    },
    // 获取上级菜单树
    getParentMenuTree: function(tableTreeDdata) {
      const parent = {
        id: 1,
        name: '根节点',
        children: tableTreeDdata
      }
      return [parent]
    },

    handleFind: function() {
      this.findTreeData()
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogVisible = true
      this.isEditForm = false
      this.dataForm = {
        id: '',
        type: 1,
        name: '',
        parentId: 22,
        component: 'Layout',
        frame: true,
        parentName: '',
        path: '',
        level: 0,
        permission: '',
        hidden: false,
        enable: true,
        sort: 0,
        icon: ''
      }
    },
    // 显示编辑页面
    handleEdit: function(row) {
      this.isEditForm = true
      this.dialogVisible = true
      const { id, type, name, parentId, parentName, frame, component, path, permission, sort, icon, level, enabled, hidden } = row
      this.dataForm.id = id
      this.dataForm.type = type
      this.dataForm.name = name
      this.dataForm.parentId = parentId
      this.dataForm.component = component
      this.dataForm.parentName = parentName
      this.dataForm.frame = frame
      this.dataForm.path = path
      this.dataForm.permission = permission
      this.dataForm.sort = sort
      this.dataForm.icon = icon
      this.dataForm.level = level
      this.dataForm.hidden = hidden
      this.dataForm.enabled = enabled
    },
    // 菜单树选中
    handleTreeSelectChange(data) {
      console.log(data, this.dataForm.parentId)
      // this.dataForm.parentId = data.id
      if (!data.id || data.id === 1) {
        this.dataForm.component = 'Layout'
        this.readonly = true
      } else {
        this.dataForm.component = ''
        this.readonly = false
      }
      // this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
    },

    // 删除操作
    handleDelete: function(row) {
      const that = this
      this.$confirm('此操作将把分类删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.menus.del(row.id).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              that.findTreeData()
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

    // 新增修改操作
    submitForm: function() {
      this.dataForm.title = this.dataForm.name
      if (!this.isEditForm) {
        this.$api.menus.save(this.dataForm).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogVisible = false
            this.findTreeData()
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
      } else {
        this.$api.menus.update(this.dataForm).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogVisible = false
            this.findTreeData()
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
      }
    },
    resetTree(flag) {
      this.$refs.roleTree.setCheckedKeys(this.roleIds)
    },
    saveTree(flag) {
      if (!this.selectMenuId) {
        this.$message({
          type: 'warning',
          message: '请选择菜单'
        })
        return
      }
      let checkedNodes = []
      checkedNodes = this.$refs.roleTree.getCheckedNodes(false, true)
      const data = []
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        data.push({ 'roleId': checkedNodes[i].id, 'menuId': this.selectMenuId })
      }
      this.$api.menus.saveMenuRole(data).then(res => {
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
    menuChange(row) {
      if (!row) return
      const params = { roleId: '', menuId: row.id }
      this.selectMenuId = row.id
      const loadingInstance = Loading.service({ target: document.getElementById('treediv') })
      this.$api.roles.getRoleMenu(params).then((res) => {
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
    findRoleData() {
      this.$api.roles.all({ name: '' }).then(res => {
        this.roleData = res.data
      })
    }
  }
}
</script>
