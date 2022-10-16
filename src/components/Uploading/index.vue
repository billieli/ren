<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :on-preview="onpreview"
      :on-remove="onremove"
      :file-list="filelist"
      :on-change="onchange"
      :http-request="httprequest"
      :before-upload="beforeupload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >

      <img style="width:100%" :src="imgurl" alt="">

    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDvlU1QWWXYMvHRSKzWuKequkXGyeGsSxT',
  SecretKey: 'PlxyLUYZS8bprjQsAHEzbZLH0XxDOVaa'
})
// console.log(cos)
export default {
  name: 'Uploading',
  props: {
    defulimg: {
      type: String,
      default: '#'
    }
  },
  data() {
    return {
      filelist: [],
      dialogVisible: false,
      imgurl: '',
      loading: false
    }
  },
  watch: {
    defulimg() {
      this.filelist.push({ name: 'deful', url: this.defulimg })
    }

  },
  methods: {
    onpreview(file) {
      this.dialogVisible = true
      this.imgurl = file.url
      // console.log('预览')
    },
    onremove(file, filelist) {
      this.filelist = filelist
    },
    onchange(file, filelist) {
      this.filelist = filelist
    //   console.log(file)
    },
    httprequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'billie-1314348520', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // console.log(err || data);

        this.loading = false

        if (err) return this.$message.info('上传失败')
        if (data) {
          const url = 'http://' + data.Location
          // console.log(url);
          this.$emit('success', url)
        }
      })
    },
    beforeupload(file) {
      // console.log(file)

      const type = ['image/png', 'image/jpeg']
      const ishas = type.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + type.join(',') + '类形图片')
        return false
      }
      const maxSize = 100 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片过大')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.uploadImg{
  width: 148px;
  height: 148px;
  overflow: hidden;

}

</style>
