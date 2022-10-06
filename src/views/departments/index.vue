<template>
  <div>
    <div class="departments-container">
      <el-card>
        <tree-node :tree-node="company" :isrool="false" @addDepts="handleAddDept" />
      </el-card>
      <el-tree :data="departs" :default-expand-all="true" :props="defaultProps">
        <treeNode slot-scope="{data}" :tree-node="data" style="width:100%" @reflist="getDepartments" @addDepts="handleAddDept" @editDepts="editDepts" />
      </el-tree>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeNode from './components/tree-tools.vue'
import { tranListToTreeData } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: { treeNode, AddDept },

  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      showDialog: false,
      currentNode: {}
    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      console.log(depts)
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    handleAddDept(node) {
      console.log(111)
      this.showDialog = true
      this.currentNode = { ...node }
    },
    editDepts(node) {
      this.showDialog = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = this.currentNode
    }
  }
}
</script>

<style lang="scss" scoped>

.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 0px;
    }
  }
}
</style>
