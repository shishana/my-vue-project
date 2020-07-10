<template>
  <div id="custom-file-upload">
    <el-upload
      class="custom-upload"
      ref="upload"
      :action="uploadFileApi"
      :name="name"
      :headers="headers"
      :on-change="onChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :show-file-list="true"
      :multiple="multiple"
      :auto-upload="autoUpload"
      :limit="limit"
      :accept="accept"
      >
      <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
      <popover-des class="popover-des" v-if="showPopover"/>
      <div slot="tip" class="el-upload__tip">{{supportType}}</div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PopoverDes from '@/components/public/PopoverDes.vue'
export default {
  props: {
    uploadFileApi: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 200
    },
    accept: {
      type: String,
      default: 'mage/jpeg,image/gif,image/png'
    },
    showPopover: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PopoverDes
  },
  data () {
    return {
      fileList: [],
      fileArray: [],
      headers: {},
      supportType: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  watch: {
    token (val) {
      this.updateHead()
    },
    name (val) {
      this.configSupportType(val)
    }
  },
  mounted () {
    this.updateHead()
    this.configSupportType(this.name)
  },
  methods: {
    configSupportType (val) {
      if (val === 'excel') {
        this.supportType = '支持EXCEL文件类型，限每次上传1个文件'
      } else if (val === 'doc') {
        this.supportType = '支持WORD文件类型'
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    clearFiles () {
      this.$refs.upload.clearFiles()
      this.fileArray = []
    },
    updateHead () {
      let _token = this.$store.getters.token
      if (_token !== '') {
        this.headers = { 'Authorization': 'Bearer ' + _token }
      }
    },
    handleSuccess (res, file, fileList) {
      this.loading = false
      if (res.code !== 0) {
        this.$msgMnger.httpError(res)
        this.clearFiles()
        return
      }
      this.clearFiles()
      if (this.name === 'excel') {
        this.$emit('uploadExcel', res.data)
      } else if (this.name === 'doc') {
        this.$emit('uploadDoc', res.data)
      }
    },
    handleError (err, file, fileList) {
      this.loading = false
      let _err = err.message ? err : { message: 'Network Error' }
      this.$msgMnger.httpError(_err)
      this.clearFiles()
    },
    checkType (file) {
      if (this.name === 'excel') {
        return ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].indexOf(file.type) > -1
      } else if (this.name === 'doc') {
        return ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].indexOf(file.type) > -1
      } else {
        return false
      }
    },
    beforeUpload (file) {
      const isLt20M = file.size / 1024 / 1024 <= 20
      if (!this.checkType(file)) {
        this.$msgMnger.warn('不允许的文件类型!')
        return false
      }
      if (!isLt20M) {
        this.$msgMnger.warn('上传文件大小不能超过 20MB!')
        return false
      }
      this.loading = true
      return true
    },
    beforeRemove (file, fileList) {
      this.fileArray.forEach((el, index) => {
        if (el.uid === file.uid) {
          this.fileArray.splice(index, 1)
        }
      })
    },
    onChange (file, fileList) {
      this.fileArray = []
      fileList.forEach(item => {
        this.fileArray.push(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
#custom-file-upload{
  padding: 0 20px;
  text-align: left;
  .custom-upload{
    .popover-des{
      margin-left: 30px;
    }
  }
  .el-upload__tip{
    color: $tertiary-text-color;
    font-weight: normal;
    font-family: 'PingFangSC-light';
  }
}
</style>
<style lang="scss" scoped>
@import '@/styles/index.scss';
#custom-file-upload{
  .custom-upload{
    .el-button{
      padding: 5px 10px;
    }
  }
}
</style>
