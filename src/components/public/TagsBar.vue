<template>
  <div id="tags-bar">
    <el-tag
      size="mini"
      :key="index"
      v-for="(tag,index) in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-autocomplete
      class="input-new-tag"
      popper-class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      type="text"
      :maxlength="10"
      :show-word-limit="true"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
    >
    </el-autocomplete>
    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新建</el-button>
  </div>
</template>

<script>
export default {
  name: 'CustomCB',
  components: {
  },
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      alertVisible: false
    }
  },
  watch: {
    inputValue (val) {
      this.alertVisible = val.length >= 10
    }
  },
  mounted () {
  },
  methods: {
    testDeleteTags () {
      for (let k = 7; k < 10; k++) {
        this.$api.deleteTag(k)
      }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let _input = this.inputValue
      if (_input) {
        if (!_input.trim()) {
          this.$msgMnger.warn('标签不允许全部由空格组成')
        } else if (this.dynamicTags.indexOf(_input) > -1) {
          this.$msgMnger.warn('标签不允许重复')
        } else {
          this.dynamicTags.push(_input)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handChecked () {
      this.$emit('checkedChange', this.dynamicTags)
    },
    updateTags (tags) {
      this.dynamicTags = JSON.parse(JSON.stringify(tags))
    },
    querySearch (query, cb) {
      if (query.trim().length === 0) {
        cb(null)
      }
      let res = this.$store.state.tags.tags
      let list = []
      res.forEach((el, id) => {
        if (el.indexOf(query) > -1) {
          list.push({
            id: id,
            value: el
          })
        }
      })
      cb(list)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#tags-bar{
  // .el-tag + .el-tag {
  .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 20px;
    line-height: 18px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
#tags-bar{
  display: inline-block;
  .el-tag{
    line-height: 18px !important;
    margin-bottom: 5px !important;
  }
  .input-new-tag {
    margin-bottom: 5px !important;
    .el-autocomplete-suggestion__wrap .el-scrollbar__wrap{
      margin-bottom: 0 !important;
      padding: 5px 0 !important;
    }
    .el-input__inner{
      height: 21px !important;
      padding: 0 10px;
      padding-right: 45px;
    }
  }
}
.input-new-tag.el-autocomplete-suggestion.el-popper .el-autocomplete-suggestion__wrap {
  margin-bottom: 0 !important;
  padding: 5px 0 !important;
}
</style>
