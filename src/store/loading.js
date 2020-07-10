import Vue from 'vue'
const MUTATE_LOADING_STACK = 'MUTATE_LOADING_STACK'

const state = {
  // 主栈
  loadingStack: [],
  // 模块栈
  loadingModuleStack: {}
}

const getters = {
  // loadingGetter: state => state.loadingStack.length !== 0
  loadingGetter: state => {
    // 计算 loading 栈内容总个数
    let stackLengthCount = 0
    stackLengthCount += state.loadingStack.length
    for (const module in state.loadingModuleStack) {
      if (!Object.prototype.hasOwnProperty.call(state.loadingModuleStack, module)) {
      // if (!state.loadingModuleStack.hasOwnProperty(module)) {
        continue
      }
      const moduleStack = state.loadingModuleStack[module]
      stackLengthCount += moduleStack.length
    }
    return stackLengthCount !== 0
  },
  loadingModuleGetter: state => {
    let _result = {}
    for (const module in state.loadingModuleStack) {
      if (!Object.prototype.hasOwnProperty.call(state.loadingModuleStack, module)) {
      // if (!state.loadingModuleStack.hasOwnProperty(module)) {
        continue
      }
      const moduleStack = state.loadingModuleStack[module]
      _result[module] = !!moduleStack.length
    }
    return _result
  }
}

const mutations = {
  [MUTATE_LOADING_STACK]: (state, { flag, module }) => {
    // console.log('mutate loading stack, flag is: ', flag)
    // 当不传递模块信息时, 修改 主栈的 loading 值
    if (!module) {
      if (flag === 'start') {
        state.loadingStack.push(1)
      } else if (flag === 'end') {
        state.loadingStack.pop()
      }
    } else {
      if (!Object.prototype.hasOwnProperty.call(state, module)) {
      // if (!state.hasOwnProperty(module)) {
        Vue.set(state.loadingModuleStack, module, [])
      }
      if (flag === 'start') {
        state.loadingModuleStack[module].push(1)
      } else if (flag === 'end') {
        state.loadingModuleStack[module].pop()
        // // 如果模块栈已经置空, 则清除掉属性
        // if (state.loadingModuleStack[module].length === 0) {
        //   Vue.delete(state.loadingModuleStack, module)
        // }
      }
    }
  }
}

export default {
  namespaced: false,
  state,
  getters,
  mutations
}