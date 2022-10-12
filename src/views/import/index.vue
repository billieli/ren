<template>
  <div>
    <UploadExcel :on-success="updata" />

  </div>
</template>

<script>
import { importEmployee } from '@/api/employess'
export default {
  methods: {
    async updata({ header, results }) {
      console.log(header)
      console.log(results)

      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userinfo = {}
        console.log(Object.keys(item))
        Object.keys(item).forEach(key => {
          // key 中文
          // userRelations[key] 英文
          // userinfo.timeOfEntry
          // key 对应的值 item[key]
          // item[key]是results里每一项的值
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      console.log(arr)
      await importEmployee(arr)
      this.$message.success('导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
