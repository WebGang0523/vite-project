import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { LoginFormData, LoginResponseData } from '@/api/user/type'

let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
    }
  },
  actions: {
    async userLogin(data: LoginFormData) {
      let res: LoginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data.token
        localStorage.setItem('TOKEN', this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message as string))
      }
    },
  },
  getters: {},
})

export default useUserStore
