/**
 * events.js
 * @file Map layer manager
 * @author bayesba
 */
import Vue from 'vue'
class LayerManager {
  constructor (map) {
    this.map = map
    this.layers = {}
    this.legend = {
      alone: {},
      group: {}
    }
  }
  // 改变图例
  changeLegend (id, legendObj, groupName) {
    if (groupName) {
      if (!this.legend.group[groupName]) {
        this.legend.group[groupName] = { allChecked: true, items: {} }
      }
      Vue.set(this.legend.group[groupName].items, id, legendObj) // 必须使用set方法，向legend中添加新的属性后，可以更新视图
    } else {
      Vue.set(this.legend.alone, id, legendObj)
    }
  }
  // 添加layer
  addLayer ({ layerId, layer }, legendPara) {
    let id
    if (typeof layerId === 'function') {
      id = layerId(layer)
    } else {
      id = layerId
    }
    if (!id || !layer) {
      return
    }
    let showLayer = !this.layers[id] || (this.layers[id] && this.layers[id].visible)
    layer['visible'] = showLayer
    if (this.layers[id]) {
      this.removeLayer(id)
    }
    this.layers[id] = layer
    if (showLayer) {
      this.map && this.map.addLayer(layer)
    }
    // 图例
    if (legendPara) {
      let { legendId, legendObj, groupName } = legendPara
      legendId = legendId || id
      this.changeLegend(legendId, legendObj, groupName)
    }
    return layer
  }
  // 移除layer
  removeLayer (id) {
    if (!this.layers[id]) {
      console.warn('try to remove unloaded layer.')
      return
    }
    this.map.removeLayer(this.layers[id])
    // this.layers[key] = null
  }
  // 移除所有layer
  removeAllLayer () {
    for (let key in this.layers) {
      this.removeLayer(key)
    }
  }
  // 判断某个layer的状态是否为显示
  mapHasLayer (id) {
    if (!id || !this.layers[id]) {
      return false
    }
    return this.map && this.map.hasLayer(this.layers[id])
  }
  // 显示layer
  showLayer (id) {
    if (!this.layers[id]) {
      console.warn('try to show unloaded layer.')
      return
    }
    if (this.layers[id].visible) {
      this.map.removeLayer(this.layers[id])
      console.warn('try to show visible layer.')
    }
    this.layers[id].visible = true
    this.map && this.map.addLayer(this.layers[id])
  }
  // 隐藏layer
  hideLayer (id) {
    if (!this.layers[id]) {
      console.warn('try to hide unloaded layer.')
      return
    }
    if (!this.layers[id].visible) {
      console.warn('try to hide unvisible layer.')
    }
    this.layers[id].visible = false
    this.map && this.map.removeLayer(this.layers[id])
  }

  locatePoi (coordinates) {
    let zoomLevel = this.map.getZoom()
    let targetZoomLevel = zoomLevel > 16 ? zoomLevel : 16
    this.map.setView([coordinates[1], coordinates[0]], targetZoomLevel)
  }

  setZoomLevel (zoom = 16, max = 18, min = 4) {
    this.map.setZoom(zoom)
    this.map.options.maxZoom = max
    this.map.options.minZoom = min
  }

  fitMapBounds (boundary) {
    if (boundary.length === 0) {
      return
    }
    let bounds = []
    if (boundary.type === 'Polygon') {
      bounds = boundary.coordinates[0]
    } else if (boundary.type === 'MultiPolygon') {
      bounds = boundary.coordinates[0][0]
    }
    let tmpBounds = []
    let k = bounds.length
    while (k--) {
      tmpBounds.push([bounds[k][1], bounds[k][0]])
    }
    this.map.fitBounds(tmpBounds)
  }

  getCurrentLayer (id, type) {
    let layer = null
    let layers = null
    if (!this.layers[type]) {
      return null
    }
    layers = this.layers[type]._layers
    for (const key in layers) {
      // if (layers.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(layers, key)) {
        const element = layers[key]
        if (String(element.feature.properties.id) === String(id)) {
          layer = element
          break
        }
      }
    }
    return layer
  }
}
export default LayerManager
