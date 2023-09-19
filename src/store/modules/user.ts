import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asyncRoute } from '@/router/routes'
import router from '@/router'

// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: LoginFormData) {
      let res: LoginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data.token as string
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message as string))
      }
    },

    async userInfo() {
      let res: UserInfoResponseData = await reqUserInfo()

      if (res.code === 200) {
        this.username = res.data.username as string
        this.avatar = res.data.avatar as string

        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute]
        userAsyncRoute.forEach((route: any) => {
          router.addRoute(route)
        })

        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message as string))
      }
    },

    async userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
