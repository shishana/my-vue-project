const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'fullPage' },
    component: () => import('@/modules/login/views/login.vue')
    // component: () => import('@/modules/login/views/login-wb.vue')
  },
  {
    path: '/change-pwd',
    name: 'change-pwd',
    meta: { layout: 'onlyHeader' },
    component: () => import('@/modules/login/views/change-pwd.vue')
  }
]

function mount () {
  this.$router.addRoutes(routes)
}

export default {
  mount
}
