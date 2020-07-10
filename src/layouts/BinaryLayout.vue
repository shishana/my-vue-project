<template>
  <div id="ba-binary-layout" :class="{'box-border' : border}">
    <div :style="getFirstBlockStyle()" :class="getBlockClass()">
      <slot name="one">
        <bread-crumb v-if="breadCrumb"></bread-crumb>
      </slot>
      <slot name="first"></slot>
    </div>
    <div :style="getLastBlockStyle()" :class="getBlockClass()">
      <slot name="last"></slot>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../components/bread-crumb'
export default {
  components: {
    BreadCrumb
  },
  props: {
    mode: {
      type: String,
      default: 'vertical' // 'horizontal'
    },
    placement: {
      type: String,
      default: 'top' // 'left'
    },
    space: {
      type: String,
      default: '50%'
    },
    border: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    breadCrumb: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      vMode: 'vertical',
      placementV: 'top',
      spaceV: '400px'
    }
  },
  watch: {
    space (val, old) {
      if (this.duration) {
        this.updateSpace(val, old)
      } else {
        this.checkSpace(val)
      }
    }
  },
  created () {
    this.checkMode()
    this.checkPlacement()
    this.checkSpace(this.space)
  },
  methods: {
    checkMode () {
      if (
        ['vertical', 'horizontal'].indexOf(this.mode) === -1 ||
        this.mode === ''
      ) {
        this.vMode = 'vertical'
        console.error('@ba: mode error, try "vertical" or "horizontal"')
      } else {
        this.vMode = this.mode
      }
    },
    checkPlacement () {
      if (this.vMode === 'vertical') {
        if (
          ['top', 'bottom'].indexOf(this.placement) === -1 ||
          this.placement === ''
        ) {
          this.placementV = 'top'
          console.error(
            '@ba: placement error in vertical mode, try "top" or "bottom"'
          )
        } else {
          this.placementV = this.placement
        }
      } else {
        if (
          ['left', 'right'].indexOf(this.placement) === -1 ||
          this.placement === ''
        ) {
          this.placementV = 'left'
          console.error(
            '@ba: placement error in horizontal mode, try "left" or "right"'
          )
        } else {
          this.placementV = this.placement
        }
      }
    },
    checkSpace (space) {
      if (space.indexOf('%') > -1) {
        let per = Number(space.split('%')[0])
        if (per < 0 || per > 100) {
          console.error('@ba: space error, range is from "0%" to "100%"')
          this.spaceV = '50%'
        }
        this.spaceV = space
      } else if (space.indexOf('px') > -1) {
        let value = Number(space.split('px')[0])
        if (value < 0 || value > 2560) {
          this.spaceV = '50%'
          console.error('@ba: space error, range is from "0%" to "100%"')
        }
        this.spaceV = space
      } else {
        console.error('@ba: space formal error, try "60px" or "50%"')
        this.spaceV = '50%'
      }
    },
    transformSpace (space) {
      if (space.indexOf('%') > -1) {
        let per = Number(space.split('%')[0])
        return `${100 - per}%`
      } else if (space.indexOf('px') > -1) {
        return `calc(100% - ${space})`
      } else {
        console.error('@ba: space error, try "60px" or "50%"')
        return '50%'
      }
    },
    getFirstBlockStyle () {
      if (this.vMode === 'vertical') {
        return this.placementV === 'top'
          ? { width: '100%', height: this.spaceV }
          : { width: '100%', height: this.transformSpace(this.spaceV) }
      } else {
        return this.placementV === 'left'
          ? { width: this.spaceV, height: '100%', float: 'left' }
          : {
            width: this.transformSpace(this.spaceV),
            height: '100%',
            float: 'left'
          }
      }
    },
    getLastBlockStyle () {
      if (this.vMode === 'vertical') {
        return this.placementV === 'top'
          ? { width: '100%', height: this.transformSpace(this.spaceV) }
          : { width: '100%', height: this.spaceV }
      } else {
        return this.placementV === 'left'
          ? {
            width: this.transformSpace(this.spaceV),
            height: '100%',
            float: 'right'
          }
          : { width: this.spaceV, height: '100%', float: 'right' }
      }
    },
    getBlockClass () {
      return this.border ? '' : 'custom-border'
    },
    updateSpace (val, old) {
      let _this = this
      function getSteps (start, end) {
        let steps = []
        for (let k = 0; k <= Math.abs(start - end); k++) {
          let step = start > end ? start - k : start + k
          steps.push(step)
        }
        return steps
      }
      function animate (steps, unit) {
        let k = 0
        let _intTime = (_this.duration / steps.length).toFixed(2)
        let _int = setInterval(() => {
          if (k >= steps.length) {
            clearInterval(_int)
          }
          _this.checkSpace(`${steps[k]}${unit}`)
          k += 2
        }, _intTime)
      }

      if (val.indexOf('%') > -1 && old.indexOf('%') > -1) {
        let start = Number(old.replace('%', ''))
        let end = Number(val.replace('%', ''))
        let _steps = getSteps(start, end)
        let __steps = []
        _steps.forEach((el, index) => {
          if (index < _steps.length - 1) {
            for (let k = 0; k < 20; k++) {
              // consider 1% as 20px, to achive smoth moving
              let __s = start > end ? el - k / 20 : el + k / 20
              __steps.push(__s)
            }
          }
        })
        animate(__steps, '%')
      } else if (val.indexOf('px') > -1 && old.indexOf('px') > -1) {
        let start = Number(old.replace('px', ''))
        let end = Number(val.replace('px', ''))
        let _steps = getSteps(start, end)
        animate(_steps, 'px')
      } else {
        console.error(
          '@ba: need to keep space param unit consistent with "px" or "%"'
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/index.scss";
#ba-binary-layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  > div:first-child {
    box-sizing: border-box;
    overflow: hidden;
  }
  > div:last-child {
    box-sizing: border-box;
    overflow: hidden;
  }
  &.box-border {
    > div {
      border: 1px solid $seprator-line-color;
    }
  }
}
</style>
