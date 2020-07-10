import Vue from 'vue'
import App from './App.vue'
import vuex from 'vuex'
import axios from 'axios'
import api from './http/index'
import ElementUI from 'element-ui'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

// import '../static/theme/index.css'
import '../static/iconfont/iconfont'
import '../static/iconfont/iconfont.css'
import './styles/index.scss'
import msgMnger from './msg-mnger/index.js'
import './utils/htight-light'
import './utils/el-loading'

import example from './modules/example/index'

import Admin from './layouts/Admin.vue'
import OnlyHeader from './layouts/OnlyHeader.vue'
import FullPage from './layouts/FullPage.vue'


Vue.config.productionTip = false
Vue.use(vuex)
Vue.use(ElementUI)
Vue.use(msgMnger)
Vue.use(api)

Vue.config.productionTip = false
const batchImportModule = function (modules) {
  modules.forEach(element => {
    Vue.use(element, { $router: router, $store: store })
  })
}
batchImportModule([example])

axios.defaults.headers.common['Pragma'] = 'no-cache'

Vue.component('admin-layout', Admin)
Vue.component('onlyHeader-layout', OnlyHeader)
Vue.component('fullPage-layout', FullPage)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
