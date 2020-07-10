<template>
  <div id="search-filter">
    <div class="search">
      <el-input v-model="input" :clearable="true" show-word-limit :placeholder="placeholder" maxlength="100" size="mini" class="input" @keyup.enter.native="search" @clear="search"></el-input>
      <span></span>
      <el-radio-group v-model="radio">
        <el-radio v-for="(item, index) in radioOptions" :key="index" :label="item.label" class="radio">{{item.title}}</el-radio>
      </el-radio-group>
      <el-button size="mini" type="primary" @click="search" class="btn">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {},
  props: {
    placeholder: {
      default: '请输入内容'
    },
    radioOptions: {
      default: () => [
        {
          title: '标题',
          label: '1'
        },
        {
          title: '全文',
          label: '2'
        }
      ]
    }
  },
  data () {
    return {
      input: '',
      radio: '1'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 政策咨询点击更多跳转到新法速递，并自动搜索关键字，搜索方式为全文搜索
    if (this.$route.query.keywords) {
      this.input = this.$route.query.keywords
      this.radio = this.$route.query.search_type
    }
    this.search()
  },
  activated () {},
  beforeDestroy () {},
  methods: {
    search () {
      var _filter = {}
      if (this.input) {
        _filter.input = this.input
      }
      if (this.radio) {
        _filter.radio = Number(this.radio)
      }
      this.$emit('search', _filter)
    }
  }
}
</script>

<style lang="scss" scoped>
#search-filter {
  .search {
    height: 40px;
    border-radius:4px;
    border:1px solid rgba(217,217,217,1);
    span{
      display: inline-block;
      width:2px;
      height:20px;
      background: #E8E8E8;
      vertical-align: middle;
      margin-right: 10px;
    }
    .input {
      width: 279px;
      height: 40px;
      padding-right: 50px;
    }
    .radio{
      margin-right: 0;
      vertical-align: middle;
    }
    .radio:first-of-type{
      margin-right: 14px;
    }
    .btn{
      width:70px;
      height:42px;
      background:rgba(48,128,254,1);
      border-radius:0 4px 4px 0;
      float: right;
      margin-top: -1px;
    }
  }
}
</style>
<style lang="scss">
#search-filter {
  .el-input__inner{
    height: 40px;
    border: none;
  }
}
</style>
