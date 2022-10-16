<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登录设置" name="first" lazy>
            <el-form ref="form" :model="accountInfo" :rules="rules" label-width="80px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updataEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second" lazy><userInfo /></el-tab-pane>
          <el-tab-pane label="岗位详情" name="third" lazy><jobInfo /></el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDatailById, saveUserDatail } from '@/api/user'
import jobInfo from './job-info.vue'
import userInfo from './user-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    jobInfo,
    userInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      rules: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '长度在 3 到 20个字符', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDatailById(this.$route.params.id)
      this.accountInfo = res
      // console.log(res)
    },
    async updataEmployees() {
      try {
        await this.$refs.form.validate()
        await saveUserDatail(this.accountInfo)
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
