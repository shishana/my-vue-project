<template>
  <div id="area-layer">
    <span class="legend-left"></span>
    <span class="legend-right">监测点</span>
  </div>
</template>

<script>
import E from '../map/Leaflet.ext.js'
import L from 'leaflet'
export default {
  methods: {
    // bindTooltip (properties, layer, context) {
    //   let { rain } = properties
    //   let stationName = properties.station_name
    //   let toolTip = ''
    //   if (typeof rain === 'object') {
    //     toolTip =
    //         `<div class="monitor-station-tooltip">
    //         <div>站点：${stationName}</div>
    //       `
    //     rain.map(e => {
    //       toolTip += `<div>${e}</div>`
    //     })
    //     toolTip += '</div>'
    //   } else {
    //     toolTip =
    //         `<div class="monitor-station-tooltip">
    //         <div>时间：${context.currentExpandRow.year}-${context.currentExpandRow.rdate}</div>
    //         <div>站点：${stationName}</div>
    //         <div>站点值：${rain}</div>
    //       </div>`
    //   }
    //   let options = { direction: 'top', offset: [0, -20], opacity: 1, permanent: false, className: 'monitor-station-tip' }
    //   // 为了将市的名字落在市中心的处理方法
    //   layer.bindTooltip(toolTip, options)
    // },
    getIcon (feature, hover = false, context) {
      let showName = context.mapSetting.pointSetting.findIndex(item => item === 1) !== -1
      let showValue = context.mapSetting.pointSetting.findIndex(item => item === 2) !== -1
      let pointNameClass = showName ? 'hidden-point-name point-name' : 'hidden-point-name'
      let pointValueClass = showValue ? 'hidden-point-value point-value' : 'hidden-point-value'
      let { rain } = feature.properties
      let _html = `
          <div class="point-con">
            <div class="${pointNameClass}">${feature.properties.station_name}</div>
            <div class="${pointValueClass}">${rain}</div>
          </div>
        `
      var divIconBig = L.divIcon({
        className: `national-standing-point${hover ? ' list-hover' : ''} monitor-station${feature.properties.stationcode}`,
        html: _html
      })
      return divIconBig
    },
    getLayer (geojson, context) {
      let _this = this
      return E.geoJSON(geojson, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: _this.getIcon(feature, false, context) })
        },
        onEachFeature: function (feature, layer) {
          // _this.bindTooltip(feature.properties, layer, context)
          layer.on({
            click: function (e) {
            },
            dblclick: function (e) {
            },
            mouseover: function (e) {
              // layer.setIcon(_this.getIcon(feature, true, context))
            },
            mouseout: function (e) {
              // layer.setIcon(_this.getIcon(feature, false, context))
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #area-layer{
    overflow: hidden;
    font-size: 12px;
    .legend-left{
      display: inline-block;
      box-sizing: border-box;
      border: 2px solid #5998ff;
      width: 10px;
      height: 10px;
      margin-right: 5px;
    }
  }
</style>
<style lang="scss">
  .national-standing-point{
    box-sizing: border-box !important;
    width: 8px !important;
    height: 8px !important;
    margin-left: -4px !important;
    margin-top: -4px !important;
    border-radius: 100% !important;
    background: #fff;
    border: 2px solid #3080FE;
    .point-con{
      width: max-content;
      position: absolute;
      background: #F2C94D;
      color: #fff;
      font-size: 12px;
      line-height: 14px;
      pointer-events: none;
      word-break: keep-all;
      top: 11px;
      left: 50%;
      transform: translate(-50%, 0);
      border-radius: 3px;
      text-align: center;
      .hidden-point-name{
        display: none;
      }
      .hidden-point-value{
        display: none;
      }
      .point-name{
        display: block;
        padding: 2px 5px 0 5px;
      }
      .point-value{
        display: block;
        padding: 0 5px;
      }
    }
    .point-con-hide-background{
      background: none;
    }
    &.list-hover {
      width: 20px !important;
      height: 20px !important;
      margin-left: -10px !important;
      margin-top: -10px !important;
      border-width: 3px !important;
      z-index: 9999 !important;
      .point-con{
        top: 25px;
        box-shadow: 0px 0px 10px 0px #484848;
      }
    }
  }
  .monitor-station-tip{
    border: 1px solid #3080FE;
    // &::before{
    //   border-top-color: #3080FE !important;
    // }
  }
  .monitor-station-tooltip{
    padding: 5px;
    font-size: 14px;
    color: #3080FE;
  }
</style>
