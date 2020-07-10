<template>
  <el-radio-group v-model="radio" size="mini" @chang="changHandle">
    <el-radio-button :label="item" v-for="(item, index) in radioList" :key="index"></el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  props: {
    radioList: Array
  },
  data () {
    return {
      radio: '不限'
    }
  },
  methods: {
    changHandle () {
      this.$emit('radioHandle', this.radio)
    },
    emptyRadio () {
      this.radio = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
