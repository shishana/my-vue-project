<template>
  <div id="popover-des">
    <el-popover
      placement="bottom-end"
      width="800"
      v-model="visible"
      trigger="hover"
    >
      <img class="legend-img" width="740px" src="@/assets/excel-des.png" alt="">
      <el-button slot="reference" icon="el-icon-info" type="text" size="mini" plain>文件示例</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
#popover-des{
  display: inline-block;
  cursor: text;
  .el-button--text{
    border-color: transparent;
    color: $tertiary-text-color;
    font-weight: normal;
    font-family: 'PingFangSC-light';
      &:hover{
      color: $primary-color;
    }
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
.el-popover{
  .legend-img{
    margin: 30px 30px 20px 30px;
  }
}
</style>
