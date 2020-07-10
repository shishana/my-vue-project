<template>
  <div id="custom-dialog">
     <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose"
      :show-close="showClose"
      :modal-append-to-body="true"
      :append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :custom-class="customClass"
      >
      <slot name="part4"></slot>
      <slot name="part0"></slot>
      <slot name="part1"></slot>
      <slot name="part2"></slot>
      <slot name="part3"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="button1" size="mini" @click="clickBtn1()">{{button1.title}}</el-button>
        <el-button v-if="button2" size="mini" type="primary" @click="clickBtn2()">{{button2.title}}</el-button>
        <el-button v-if="button4" size="mini" type="primary" @click="clickBtn4()">{{button4.title}}</el-button>
        <el-button v-if="button3" size="mini" type="danger" @click="clickBtn3()">{{button3.title}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['title', 'width', 'button1', 'button2', 'button3', 'button4', 'showClose', 'customClass', 'closedDialog'],
  data () {
    return {
      dialogVisible: false,
      data: null,
      keepTypes: ['table', 'diagram', 'abstract'],
      keepEvents: ['edit', 'new-template', 'edit-template', 'new-report', 'bind-sheet']
    }
  },
  methods: {
    updateVisible (visible, data) {
      this.dialogVisible = visible
      this.data = data
    },
    handleClose () {
      this.dialogVisible = false
      this.$emit('beforeClose')
    },
    clickBtn1 () {
      this.$emit('clickBtn1', this.data)
      if (this.keepTypes.indexOf(this.data.type) > -1) {
        return
      }
      this.dialogVisible = false
    },
    clickBtn2 () {
      this.$emit('clickBtn2', this.data)
      // 这里关闭 dialog 可扩展性不高(两个连续的弹框， 中间不需要关闭)， 放在外层关闭
      // if (this.keepTypes.indexOf(this.data.type) > -1 || this.keepEvents.indexOf(this.data.event) > -1) {
      //   return
      // }
      // this.dialogVisible = false
    },
    clickBtn3 () {
      this.$emit('clickBtn3', this.data)
      if (this.keepTypes.indexOf(this.data.type) > -1) {
        return
      }
      this.dialogVisible = false
    },
    clickBtn4 () {
      this.$emit('clickBtn4', this.data)
      if (this.keepTypes.indexOf(this.data.type) > -1) {
        return
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
