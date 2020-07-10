<template>
  <el-autocomplete
    id="custom-search"
    size="mini"
    v-model="inputS"
    :placeholder="placeholder"
    clearable
    @select="handleSearchSelect"
    @clear="clearInput"
    ref="searchInput"
    :debounce="300"
    :select-when-unmatched="true"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    type="text"
    :maxlength="maxlength"
    :show-word-limit="true"
    @keyup.enter.native="inputConfirmed"
    @blur="blurHandle"
    @change="blurHandle"
  >
    <el-button slot="append" icon="el-icon-search" @click="inputConfirmed"></el-button>
  </el-autocomplete>
</template>

<script>
export default {
  props: {
    placeholder: {
      default: '',
      type: String
    },
    maxlength: {
      default: 20,
      type: Number
    }
  },
  data () {
    return {
      inputS: ''
    }
  },
  methods: {
    querySearch (queryStr, cb) {
      // eslint-disable-next-line
      cb([])
    },
    handleSearchSelect () {
    },
    clearInput () {
      this.inputS = ''
      this.$emit('inputConfirm', this.inputS)
    },
    inputConfirmed () {
      if (this.isInputTrim(this.inputS)) {
        return
      }
      this.$emit('inputConfirm', this.inputS.trim())
    },
    isInputTrim (val) { // 输入框去空
      if (val && !val.trim()) {
        this.inputS = ''
        this.$msgMnger.warn('查询关键词不能全部由空格组成')
        return true
      }
      return false
    },
    blurHandle () {
      if (!this.inputS) {
        this.clearInput()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#custom-search{
}
</style>
<style lang="scss">
#custom-search{
}
</style>
