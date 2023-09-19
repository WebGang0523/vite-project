import router from '@/router'
import setting from './setting'
import useUserStore from './store/modules/user'
import pinia from './store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

let userStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ` | ${setting.title}`
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((route) => {
  nprogress.done()
})
