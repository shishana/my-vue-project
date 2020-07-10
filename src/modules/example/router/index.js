// import $api from '@/http/interface'

// 路由守卫
// const beforeEnter = (to, from, next) => {
//   let token = window.localStorage.getItem('user-token')
//   if (!token) {
//     window.location.href = $api.oauthPath()
//     return
//   }
//   next()
// }
const routes = [
  {
    path: '/example',
    name: 'example',
    meta: { layout: 'admin', title: '示例' },
    redirect: '/example/example-route',
    component: () => import('@/modules/example/views/index.vue'),
    children: [
      {
        path: 'example-route',
        name: 'example-route',
        meta: { layout: 'admin', title: '示例菜单' },
        // beforeEnter: beforeEnter,
        component: () => import('@/modules/example/views/example.vue')
      }
    ]
  }
]

function mount () {
  this.$router.addRoutes(routes)
}

export default {
  mount
}