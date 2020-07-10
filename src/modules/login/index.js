import http from './http/index.js'
import store from './store/index.js'
import router from './router/index.js'

function config (arg) {
  http.mount.call(arg)
  store.mount.call(arg)
  router.mount.call(arg)
}
const install = (Vue, arg) => {
  if (install.installed) {
    return
  }
  install.installed = true
  config(Object.assign(arg, { $api: Vue.prototype.$api }))
}

export default install
