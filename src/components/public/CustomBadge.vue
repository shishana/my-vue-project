<template>
  <div id="tags-bar">
    <div class="checkbox-block">
      <el-checkbox-group v-model="checkedTagsV" @change="handleCheckedChange">
        <el-button v-if="unlimitTitle" class="unlimit-btn" size="mini" @click="unlimitClick">{{unlimitTitle}}</el-button>
        <el-badge :value="tag.count" v-for="tag in tagList" :key="tag">
          <el-checkbox-button size="mini" :label="tag">
            {{tag}}
          </el-checkbox-button>
        </el-badge>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tagList', 'unlimitTitle'],
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
      this.checkAll = checkedCount === this.tags.length // 是否全选
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tags.length
      this.handChecked()
    },
    unlimitClick () {
      this.checkedTagsV = []
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
  /*overflow: hidden;*/
  .unlimit-btn{
    float: left;
    margin: 11px 20px 0 0;
  }
}
</style>

<style lang="scss">
#tags-bar{
  .el-badge{
    margin-right: 20px;
  }
  .el-checkbox-button__inner{
    padding: 6px 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .el-badge__content.is-fixed{
    top: 15px;
  }
}
</style>
