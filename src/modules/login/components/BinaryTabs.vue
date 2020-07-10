<template>
  <div id="b-tabs">
    <div class="b-tabs-header" :style="{ height: height, 'line-height': height }">
      <div @click="handleTabChange('left')" class="b-tabs-header-left" :class="currentTab === 'left' ? 'current-tab' : ''">
        <slot name="b-tabs-header-left"></slot>
      </div>
      <div @click="handleTabChange('right')" class="b-tabs-header-right" :class="currentTab === 'right' ? 'current-tab' : ''">
        <slot name="b-tabs-header-right"></slot>
      </div>
    </div>
    <div class="b-tabs-body">
      <slot name="b-tabs-body"></slot>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/event-bus.js'
export default {
  props: ['height'],
  data () {
    return {
      currentTab: 'left'
    }
  },
  watch: {
    currentTab: {
      handler (flag) {
        this.$emit('tab-changed', flag)
      }
    }
  },
  mounted () {
    Bus.$on('signUp', flag => this.handleTabChange(flag))
  },
  beforeDestroy () {
    Bus.$off('signUp')
  },
  methods: {
    handleTabChange (flag) {
      this.currentTab = flag
    }
  }
}
</script>

<style lang="scss" scoped>
#b-tabs {
  .b-tabs-header {
    padding: 0 30px 25px;
    font-size: 16px;
    line-height: 24px;
    .b-tabs-header-left,
    .b-tabs-header-right {
      margin: 0 15px;
      width: calc(50% - 30px);
      text-align: center;
      cursor: pointer;
      float: left;
      border-bottom: 2px solid transparent;
    }
    .current-tab {
      border-bottom: 2px solid #981E32;
      color: #2A3033;
      transition: all .6s;
    }
  }
  .b-tabs-body {
  }
}
</style>
