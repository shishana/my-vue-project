<template>
  <div id="custom-style" :contenteditable="false">
    <transition
      name="my-trans"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
      >
      <div class="tools" v-show="isExpand">
        <el-select
          class="font-family"
          popper-class="style-popper-class"
          size="mini"
          v-model="font"
          placeholder="请选择"
        ><el-option
            v-for="item in fontOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          class="font-size"
          popper-class="style-popper-class"
          size="mini"
          v-model="fontSize"
          placeholder="请选择"
        ><el-option
            v-for="item in fontSizeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span :style="getFontSizeStyle(item)">{{ item.label }}</span>
          </el-option>
        </el-select>
        <el-color-picker
          class="color-picker"
          size="mini"
          v-model="color"
          :predefine="preColors"
        ></el-color-picker>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['sec'],
  data () {
    return {
      isExpand: false,
      color: '#000',
      preColors: [],
      font: 'PingFangSC-light',
      fontOptions: [
        { label: '平方', value: 'PingFangSC-light' },
        { label: '微软雅黑', value: 'Microsoft YaHei' }
      ],
      fontSize: '13px',
      fontSizeOptions: []
    }
  },
  computed: {
    btnTitle () {
      return this.isExpand ? '' : '编辑样式' // type="primary" plain
    },
    btnIcon () {
      return this.isExpand ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'
    }
  },
  mounted () {
    this.configFontSize()
  },
  methods: {
    configFontSize () {
      let tmp = []
      for (let k = 0; k < 5; k++) {
        tmp.push({ label: `${k + 12}px`, value: `${k + 12}px` })
      }
      this.fontSizeOptions = tmp
    },
    getFontSizeStyle (item) {
      return { 'font-size': item.value }
    },
    clearGenPrg () {
      this.sec.generated = []
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#custom-style{
  display: inline-block;
  text-indent: 0;
  overflow: hidden;
  .tools{
    overflow: hidden;
    .font-family{
      width: 120px;
      float: left;
    }
    .font-size{
      width: 80px;
      float: left;
      margin-left: 10px;
    }
    .color-picker{
      float: left;
      margin: 0 10px;
    }
  }
}
</style>
<style lang="scss">
@import '@/styles/index.scss';
#custom-style{
  .el-select{
    .el-input--mini{
      .el-input__inner, .el-input__icon{
        height: 20px !important;
        line-height: 20px !important;
      }
    }
  }
  .el-color-picker.el-color-picker--mini .el-color-picker__trigger{
    height: 20px !important;
    width: 20px !important;
    padding: 1px !important;
  }
  .el-button{
    height: 20px !important;
    line-height: 18px !important;
    padding: 0px 5px !important;
  }
}
.style-popper-class{
  li{
    height: 24px !important;
    line-height: 24px !important;
  }
}
</style>
