<template>
  <div id="page-header">
    <div class="title">
      <span>{{title}}</span>
      <slot name="filter"></slot>
    </div>
    <slot></slot>
    <el-button class="create-btn" size="mini" type="primary" @click="create()">{{button}}</el-button>
    <div class="seprator"></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'button'],
  data () {
    return {
    }
  },
  methods: {
    create () {
      this.$emit('create')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#page-header{
  height: 100%;
  padding: 15px 20px 0 20px;
  margin: 10px;
  background: $primary-bg-inverse-color;
  text-align: left;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  .title{
    line-height: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .create-btn{
    position: absolute;
    right: 20px;
    top: 75px;
  }
  .seprator{
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: $secondary-bg-color;
    // opacity: 0.3;
    float: left;
    // margin-top: 20px;
  }
}
</style>
