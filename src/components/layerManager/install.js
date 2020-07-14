/**
 * @file install layer manager as a plugin
 * @author bayesba
 */

import BaLayerManager from './baLayerManager'

const install = (Vue, mapKeys = ['$layerManager']) => {
  let lms = {}
  mapKeys.map(e => {
    // 初始化地图管理器
    lms[e] = new BaLayerManager(null)
  })
  if (install.installed) {
    return
  }
  install.installed = true
  // 混入
  Vue.mixin({
    beforeCreate () {
      for (const key in lms) {
        // if (lms.hasOwnProperty(key)) {
        if (Object.prototype.hasOwnProperty.call(lms, key)) {
          // 可以在其他组件上监听图例的变化
          Vue.util.defineReactive(this, key + 'Legend', lms[key].legend)
        }
      }
    }
  })
  // 将地图管理器加在Vue的原型上
  for (const key in lms) {
    // if (lms.hasOwnProperty(key)) {
    if (Object.prototype.hasOwnProperty.call(lms, key)) {
      Object.defineProperty(Vue.prototype, key, {
        get () { return lms[key] }
      })
    }
  }
}

export default install
