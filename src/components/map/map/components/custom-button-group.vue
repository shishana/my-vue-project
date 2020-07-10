<template>
  <div class="custom-button-group">
    <el-button
      class="btn"
      v-for="(item, index) in options"
      :key="item.value"
      :style="{ 'margin-left': index === 0 ? '0' : gapLength + 'px' }"
      v-bind="$attrs"
      :disabled="item.disabled"
      :type="{ value: item.value + '', context: _self } | typeFilter"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'custom-button-group',
  filters: {
    typeFilter ({ value, context }) {
      if (Object.prototype.toString.call(context.value) === '[object Array]') {
        const _value = context.value.map(item => item + '')
        return _value.indexOf(value) !== -1 ? context.selectedType : 'info'
      } else {
        return context.value + '' === value ? context.selectedType : 'info'
      }
    }
  },
  props: {
    value: { // 值, 用于 v-model
      type: [Number, String, Array]
    },
    options: { // 配置项
      type: Array,
      default: () => [{
        value: 1,
        label: '测试'
      }]
    },
    gapLength: { // 间隔距离
      type: [Number, String],
      default: '16'
    },
    selectedType: { // 选中时的按钮类型
      default: 'primary'
    },
    multiple: {
      type: [Boolean, String],
      default: false,
      validator: value => {
        return ['true', 'false', true, false].indexOf(value) !== -1
      }
    }
  },
  mounted () {
    // 检查 value 的类型, 有问题时抛出错误
    if (this.multipleComputed) {
      if (Object.prototype.toString.call(this.value) !== '[object Array]') {
        throw new Error('Type checked failed! Expect Array, got ' + typeof this.value)
      }
    } else {
      if (typeof this.value !== 'number' && typeof this.value !== 'string') {
        throw new Error('Type check failed! Expect String or Number, got ' + typeof this.value)
      }
    }
  },
  computed: {
    // 真实的 multiple 值
    multipleComputed () {
      if (typeof this.multiple === 'string') { // 字符串
        return this.multiple === 'true'
      } else {
        return this.multiple
      }
    }
  },
  methods: {
    handleClick ({ value, selected }) {
      if (selected) {
        return
      }
      if (this.multipleComputed) {
        const indexOfValue = this.value.indexOf(value)
        if (indexOfValue === -1) { // 无
          this.value.push(value)
        } else { // 有
          this.value.splice(indexOfValue, 1)
        }
        this.$emit('input', this.value)
      } else {
        this.$emit('input', value + '') // 转为字符串
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-button-group{
  .btn:nth-child(4){
    margin-left: 0 !important;
  }
  .el-button--primary{
    background: #468DFF;
    border-color: #468DFF;
    color: #FFFFFF;
  }
  .el-button--primary:hover{
    opacity: .8;
  }
}
</style>
