import { createPinia } from 'pinia'
// 設定pinia使用那些套件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 設定pinia使用那些套件
pinia.use(piniaPluginPersistedstate)
export default pinia
