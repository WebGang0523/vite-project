// 登录接口需要携带参数ts类型
export interface LoginFormData {
  username?: string
  password?: string
  verifyCode?: string
}

interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}

export interface LoginResponseData extends ResponseData {
  data: {
    token?: string
    message?: string
  }
}

export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
    message?: string
  }
}
