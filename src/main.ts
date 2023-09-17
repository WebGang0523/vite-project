import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
//@ts-ignore
import globalComponent from '@/components/index.js'

//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

app.use(globalComponent)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
console.log(import.meta.env)
