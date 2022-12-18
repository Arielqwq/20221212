/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// pwa
import { registerSW } from 'virtual:pwa-register'

registerSW({
// 忽略詢問是否要更新新網站，當偵測到新版本時強制更新
// 都給他空的 func
// 跳出更新的sweet alert
  onNeedRefresh () {},
  // 快取玩所有檔案後要幹嘛
  onOfflineReady () {}
})
const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// 使用 pwa的三條件 1. https/localhost 2.
