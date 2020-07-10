<template>
  <el-alert id="custom-alert" :style="getStyle()" v-if="alertVisible"
    :title="`最多可输入${maxlength}个字符`"
    :type="type"
    show-icon
    :closable="false">
  </el-alert>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 30
    },
    marginleft: {
      type: String,
      default: '10px'
    },
    type: {
      type: String,
      default: 'warning'
    }
  },
  data () {
    return {
      alertVisible: false
    }
  },
  watch: {
    input (val) {
      this.alertVisible = val.length >= this.maxlength
    }
  },
  methods: {
    getStyle () {
      return { 'margin-left': this.marginleft }
    }
  }
}
</script>

<style lang="scss">
#custom-alert.el-alert{
  margin-top: 2px !important;
  padding: 3px 12px !important;
  width: 180px !important;
  .el-alert__icon{
    font-size: 14px !important;
  }
  .el-alert__content{
    .el-alert__title{
      font-size: 12px !important;
      font-weight: 200 !important;
    }
  }
}
</style>
