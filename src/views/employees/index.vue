<template>
  <div>
    <div class="app-container">
      <PageTools>
        <template #before>
          <span>共166条记录</span>
        </template>
        <template #after>
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" sortable="" width="80" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{row}">
              {{ row.timeOfEntry| formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" />
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout=" prev ,pager, next,sizes "
            :total="total"
            :current-page.sync="page.page"
            :page-size.sync="page.size"
            :page-sizes="[2,4,6,8,10]"
            @current-change="getList"
            @size-change="getList"
          /></el-row>
      </el-card>
      <addEmployee :dialoy-vsible.sync="dialoyVsible" />
    </div>

  </div>
</template>

<script>
import { delEmployee } from '@/api/employess'
import EnumHireType from '@/api/constant/employees'
import { getEmployeeList } from '@/api/employess'
import addEmployee from './components/add-employee.vue'
// import { reverse } from 'mock/user'
export default {
  name: 'HrsaasIndex',
  components: {
    addEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialoyVsible: false

    }
  },
  mounted() {
    this.getList()
    // console.log(this.hireType)
  },

  methods: {
    async getList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellvalue) {
      const res = this.hireType.find(item => item.id === +cellvalue)
      // console.log('res', res)
      // return res && res.value || ''
      return res ? res.value : '非正式'
    },
    handleEmploy() {
      this.dialoyVsible = true
    }, async del(id) {
      try {
        await this.$confirm('确认删除吗', '提示')
        await delEmployee(id)
        this.getList()
        this.$message.success('删除员工成功')
      } catch (e) {
        console.log(e)
      }
    },
    async exportExcel() {
      // console.log('打印')
      const { export_json_to_excel } = await import ('@/vendor/Export2Excel')
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      // console.log(rows)
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)
      console.log(header)
      const data = rows.map(item => {
        return header.map(x => {
          if (x === '聘用形式') {
            console.log('聘用形式')
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapPath[x]]
            })
            console.log(find)
            return find ? find.value : '未知'
          }
          // exportExcelMapPath[x] // 取出映射关系里的英文名
          return item[exportExcelMapPath[x]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: 'excel-list', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
      console.log(data)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
