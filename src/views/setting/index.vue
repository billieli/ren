<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理111" name="first">
          <el-row :gutter="10">
            <el-button type="primary" style="margin-left:10px" size="small" @click="addRole">
              <span class="el-icon-plus" />
              新增角色</el-button>
          </el-row>
          <el-table
            v-loading="loading"
            style="width: 100%"
            :data="roleList"
          >
            <el-table-column
              type="index"
              label="序号"
              width="120"
            />
            <el-table-column
              prop="name"
              label="角色名称"
              width="240"
            />
            <el-table-column
              prop="description"
              label="描述"
            />
            <el-table-column
              label="操作"
              type="flex"
              justify="end"
            >
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination
              v-if="total > 0"
              background
              layout="prev, pager, next ,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[10,20,30]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            :closable="false"
          />
          <el-form :model="companyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <add-role ref="addRole" :dialog-visible.sync="dialogVisible" :refresh-list="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import AddRole from './comoonents/AddRole.vue'
export default {
  components: { AddRole },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      }, companyInfo: {

      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false
    }
  },
  created() {
    this.getRoleList()
    this.CompanyInfo(this.$store.getters.companyId)
  },
  methods: {
    async  getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      this.dialogVisible = true
    },
    // 绑定点击事件，拿到当前这条数据，回显再新增角色的组件上
    editRole(row) {
      // row 是引用类型。地址是一样的，不可以直接赋值，会改变原数据，需拷贝
      this.$refs.addRole.formDate = { ...row }
      this.dialogVisible = true
    },
    delRole(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        if (this.total > 0 && this.roleList === []) {
          this.page.page--
          this.getRoleList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async CompanyInfo(id) {
      this.companyInfo = await getCompanyInfo(id)
    }
  }
}
</script>

<style>

</style>
