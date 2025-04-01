import App from '@/App.vue'
import router from '@/router'
import { createApp } from 'vue'
import { directivePlugin } from './directives/index'
import pinia from './stores'

// 初始化样式
import '@/assets/css/app.css'
// Vant 桌面端适配
import '@vant/touch-emulator'

const app = createApp(App)

app.use(directivePlugin)
app.use(router)
app.use(pinia)
app.mount('#app')
