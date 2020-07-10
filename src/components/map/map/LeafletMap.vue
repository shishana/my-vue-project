<template>
  <div class="mc">
    <slot name="header"></slot>
    <div id="leaflet-map" class="map"></div>
    <tile-layer :tileType="mapSetting.mapType === 2 ? tileType : 'none'" tileStyle="baiduSatellite" :map="map"/>
    <!-- <map-legend /> -->
    <zoom-control
      @zoomChange="zoomChange"
      :searchFilterData="searchFilterData"
      :activeName="activeName"
      :collect="collect"
      :settings="settings"
      :circulation="circulation"
      :download="download">
    </zoom-control>
  </div>
</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import TileLayer from './TileLayer'
// import MapLegend from './MapLegend'
import zoomControl from './zoom-control'
import provinceLayerCom from '../layer-comps/province-layer'
import cityLayerCom from '../layer-comps/city-layer'
import countyLayerCom from '../layer-comps/county-layer'
import $ from 'jquery'

export default {
  components: {
    TileLayer,
    zoomControl
  },
  props: {
    titleText: {
      default: '陕西省24小时降水量（单位：mm）'
    },
    dateTimeText: {
      default: ''
    },
    searchFilterData: {
      type: Object
    },
    activeName: {
      type: String
    },
    collect: {
      type: Boolean,
      default: true
    },
    download: {
      type: Boolean,
      default: true
    },
    circulation: {
      type: Boolean,
      default: true
    },
    settings: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      map: null,
      tileType: null,
      cityBorder: null,
      countyBorder: null,
      defaultZoom: 7,
      defaultCenter: [35.543147, 108.939621]
    }
  },
  computed: {
    ...mapGetters({
      mapSetting: 'mapSetting'
    })
  },
  watch: {
    'mapSetting.border': {
      handler (val) {
        if (val.findIndex(item => item === 3) !== -1 && this.countyBorder) {
          this.addCountyBoundary(this.countyBorder)
        }
      },
      immediate: true
    }
  },
  methods: {
    initMap () {
      let options = {
        minZoom: 6,
        maxZoom: 16,
        zoomSnap: 0.1, // 强制地图的缩放级别始终为此的倍数
        zoomDelta: 0.5, // 控制当使用了 zoomIn()、 zoomOut()以及按+ -键或者使用Zoom控件之后，地图的缩放级别的改变的级别值
        attributionControl: false,
        zoomControl: false,
        drawControl: false,
        preferCanvas: true,
        doubleClickZoom: false
      }
      options.crs = L.CRS.Baidu // extend only for baidu
      this.map = L.map('leaflet-map', options)
      this.tileType = 'baidu' // 'google'
      this.map.setView(this.defaultCenter, this.defaultZoom)

      // map visible bounds
      this.map.setMaxBounds([[60.487014, 69.25854], [-2.374101, 141.504634]])
      // this.$layerManager.bindMap(this.map)
      this.$layerManager.map = this.map
      // this.$layerManager.fitMapBounds(this.$store.state.location.city.boundary)
      this.map.on('dragend', this.onMoveEnd, this)
      this.map.on('refresh', this.onMoveEnd, this)
      this.map.on('move', this.onMoveEnd)
      this.map.on('zoomend', e => {
        setTimeout(() => {
          this.zoomendFunc(e.target._lastCenter, e.target._zoom)
        }, 0)
      })
    },
    onMoveEnd () {
      // bus.$emit('map-zoom-move-end', e)
    },
    zoomendFunc () {
      //
    },
    zoomChange (type) {
      if (!type) {
        this.initMapSize()
        return
      }
      // let tarZoom = this.map.getZoom() + type
      // this.map.setZoom(tarZoom)
      if (type > 0) {
        this.map.zoomIn()
      } else {
        this.map.zoomOut()
      }
    },
    changeLocationZoomScopes () {
      // let { cityType } = this.location
      // this.locationZoomScopes[cityType] = this.locationZoomScopes[cityType] || {}
      // this.locationZoomScopes[cityType].boundsZoom = bounds ? this.map.getBoundsZoom(bounds) : this.locationZoomScopes[cityType].boundsZoom
      // this.locationZoomScopes[cityType].properties = properties || this.locationZoomScopes[cityType].properties
    },
    provinceBoundary () {
      this.$api.provinceBoundary().then(res => {
        this.addProvinceLayer(res.data)
      }).catch(e => {
        console.error(e)
      })
    },
    addProvinceLayer (geojson) {
      let layerId = 'province'
      let layer = provinceLayerCom.methods.getLayer(geojson, this)
      this.$layerManager.addLayer({ layerId, layer }, { legendObj: { com: provinceLayerCom } })
    },
    cityBoundary () {
      this.$api.cityBoundary().then(res => {
        this.cityBorder = res.data
        this.addCityLayer(res.data)
      }).catch(e => {
        console.error(e)
      })
    },
    addCityLayer (geojson) {
      let layerId = 'city'
      let layer = cityLayerCom.methods.getLayer(geojson, this)
      this.$layerManager.addLayer({ layerId, layer }, { legendObj: { com: provinceLayerCom } })
    },
    countyBoundary () {
      $.ajax({
        url: '/api/gis/district_boundary',
        method: 'get',
        contentType: false,
        processData: false,
        dataType: 'json',
        // data: formData,
        beforeSend: function (XMLHttpRequest) {
          let token = localStorage.getItem('user-token') || ''
          XMLHttpRequest.setRequestHeader('Authorization', 'Bearer ' + token)
        },
        success: (res) => {
          this.countyBorder = res.features
          if (this.mapSetting.border.findIndex(item => item === 3) !== -1) {
            this.addCountyBoundary(res.features)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    addCountyBoundary (geojson) {
      let layerId = 'county'
      let layer = countyLayerCom.methods.getLayer(geojson, this)
      this.$layerManager.addLayer({ layerId, layer }, { legendObj: { com: countyLayerCom } })
    },
    initMapSize () {
      let shBounds = [[39.589009, 105.742763], [31.709754, 112.202724]]
      this.$layerManager.map.fitBounds(shBounds, { paddingTopLeft: [0, 100] })
    }
  },
  beforeDestroy () {
  },
  mounted () {
    setTimeout(() => {
      this.initMap()
      this.provinceBoundary()
      this.cityBoundary()
      this.countyBoundary()
      this.initMapSize()
    }, 100)
  }
}
</script>

<style scoped lang="scss">
.mc{
  width: 100%;
  height: 100%;
  position: relative;
}
.mc .map{
  width: 100%;
  height: 100%;
}
.dialog-title {
  display: inline-block;
  color: #354052;
}
</style>
<style>
#leaflet-map .leaflet-popup-content-wrapper{
  box-shadow:0px 0px 20px 0px rgba(62, 149, 215, 0.3);
  border-radius:4px;
  overflow: hidden;
}
</style>
