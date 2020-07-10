import L from 'leaflet'
// import 'leaflet-ugeojson/src/leaflet.uGeoJSON.js'

const defaultHighlightStyle = {
  fillColor: '#921a64',
  fillOpacity: 1,
  color: '#921a64',
  opacity: 1
}

function respondsToFunc (func) {
  if (func !== null && func !== undefined) {
    if ((typeof func) === 'function') {
      return true
    } else {
      console.error('UGeoJSON Error: Expect a function to be call.')
    }
  }
  return false
}

function findSubLayerById (id) {
  var subLayer = null
  for (let i in geoJsonlayer._layers) {
    let featureId = String(geoJsonlayer._layers[i].feature.properties.adcode || geoJsonlayer._layers[i].feature.properties.id || geoJsonlayer._layers[i].feature.properties.citycode)
    if (String(id) === featureId) {
      subLayer = geoJsonlayer._layers[i]
    } else {
      geoJsonlayer.resetStyle(geoJsonlayer._layers[i])
    }
  }
  return subLayer
}

var geoJsonOptions = null
function configOptions (inputOptions, defaultOptions) {
  if (inputOptions === null || inputOptions === undefined) {
    inputOptions = {}
  }

  for (var i in defaultOptions) {
    if (!inputOptions.hasOwnProperty(i)) {
      inputOptions[i] = defaultOptions[i]
    }
  }
  geoJsonOptions = inputOptions
}

var geoJsonlayer = null
function configLayer (typeLayer) {
  geoJsonlayer = typeLayer
}

var map = null
function configMap () {
  if (!geoJsonOptions.map) {
    return
  }
  map = geoJsonOptions.map
  var _map = map
  var _geoJsonlayer = geoJsonlayer
  var _geoJsonOptions = geoJsonOptions
  map.on('zoomend', function (e) {
    if (_map && _geoJsonlayer) {
      if (_map.getZoom() >= _geoJsonOptions.visibleLevel) {
        // _map.removeLayer(_geoJsonlayer)
        // _map.addLayer(_geoJsonlayer)
      }
    }
  })
}

// callback methods
var [mouseoverCallbacks, mouseoutCallbacks, clickCallbacks, dblclickCallbacks, afterCallbacks, eachFeatureCallbacks, markerLayerCallbacks, circleMarkerLayerCallbacks] = [null, null, null, null, null, null, null, null, null]
function configCallbacks () {
  mouseoverCallbacks = geoJsonOptions['mouseover']
  mouseoutCallbacks = geoJsonOptions['mouseout']
  clickCallbacks = geoJsonOptions['click']
  dblclickCallbacks = geoJsonOptions['dblclick']
  afterCallbacks = geoJsonOptions['after']
  eachFeatureCallbacks = geoJsonOptions['eachFeature']
  markerLayerCallbacks = geoJsonOptions['pointToMarker']
  circleMarkerLayerCallbacks = geoJsonOptions['pointToCircleMarker']
}

// layer event
function layerMouseover (e) {
  var subLayer = e.target
  if (subLayer.bringToFront) {
    // subLayer.bringToFront()
  }
  if (subLayer.setStyle) {
    subLayer.setStyle(geoJsonOptions.highlightStyle || defaultHighlightStyle)
  }
  if (respondsToFunc(mouseoverCallbacks)) {
    mouseoverCallbacks(e.target)
  }
}

function layerMouseout (e) {
  geoJsonlayer.resetStyle(e.target)

  if (respondsToFunc(mouseoutCallbacks)) {
    mouseoutCallbacks(e.target)
  }
}

function layerClick (e) {
  var subLayer = e.target
  if (subLayer.bringToFront) {
    subLayer.bringToFront()
  }
  if (respondsToFunc(clickCallbacks)) {
    clickCallbacks(e.target)
  }
}

function layerDblclick (e) {
  var subLayer = e.target
  if (subLayer.bringToFront) {
    subLayer.bringToFront()
  }
  if (respondsToFunc(dblclickCallbacks)) {
    dblclickCallbacks(e.target)
  }
}

function eachFeature (feature, layer) {
  if (respondsToFunc(eachFeatureCallbacks)) {
    eachFeatureCallbacks(feature, layer)
  }
}

function afterUpdated (data) {
  if (respondsToFunc(afterCallbacks)) {
    afterCallbacks(data)
  }
}

function typeUgLayer (feature, latlng) {
  if (map.getZoom() >= geoJsonOptions.switchLevel) {
    if (respondsToFunc(markerLayerCallbacks)) {
      return markerLayerCallbacks(feature, latlng)
    } else {
      if (respondsToFunc(circleMarkerLayerCallbacks)) {
        return circleMarkerLayerCallbacks(latlng)
      }
    }
  } else {
    if (respondsToFunc(circleMarkerLayerCallbacks)) {
      return circleMarkerLayerCallbacks(latlng)
    }
  }
  return function () {}
}

// public methods
function highlightLayerById (id) {
  var subLayer = findSubLayerById(id)
  if (subLayer) {
    if (subLayer.bringToFront) {
      // subLayer.bringToFront()
    }
    if (subLayer.setStyle) {
      subLayer.setStyle(geoJsonOptions.highlightStyle || defaultHighlightStyle)
    }
  }
}

// get geoJSON layer
function geoJSON (geojson, options) {
  var defaultOptions = {
    onEachFeature: function (feature, layer) {
      eachFeature(feature, layer)
      layer.on({
        mouseover: layerMouseover,
        mouseout: layerMouseout,
        click: layerClick,
        dblclick: layerDblclick
      })
    }
  }
  configOptions(options, defaultOptions)
  configCallbacks()

  var gLayer = L.geoJSON(geojson, geoJsonOptions)
  configLayer(gLayer)
  gLayer['highlightLayer'] = function (id) {
    highlightLayerById(id)
  }

  configMap()
  return gLayer
}

// get uGeoJSON layer
function uGeoJSON (options) {
  var defaultOptions = {
    endpoint: '',
    parameters: {},
    usebbox: true,
    maxRequests: 1,
    enctype: 'urlencoded',
    switchLevel: 19,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    pointToLayer: typeUgLayer,
    onEachFeature: function (feature, layer) {
      eachFeature(feature, layer)
      layer.on({
        mouseover: layerMouseover,
        mouseout: layerMouseout,
        click: layerClick,
        dblclick: layerDblclick
      })
    },
    after: afterUpdated
  }

  configOptions(options, defaultOptions)
  configCallbacks()

  var uGLayer = L.uGeoJSONLayer(geoJsonOptions)
  configLayer(uGLayer)
  uGLayer.on('add', function (e) {
    // console.log('layer added', e, e.target._map)
  })
  uGLayer['highlightLayer'] = function (id) {
    highlightLayerById(id)
  }
  configMap()
  return uGLayer
}

export default {
  geoJSON: geoJSON,
  uGeoJSON: uGeoJSON
}
