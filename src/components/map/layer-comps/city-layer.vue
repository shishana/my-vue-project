<template>
  <div id="area-layer">
    <span class="legend-left"></span>
    <span class="legend-right">城市边界</span>
  </div>
</template>

<script>
import E from '../map/Leaflet.ext.js'
import L from 'leaflet'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      mapSetting: 'mapSetting'
    })
  },
  methods: {
    bindTooltip (properties, layer, context) {
      // let toolTip = `<div>${properties.name}</div>`
      // let options = { direction: 'center', offset: [0, -20], opacity: 1, permanent: true, className: 'area-tip' }
      // 为了将市的名字落在市中心的处理方法
      let divIcon = L.divIcon({
        html: properties.name,
        iconSize: [40, 20],
        className: context.mapSetting.mapType === 1 ? 'city-name' : 'city-name satellite-city-name'
      })
      L.marker(properties.center, { icon: divIcon }).addTo(context.$layerManager.map)
      // .bindTooltip(toolTip, options).addTo(context.$layerManager.map)
    },
    getLayer (geojson, context) {
      let _this = this
      return E.geoJSON(geojson, {
        style: function (feature) {
          return {
            weight: 2,
            color: '#333333',
            opacity: 0.6,
            fillOpacity: 0
          }
        },
        onEachFeature: function (feature, layer) {
          _this.bindTooltip(feature.properties, layer, context)
          layer.on({
            click: function (e) {
            },
            dblclick: function (e) {
            },
            mouseover: function (e) {
            },
            mouseout: function (e) {
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
#leaflet-map{
  .city-name{
    border: none;
    background: transparent;
    color: #666;
  }
  .satellite-city-name{
    color: white !important;
  }
  .hidden-city-name{
    display: none;
  }
}
</style>
