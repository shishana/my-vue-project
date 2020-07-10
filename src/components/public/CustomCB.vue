<template>
  <div id="tags-bar">
    <div class="checkbox-block">
      <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
      <el-checkbox-group v-model="checkedTagsV" @change="handleCheckedChange">
        <el-checkbox v-for="tag in tagList" :label="tag" :key="tag">{{tag}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tagList'],
  name: 'TagsBar',
  data () {
    return {
      tags: [],
      checkedTagsV: [],
      isIndeterminate: false,
      checkAll: false
    }
  },
  methods: {
    updateChecked (tags, checkedTags) {
      this.tags = tags
      this.checkedTagsV = checkedTags
      this.checkAll = (this.checkedTagsV.length === this.tags.length) && this.tags.length
      this.isIndeterminate = this.checkedTagsV.length > 0 && this.checkedTagsV.length !== this.tags.length
      this.$forceUpdate()
    },
    handleCheckAllChange (value) {
      this.checkedTagsV = value ? this.tags : []
      this.isIndeterminate = false
      this.handChecked()
    },
    handleCheckedChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.tags.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tags.length
      this.handChecked()
    },
    handChecked () {
      this.$emit('checkedChange', this.checkedTagsV)
    }
  }
}
</script>

<style scoped lang="scss">
  #tags-bar{
    overflow: hidden;
  }
</style>
<style lang="scss">
  @import '@/styles/index.scss';
  #tags-bar{
    overflow: hidden;
    .checkbox-block{
      float: left;
      overflow: hidden;
      .el-checkbox{
        box-sizing: border-box;
        height: 20px !important;
        line-height: 18px;
        margin-right: 10px !important;
        margin-bottom: 10px !important;
        border: 1px solid rgba(42,187,212, 0.2);
        border-radius: 4px !important;
        float: left !important;
        &.is-checked{
          border: 1px solid $--color-primary;
          border-color: rgba(42,187,212, 0.2); // #2ABBD4
          background-color: rgba(42,187,212, 0.1);
        }
        .el-checkbox__input{
          display: none !important;
          .el-checkbox__inner{
            width: 12px !important;
            height: 12px !important;
            &::before{
              top: 4px !important;
            }
          }
        }
        .el-checkbox__label{
          padding: 0 5px !important;
          font-size: 12px !important;
          line-height: 17px !important;
          &:hover{
            background-color: rgba(42,187,212, 0.1);
          }
        }
        .el-checkbox__input.is-checked{
          .el-checkbox__inner{
            &::after{
              top: 0px !important;
              left: 3px !important;
            }
          }
        }
      }
      .el-checkbox-group{
        // float: left !important;
        overflow: hidden;
      }
    }
  }
</style>
