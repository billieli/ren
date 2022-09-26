import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (!store.getters.userId) {
    store.dispatch('user/getUserInfo')
  }
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
