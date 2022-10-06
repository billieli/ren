<template>
  <div>
    <el-row type="flex" justify="space-around" align="middle" style="height:40px;width:100%;">
      <el-col>
        <span>{{ treeNode.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex">
          <el-col>
            <span>{{ treeNode.manager }}</span>
          </el-col>
          <el-col>
            <el-dropdown @command="handleCommand">
              <span>
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="isrool" command="edit">编辑子部门</el-dropdown-item>
                <el-dropdown-item v-if="isrool" command="del">删除子部门</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { delDepartments } from '@/api/employess'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isrool: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 新增
        console.log('add')

        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        console.log('edit')
        // 编辑
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then((res) => {
          return delDepartments(this.treeNode.id)
        }).then((res) => {
          this.$emit('reflist')
          this.$message.success('删除成功')
        })
        // console.log('del')
      }
    }
  }
}
</script>

<style>

</style>
