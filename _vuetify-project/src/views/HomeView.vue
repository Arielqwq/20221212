<template lang="pug">
v-row#home
  v-col(cols="12")
    h1 {{ currentText }}
    h1 {{ currentTime }}
  v-col(cols="12")
    v-btn(v-if="status !== 1" icon="mdi-play" variant="text" @click="startTimer")
    v-btn(v-if="status === 1" icon="mdi-pause" variant="text" @click="pauseTimer")
    v-btn(v-if="currentItem.length > 0" icon="mdi-skip-next" variant="text" @click="finishTimer")
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

onUnmounted(() => {
  console.log('Home unmounted')
})

const list = useListStore()
const { currentItem, items, timeleft } = storeToRefs(list)
const { start, countdown, finish } = list

const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)

// 用數字當目前的狀態 => 0 = 停止，1 = 倒數中，2 = 暫停
// const stuatsCode = {
//   STOP: 0,
//   COUNTDOWN: 1,
//   PAUSE: 2
// }
// const status = ref(stuatsCode)
const status = ref(0)

let timer = 0
const startTimer = () => {
  if (status.value === 0 && items.value.length > 0) {
    start()
  }
  // 不管上面有沒有過都執行，判斷有沒有拿到東西
  if (currentItem.value.length > 0) {
    status.value = 1
    timer = setInterval(() => {
      countdown()
      if (timeleft.value === 0) {
        // clearInterval(timer)
        // status.value = 0
        finishTimer()
      }
      // 每秒去執行這 function
    }, 1000)
  }
}
const pauseTimer = () => {
  status.value = 2
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = 0
  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()
  if (notify.value) {
    // eslint-disable-next-line
    const notification = new Notification('事項完成', {
      body: currentText.value,
      icon: 'https://github.com/wdaweb.png'
    })
  }
  // finish 順序要改
  finish()
  // 如果還有東西就自動開始倒數
  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  // 如果正在倒數，顯示現在事項的名字，如果
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})

const currentTime = computed(() => {
  // 除以60，查看剩幾分鐘，然後轉文字，空的地方從第二位開始補 0
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>
