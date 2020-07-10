<template>
  <el-row id="custom-multi-select">
    <el-select
      v-model="value"
      :multiple="multiple"
      :placeholder="ph"
      size="mini"
      @change="onChange">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item">
      </el-option>
    </el-select>
  </el-row>
</template>

<script>
export default {
  props: ['options', 'ph', 'multiple', 'type'],
  data () {
    return {
      label: [],
      value: ''
    }
  },
  methods: {
    onChange (value) {
      console.log(value, 'select')
      this.$emit('selectEvent', { type: this.type, item: value })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#custom-multi-select{
  padding: 0 20px;
  overflow: hidden;
  width: 100%;
  .el-select{
    width: 100%;
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
#custom-multi-select{
  .el-select{
    .el-input .el-input__inner{
      height: 24px;
      line-height: 24px;
    }
    .el-input__suffix{
      .el-input__icon{
        height: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>
