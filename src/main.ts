import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'nprogress/nprogress.css'

import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})

// 注册全局组件
import globalComponents from "@/components"
app.use(globalComponents)

// 清除浏览器默认样式
import '@/styles/index.scss'

/* 测试mock接口
import axios from 'axios'
axios({
    url: "/api/user/login",
    method: "post",
    data: {
        username: "admin",
        password: '123'
    }
})
*/

// 使用路由
import router from './router'
app.use(router)

// 引入路由鉴权文件
import "@/permission"

// 使用pinia
import pinia from './store'
app.use(pinia)

// svg插件需要配置代码
import 'virtual:svg-icons-register'
app.mount('#app')
