/**
 * @file install msg manager as a plugin
 * @author bayesba
 */

import events from './events'

const install = Vue => {
  if (install.installed) {
    return
  }
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $msgMnger: {
      context: null,
      get () {
        return events
      }
    }
  })
}

export default install
