<template>
  <div id="map-legend" class="map-legend-index" v-if="selfRest">
    <div class="title">图例</div>
    <div class="legend-content">
      <div class="alone">
        <div :class="{'legend-hide': !getLayerStatus(index)}" v-for="(item, index) in legend.alone" :key="index" @click="legendClick(item, index)">
          <component v-if="item.com" :is="item.com" :comProps="item.comProps"></component>
        </div>
      </div>
      <div class="group" v-for="(item, index) in legend.group" :key="index">
        <div>
          <span>{{index}}</span>
          <el-switch
            v-model="switchStatus[index]"
            :width="30"
            active-color="#1b91eb"
            inactive-color="#ddd"
            @change="switchChange($event, item, index)">
          </el-switch>
        </div>
        <div :class="{'legend-hide': !getLayerStatus(k)}" v-for="(i, k) in item.items" :key="k" @click="legendClick(i, k)">
          <component v-if="i.com" :is="i.com" :comProps="i.comProps"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      selfRest: true,
      legend: {
        alone: {},
        group: {}
      },
      switchStatus: {}
    }
  },
  methods: {
    // 单个显示隐藏
    legendClick (item, index) {
      let hasLayer = this.getLayerStatus(index)
      if (hasLayer) {
        this.$layerManager.hideLayer(index)
      } else {
        this.$layerManager.showLayer(index)
      }
      this.changeGroupStatus()
      this.forceUpdate()
    },
    // 单个改变时，判断switch的状态时候需要变化
    changeGroupStatus () {
      Object.keys(this.switchStatus).map(e => {
        let group = this.legend.group[e].items
        let status = false
        for (const key in group) {
          if (group.hasOwnProperty(key)) {
            if (this.getLayerStatus(key)) {
              status = true
            }
          }
        }
        this.switchStatus[e] = status
      })
    },
    // 整组显示隐藏
    switchChange (groupStatus, item, index) {
      let layerKeys = Object.keys(item.items)
      layerKeys.map(e => {
        if (groupStatus) {
          this.$layerManager.showLayer(e)
        } else {
          this.$layerManager.hideLayer(e)
        }
      })
    },
    // 强制刷新当前组件，因为图例的样式改变时用函数getLayerStatus求的
    forceUpdate () {
      this.selfRest = false
      this.$nextTick(() => {
        this.selfRest = true
      })
    },
    // 获取当前layer显隐状态
    getLayerStatus (key) {
      return this.$layerManager.mapHasLayer(key)
    },
    // 初始化开关状态
    initSwitchStatus () {
      let group = this.legend.group
      for (const key in group) {
        if (group.hasOwnProperty(key)) {
          Vue.set(this.switchStatus, key, true)
        }
      }
    }
  },
  watch: {
    // 创建地图管理器的时候就创建了相应的图例并混入全局，可以监听，名称为 地图管理器名 + 'Legend'
    '$layerManagerLegend': {
      handler (legend) {
        // this.legend = JSON.parse(JSON.stringify(legend))
        this.legend = legend
        this.initSwitchStatus()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.map-legend-index{
  position:absolute;
  bottom:34px;
  right:60px;
  background:#f0f3f8;
  padding: 10px;
  border-radius:3px;
  user-select:none;
  z-index: 1002;
  cursor: default;
  transition: .5s all;
  text-align: left;
  font-size: 12px;
  .title{
    text-align: center;
  }
}
.legend-content{
  .alone, .group{
    background: #fff;
    padding: 10px;
    margin-top: 10px;
  }
}
.legend-hide{
  opacity: .5;
}
</style>
<style lang="scss">
#map-legend{
  .el-switch{
    margin-top: -2px;
    .el-switch__core{
      height: 14px !important;
      &:after{
        width: 14px !important;
        height: 14px !important;
        top: -1px !important;
        left: -1px !important;
      }
    }
    &.is-checked{
      .el-switch__core{
        &:after{
          margin-left: 14px !important;
          left: 1px !important;
        }
      }
    }
  }
}
</style>
