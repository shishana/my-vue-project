<template>
  <div id="point-layer" v-if="comProps">
    <img class="poi-store" :src="comProps.icon"/>
    <span>{{comProps.name}}</span>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  props: ['comProps'],
  methods: {
    getIcon (icon) {
      return L.icon({
        iconSize: [18, 18],
        // iconAnchor: [0, 0],
        iconUrl: icon
      })
    },
    getLayer ({ geojson, icon }, context) {
      let _this = this
      var layer = L.marker(L.latLng(geojson[1], geojson[0]), { icon: _this.getIcon(icon) })
      layer.on('click', function (e) {
        //
      })
      return layer
    }
  }
}
</script>

<style lang="scss" scoped>
#point-layer{
  overflow: hidden;
  font-size: 12px;
  padding: 2px 0;
  .poi-store{
    display: inline-block;
    width: 10px;
    height: 15px;
    margin: 0 5px -4px 0;
  }
}
</style>
