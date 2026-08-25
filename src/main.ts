import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import { initTheme } from './utils/theme'

initTheme()

createApp(App).use(i18n).mount('#app')
