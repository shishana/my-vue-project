<template>
  <div id="public-area">
    <div class="table-area">
      <slot name="table-area"></slot>
    </div>
    <svg class="switch" aria-hidden="true" @click="onOff">
      <use xlink:href="#iconshousuo"></use>
    </svg>
    <div class="map-area">
      <slot name="map-area"></slot>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'public-area',
  props: {
    space: {
      type: String,
      default: '60%'
    }
  },
  data () {
    return {
      switchTxtBoole: true
    }
  },
  mounted () {
    this.setWidth()
  },
  methods: {
    setWidth () {
      if (this.space) {
        $('.table-area').css({
          'width': `calc(${this.space} - 16px)`,
          'margin-left': '0'
        })
        $('.map-area').css({
          'width': `calc(100% - ${this.space})`,
          'margin-left': '16px'
        })
        $('.switch').css({
          'transform': 'rotateZ(0deg)',
          'left': `calc(${this.space} + 180px)`
        })
      }
    },
    onOff () {
      this.switchTxtBoole = !this.switchTxtBoole
      if (this.switchTxtBoole) {
        this.setWidth()
      } else {
        $('.switch').css({
          'transform': 'rotateZ(180deg)',
          'left': '200px'
        })
        $('.table-area').css({
          'width': `${this.space}`,
          'margin-left': `-${this.space}`
        })
        $('.map-area').css({
          'width': '100%',
          'margin-left': '0px'
        })
      }
      setTimeout(() => {
        this.$layerManager && this.$layerManager.map.invalidateSize({ animate: true })
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
#public-area{
  width: 100%;
  min-width: 1080px;
  height: 100%;
  overflow: hidden;
  .table-area{
    height: 100%;
    float: left;
    transition: all .5s;
  }
  .switch{
    width: 30px;
    height: 30px;
    position: fixed;
    top: 33px;
    cursor: pointer;
    z-index: 500;
    transition: all .5s;
  }
  .map-area{
    margin-left: 16px;
    height: 100%;
    float: left;
    transition: all .5s;
    background: white;
    padding: 16px;
    .header{
      height: 98px;
      .title{
        height: 32px;
        .icon{
          width:26px;
          height:26px;
          vertical-align: middle;
          margin-right: 9px;
        }
        span:first-of-type{
          font-size:16px;
          font-weight:600;
          color:rgba(0,0,0,1);
          line-height: 32px;
          vertical-align: middle;
        }
        span:last-of-type{
          display: inline-block;
          width:100px;
          height:32px;
          background:rgba(245,247,248,1);
          border-radius:18px;
          font-size: 14px;
          line-height: 32px;
          text-align: center;
          color: #3080FE;
          cursor: pointer;
          float: right;
          vertical-align: middle;
        }
      }
      .time{
        font-size:14px;
        color:rgba(153,153,153,1);
        line-height: 14px;
        padding-left: 36px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
