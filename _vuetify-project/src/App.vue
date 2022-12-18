<template lang="pug">
v-app
  v-app-bar(color="light-blue darken-1")
    v-app-bar-title 番茄鐘
    v-spacer
    v-btn(icon="mdi-home" variant="text" to="/")
    v-btn(icon="mdi-format-list-bulleted" variant="text" to="/list" )
    v-btn(icon="mdi-cog" variant="text" to="/settings")
    v-btn(:icon="notify ? 'mdi-bell' : 'mdi-bell-off'" variant="text" @click="toggleNotify")

  v-main
    v-container
      router-view(v-slot="{ Component }")
        //- 換頁保留元件不被銷毀
        //- 設定 include 指定要保留的元件
        keep-alive(include="HomeView")
          //- 動態元件，用 is 將元件傳入
          //- 元件名稱
          //- is 可傳整個文件 或 文字 或 變數 (用來傳變數居多)
          //- component(:is) vue3 內建元件
          component(:is="Component")

          //- if (Computnent.include(HomeView)) {
                keep-alive
                component(:is="Component")
              }
</template>
<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
const { notify } = storeToRefs(settings)
const { toggleNotify } = settings
</script>
