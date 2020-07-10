<template>
  <div id="area-layer">
    <span class="legend-left"></span>
    <span class="legend-right">降水量</span>
  </div>
</template>

<script>
import E from '../map/Leaflet.ext.js'

export default {
  methods: {
    getLayer (geojson, context) {
      // let _this = this
      return E.geoJSON(geojson, {
        style: function (feature) {
          return {
            weight: 1,
            color: feature.properties.color,
            opacity: 1,
            fillColor: feature.properties.color,
            fillOpacity: 1
          }
        },
        onEachFeature: function (feature, layer) {
          layer.on({
            click: function (e) {
              console.log(context.$layerManager)
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
