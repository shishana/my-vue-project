<template>
  <div id="edit-title-tags">
    <div class="top">
      <span>{{type}}名称：</span>
      <el-input  slot="last" class="title-input" v-model="inputD" :placeholder="`请输入${type}名称`" size="mini" clearable type="text" :maxlength="40" :show-word-limit="true"></el-input>
    </div>
    <div class="bottom">
      <span>{{type}}标签：</span>
      <tags-bar ref="tagsBar" class="tags-bar" @checkedChange="handleSelectTags"/>
    </div>
    <slot name="two"></slot>
    <slot name="one"></slot>
  </div>
</template>

<script>
import TagsBar from '@/components/public/TagsBar.vue'
export default {
  props: ['type', 'inputRT'],
  components: {
    TagsBar
  },
  data () {
    return {
      inputD: ''
    }
  },
  mounted () {
    this.inputD = this.inputRT
  },
  methods: {
    handleSelectTags () {
      //
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#edit-title-tags{
  padding: 5px 20px;
  text-align: center;
  font-size: 12px;
  text-align: left;
  .top{
    .title-input{
      width: 400px;
      margin-left: 10px;
    }
  }
  .bottom{
    margin-top: 20px;
    overflow: hidden;
    >span{
      float: left;
    }
    .tags-bar{
      width: 450px; // 实际剩余宽度为460
    }
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
#edit-title-tags{
  .top{
    .title-input{
      .el-input__inner{
        padding-right: 68px;
      }
    }
  }
}
</style>
