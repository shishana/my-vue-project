<template>
<div class="sort-button">
  <el-button :type="type" :plain="plain" :size="size">
    <div class="text">
      {{text}}
    </div>
    <div class="sort" @click.stop="clickHanle">
      <span :class="{activeTop: flag}"></span>
      <span :class="{activeBottom: !flag}"></span>
    </div>
  </el-button>
</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    plain: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    text: {
      type: String,
      default: '占位按钮'
    }
  },
  data () {
    return {
      flag: true,
      sortType: 'asc'
    }
  },
  methods: {
    clickHanle () {
      this.flag = !this.flag
      // 'asc' 升序， desc 降序
      this.$emit('sortType', this.sortType = this.flag ? 'asc' : 'desc')
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-button{
  display: inline;
  margin-right: 10px;
  .text{
    float: left;
  }
  .sort{
    float: right;
    margin-left: 10px;
    span{
      display: block;
    }
    .activeTop{
      border-bottom: 8px solid #00f1fd !important;
    }
    span:first-child{
      width:0;
      height:0;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      border-bottom: 8px solid #aaa;
      margin-bottom: 2px;
    }
    .activeBottom{
      border-top:8px solid #00f1fd !important;
    }
    span:last-child{
      width:0;
      height:0;
      border-right:8px solid transparent;
      border-left:8px solid transparent;
      border-top:8px solid #aaa;
      margin-top: 2px;
    }
  }
}
</style>

<style lang='scss'>
.sort-button{
  .el-button{
    line-height: 18px;
  }
}
</style>
