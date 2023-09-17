import SvgIcon from './SvgIcon/index.vue'
import type { App, DefineComponent } from 'vue'

const allGlobalComponents = { SvgIcon }

export default {
  install(app: App) {
    // app.component('SvgIcon',SvgIcon)
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, <DefineComponent>allGlobalComponents[key])
    })
  },
}
