export const SET_COLORFIGURE_DATA = 'SET_COLORFIGURE_DATA'
const state = {
  colorFigureData: null
}

const getters = {
  colorFigureData: (state) => {
    return state.colorFigureData
  },
}

const actions = {
}

const mutations = {
  [SET_COLORFIGURE_DATA]: (state, val) => {
    state.colorFigureData = val
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}