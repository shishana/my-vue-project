<template>
  <div id="custom-input">
    <span class="title" v-if="title">{{title}}</span>
    <el-autocomplete
      ref="searchInput"
      class="custom-search-input"
      :placeholder="placeholder"
      v-model="inputS"
      :fetch-suggestions="queryAsync"
      size="mini"
      clearable
      @clear="handleClear"
      @select="handleSelect"
      :select-when-unmatched="true"
      popper-class="custom-search-input-popper"
      type="text"
      :maxlength="40"
      :show-word-limit="true"
    >
      <el-button slot="append" icon="el-icon-search" @click="inputConfirmed"></el-button>
    </el-autocomplete>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['title', 'placeholder', 'interfaceName'],
  data () {
    return {
      inputS: '',
      isDelete: false
    }
  },
  methods: {
    handleClear () {
      // console.log('.. clear')
      this.$emit('inputConfirm', '')
    },
    dynamicBtn () {
      let _this = this
      this.$nextTick(() => {
        $('.custom-search-input-popper.el-autocomplete-suggestion.el-popper .el-autocomplete-suggestion__wrap li').append('<i class="el-icon-circle-close" @click="deleteEvent()"></i>')
        $('.custom-search-input-popper.el-autocomplete-suggestion.el-popper .el-autocomplete-suggestion__wrap li i').on('click', function () {
          _this.isDelete = true
        })
      })
    },
    queryAsync (queryStr, cb) {
      if (!queryStr) { // 输入为空时请求搜索历史
        this.historySearch().then(data => {
          let sugs = []
          data.forEach(element => {
            if (element.keyword && !element.keyword.trim()) {
              // this.deleteSearch(element.id)
            } else {
              let item = { value: element.name, id: element.id }
              sugs.push(item)
            }
          })
          setTimeout(() => {
            cb(sugs)
            this.dynamicBtn()
          }, 300)
        }).catch(err => {
          this.$msgMnger.httpError(err)
          // eslint-disable-next-line
          cb([])
        })
      } else {
        // eslint-disable-next-line
        cb([])
      }
    },
    historySearch () {
      if (this.interfaceName) {
        return new Promise((resolve, reject, result) => {
          this.$api[this.interfaceName]().then(res => {
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      } else {
        return new Promise((resolve, reject, result) => {
          this.$api.getSearchHistory().then(res => {
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      }
    },
    deleteSearch (searchId) {
      this.$api.deleteSearchHistroy(searchId).then(res => {
      }).catch(err => {
        this.$msgMnger.httpError(err)
      })
    },
    handleSelect (item) {
      if (this.isInputTrim(item.value)) {
        return
      }
      if (this.isDelete) {
        this.deleteSearch(item.id)
        this.inputS = ''
        this.isDelete = false
        this.$refs.searchInput.focus() // to query history again
        return
      }
      this.$emit('inputConfirm', item.value.trim())
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
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#custom-input{
  .title{
    margin-right: 10px;
    font-size: 13px;
    font-weight: bold;
  }
  .custom-search-input{
    width: 360px;
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
#custom-input{
  .custom-search-input{
    .el-input--mini{
      .el-input__inner{
        padding-right: 61px;
      }
    }
  }
}
.custom-search-input-popper.el-autocomplete-suggestion.el-popper{
  .el-autocomplete-suggestion__wrap{
    margin-bottom: 0 !important;
    padding: 5px 0 !important;
    li{
      // width: calc(100% - 80px) !important;
      padding: 0 15px !important;
      padding-right: 30px !important;
      line-height: 26px !important;
      font-size: 12px !important;
      position: relative !important;
      i{
        position: absolute !important;
        top: 7px !important;
        right: 10px !important;
        font-size: 12px !important;
        width: 12px !important;
        height: 12px !important;
        color: $box-border-color!important;
        border-radius: 6px !important;
        line-height: 12px !important;
        &:hover{
          color: $tertiary-text-color !important;
        }
        &.icon-ba-close{
          font-size: 10px !important;
        }
      }
    }
  }
}
.custom-search-input-popper.el-autocomplete-suggestion.is-loading li{
  height: 60px !important;
}
</style>
