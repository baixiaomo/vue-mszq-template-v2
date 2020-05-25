<!--
  数据权限列表
-->
<template>
  <div class="app-container">
    <div style="margin: 10px 0 10px 0;">
      <el-row>
        <wf-select v-model="searchCondition.entityType" dict-name="entity_type" size="mini" placeholder="请选择实体类型" />
        <wf-select v-model="searchCondition.permissionType" dict-name="source_type" size="mini" placeholder="请选择资源类型" />
        <wf-button size="mini" type="primary" icon="el-icon-search" @click="findData()">查询</wf-button>
        <wf-button size="mini" type="warning" icon="el-icon-search" @click="clear()">清除</wf-button>
        <wf-button size="mini" type="success" icon="el-icon-plus" @click="add">新增</wf-button>
      </el-row>
    </div>
    <div class="table" style="margin-top: 20px">
      <el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column label="ID" prop="id" :min-width="40" />
        <el-table-column label="实体类型" prop="entityType" :min-width="90">
          <template slot-scope="scope">
            <el-tag
              v-for="item in entityRadios"
              v-if="item.value === scope.row.entityType"
              :key="item.value"
            >{{ item.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实体ID" prop="entityKey" :min-width="90" />
        <el-table-column label="实体名称" prop="entityTypeName" :min-width="90" />
        <el-table-column label="资源权限类型" :min-width="90">
          <template slot-scope="scope">
            <el-tag
              v-for="item in sourceRadios"
              v-if="item.value === scope.row.permissionType"
              :key="item.value"
            >{{ item.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="资源ID" prop="permissionKey" :min-width="90" />
        <el-table-column label="资源名称" prop="permissionTypeName" :min-width="90" />
        <el-table-column label="状态" :min-width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">启用</el-tag>
            <el-tag v-else>停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="90">
          <template slot-scope="scope">
            <el-link type="primary" @click="del(scope.row.id)">删除</el-link>
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
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      top="5vh"
      width="55%"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tabs v-model="activityTab01">
            <el-tab-pane label="实体" name="entity">
              <el-radio-group v-model="form.entityType" size="mini">
                <el-radio v-for="entity in entityRadios" :key="entity.value" :label="entity.value">{{ entity.label }}</el-radio>
              </el-radio-group>
              <wf-role-table v-show="form.entityType === '1'" v-model="form.entityKey" style="margin-top: 20px" />
              <wf-user-table v-show="form.entityType === '2'" v-model="form.entityKey" style="margin-top: 20px" />
              <wf-dept-table v-show="form.entityType === '3'" v-model="form.entityKey" style="margin-top: 20px" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <el-tabs v-model="activityTab02">
            <el-tab-pane label="资源" name="source">
              <el-radio-group v-model="form.permissionType" size="mini">
                <el-radio v-for="source in sourceRadios" :key="source.value" :label="source.value">{{ source.label }}</el-radio>
              </el-radio-group>
              <wf-menu-table v-show="form.permissionType === '1'" v-model="form.permissionKey" style="margin-top: 20px" />
              <wf-dept-table v-show="form.permissionType === '2'" v-model="form.permissionKey" style="margin-top: 20px" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submit">提交</el-button>
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import list from '../../../mixins/list'
import WfButton from '@/components/WfButton'
import WfRoleTable from '../../../components/WfRoleTable/index'
import WfUserTable from '../../../components/WfUserTable/index'
import WfDeptTable from '../../../components/WfDeptTable/index'
import WfMenuTable from '../../../components/WfMenuTable/index'
import WfSelect from '../../../components/WfSelect/index'
export default {
  name: 'Data',
  components: { WfButton, WfRoleTable, WfUserTable, WfDeptTable, WfMenuTable, WfSelect },
  mixins: [list],
  data() {
    return {
      searchCondition: {
        entityType: '',
        permissionType: ''
      },
      form: {
        id: '',
        entityType: '1',
        entityKey: '',
        permissionType: '1',
        permissionKey: ''
      },
      title: '新增',
      dialogVisible: false,
      data: [],
      activityTab01: 'entity',
      activityTab02: 'source',
      entityRadios: [],
      sourceRadios: []
    }
  },
  created() {
    this.$api.dict.items('entity_type').then(res => {
      this.entityRadios = res.data
    })
    this.$api.dict.items('source_type').then(res => {
      this.sourceRadios = res.data
    })
    this.findData()
  },
  methods: {
    clear() {
      this.searchCondition.permissionType = ''
      this.searchCondition.entityType = ''
    },
    findData() { // 父组件需要重写数据加载方法
      this.loading = true
      this.$api.dataManager.list(this.searchCondition).then(response => {
        this.data = response.data.records
        this.total = response.data.total
        this.loading = false
      })
    },
    del(id) {
      this.$confirm('此操作将删除该数据权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.dataManager.del(id).then(res => {
          if (res.code === 200) {
            this.$message({ type: 'success', message: '删除成功' })
            this.refresh()
          } else {
            this.$message({ type: 'error', message: '删除失败' })
            this.refresh()
          }
        })
      }).catch(() => {})
    },
    add() {
      this.dialogVisible = true
      this.form.entityType = '1'
      this.form.entityKey = ''
      this.form.permissionType = '1'
      this.form.permissionKey = ''
    },
    submit() {
      console.log(this.form)
      this.$api.dataManager.submit(this.form).then(res => {
        if (res.code === 200) {
          this.$message({ type: 'success', message: '提交成功' })
        }
        this.refresh()
        this.dialogVisible = false
      }).catch(err => {
        console.log(err)
        this.$message({ type: 'error', message: '提交失败' })
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
