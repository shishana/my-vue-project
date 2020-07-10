<template>
  <div id="empty-list">
    <i class="iconfont icon-ba-search"></i>
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '未查询到报告'
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#empty-list{
  padding-top: 10%;
  color: $tertiary-text-color;
  text-align: center;
  i{
    font-size: 20px;
  }
  div{
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
