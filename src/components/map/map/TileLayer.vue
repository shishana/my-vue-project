<template>
  <div/>
</template>

<script>
import L from 'leaflet'
import urls from './urls'

export default {
  props: ['tileType', 'tileStyle', 'map'],
  data () {
    return {
      layerType: { baidu: 'baidu', google: 'google' },
      tileLaye: null
    }
  },
  methods: {
    ggTileLayer () {
      let template = urls.google_tile
      let layer = L.tileLayer(template)
      return layer
    },
    bdTileLayer () {
      let template = urls.baiduTile(this.tileStyle)
      let layer = L.layerGroup([L.tileLayer.baiduLayer(template)])
      return layer
    },
    getLayer (type) {
      let layer = null
      if (type === this.layerType.baidu) {
        layer = this.bdTileLayer()
      } else if (type === this.layerType.google) {
        layer = this.ggTileLayer()
      }
      this.tileLaye = layer
      return layer
    }
  },
  watch: {
    tileType: {
      handler (val) {
        if (val === 'none') {
          this.tileLaye.remove()
        } else {
          this.getLayer(val).addTo(this.map)
          this.$layerManager.removeLayer('precipitationLayer')
        }
      },
      deep: true
    }
  }
}
</script>

<style>
/* #leaflet-map .leaflet-tile-pane img{filter: grayscale(95%) hue-rotate(0deg) invert(0%) !important} */
</style>
