// urls for tile layer
const googleTileUrl = 'http://mt0.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&scale=2&x={x}&y={y}&z={z}'
const baiduTileDefault = 'http://online{s}.map.bdimg.com/tile/?qt=tile&styles=pl&scaler=2&x={x}&y={y}&z={z}'
const baiduTileLight = 'http://api1.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20180810&scale=2&customid=grayscale'
const baiduTileDark = 'http://api1.map.bdimg.com/customimage/tile?&x={x}&x={x}&z={z}&udt=20180810&scale=2&customid=midnight'
const baiduSatelliteMap = 'https://maponline0.bdimg.com/starpic/?qt=satepc&u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20200618'
const autonaviSatelliteMap = 'https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
function baiduTileUrl (tileStyle) {
  switch (tileStyle) {
    case 'default':
      return baiduTileDefault
    case 'light':
      return baiduTileLight
    case 'dark':
      return baiduTileDark
    case 'baiduSatellite':
      return baiduSatelliteMap
    case 'autonaviSatellite':
      return autonaviSatelliteMap
    default:
      return baiduTileDefault
  }
}

export default {
  google_tile_url: googleTileUrl,
  baiduTile: baiduTileUrl
}
