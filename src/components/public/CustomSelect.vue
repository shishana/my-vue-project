<template>
  <el-row id="data-select">
    <div class="left" :span="4">
      <div class="title">{{ title }}：</div>
    </div>
    <div class="right" :span="18" :offset="title ? 0 : 3">
      <el-select
        v-model="value"
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
    </div>
  </el-row>
</template>

<script>
export default {
  props: ['options', 'ph', 'type', 'title'],
  data () {
    return {
      label: '',
      value: ''
    }
  },
  methods: {
    onChange (value) {
      // console.log(index, 'select')
      this.$emit('selectEvent', { type: this.type, item: value })
    },
    selectByCmd (val) {
      this.value = val
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#data-select{
  padding: 10px 20px 0 20px;
  overflow: hidden;
  width: 100%;
  .left{
    display: inline-block;
    width: 68px;
    float: left;
  }
  .right{
    display: inline-block;
    width: calc(100% - 68px);
    float: left;
  }
  .el-select{
    width: 100% !important;
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
.title {
  font-size: 13px;
  line-height: 28px;
}
.el-select-dropdown__wrap{
  margin-bottom: 0px !important;
}
.el-select-dropdown{
  .el-select-dropdown__item{
    font-size: 12px !important;
  }
}
</style>
