<template>
  <div id="custom-radio">
    <el-radio-group v-model="radio" :size="size" @change="handleChange">
      <el-radio-button :label="item" v-for="(item,index) in options" :key="index"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: ['size', 'value', 'options'],
  data () {
    return {
      radio: ''
    }
  },
  mounted () {
    this.radio = this.value
  },
  watch: {
    value (val) {
      this.radio = val
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('radioChange', val)
    }
  }
}
</script>

<style lang="scss">
#custom-radio{
  padding: 0 20px;
  .el-radio-group{
    .el-radio-button__inner{
      padding: 5px 10px;
      font-family: 'PingFangSC-regular';
    }
  }
}
</style>
