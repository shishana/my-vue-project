import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export const SET_MAP_SETTING = 'SET_MAP_SETTING'

const state = {
  mapSetting: JSON.stringify({})
}

const getters = {
  mapSetting: (state) => {
    return JSON.parse(state.mapSetting)
  }
}
const mutations = {
  [SET_MAP_SETTING]: (state, val) => {
    if (val) {
      const mapSettingStr = JSON.stringify(val)
      state.mapSetting = mapSettingStr
      // localStorage.setItem('mapSetting', mapSettingStr)
    } else {
      // get Item
      // const mapSetting = localStorage.getItem('mapSetting') || ''
      // if (mapSetting) {
      //   state.mapSetting = mapSetting
      // } else {
      state.mapSetting = JSON.stringify({
        mapType: 1,
        border: [1, 2],
        locateName: [1],
        siteType: [1],
        pointSetting: [],
        colorPlateFigure: true
      })
      // }
    }
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations
})
