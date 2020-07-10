<template>
  <div class="cus-sort" @click="sortChangeClick">
    <span class="title">{{title}}</span>
    <div class="cus-sort-icons">
      <div class="asc" :class="{checked: enable && order === 'asc'}" @click.stop="sortIconClick('asc')"></div>
      <div class="desc" :class="{checked: enable && order === 'desc'}" @click.stop="sortIconClick('desc')"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    propsOrder: {
      default: ''
    },
    enable: {
      default: false // 外部可能有多个排序字段，需要互斥，所以引入enable
    }
  },
  data () {
    return {
      order: ''
    }
  },
  watch: {
    enable (enable) {
      if (!enable) {
        this.order = '' // 多个排序互斥，如果失效，立即初始化order
      }
    }
  },
  methods: {
    sortChangeClick () {
      let order = this.order
      if (!order) {
        order = 'asc'
      } else if (order === 'asc') {
        order = 'desc'
      } else {
        order = ''
      }
      this.order = order
      this.$emit('orderChange', order) // 更新排序规则
    },
    sortIconClick (sort) {
      let order = this.order === sort ? '' : sort
      this.order = order
      this.$emit('orderChange', order) // 更新排序规则
    },
    initOrder (order) {
      this.order = order
    }
  }
}
</script>

<style lang="scss" scoped>
.cus-sort{
  display: inline-block;
  cursor: pointer;
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
  .title{
    float: left;
    margin:0 5px 0 0;
  }
  .cus-sort-icons{
    display: inline-block;
    >div{
      height: 0;
      width: 0;
      border: 6px solid transparent;
    }
    .asc{
      border-top: 3px solid transparent;
      border-bottom-color: #bbb;
      margin-bottom: 2px;
      &.checked{
        border-bottom-color: #5584ff;
      }
    }
    .desc{
      // border-bottom: 0;
      border-top-color: #bbb;
      margin-top: 2px;
      &.checked{
        border-top-color: #5584ff;
      }
    }
  }
}
</style>
