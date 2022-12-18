import { defineStore } from 'pinia'
// 定義一個pinia資料

// 取名稱建議useXXXstore，這樣才有府和他的取名風格
export const useSettingsStore = defineStore({
  // 設定這個 store 的 id
  id: 'settings',
  // 這個 store 存了那些資料
  state () {
    return {
      alarms: [
        { id: 1, name: 'Alarm', file: new URL('@/assets/alarm.mp3', import.meta.url).href }, { id: 2, name: 'Yay', file: new URL('@/assets/yay.mp3', import.meta.url).href }
      ],
      selectedAlarms: 1,
      notify: false

    }
  },
  actions: {
    // 文件說要用 promise 寫
    async toggleNotify () {
      // 如果一開始是false，且判斷有沒有支援通知有沒有一個key:Notification
      if (!this.notify && 'Notification' in window) {
        // 跟瀏覽器請求權限
        const permission = await Notification.requestPermission()
        // 如果得到的權限是允許
        if (permission === 'granted') {
          // 就打開通知
          this.notify = true
        }
      } else {
        this.notify = false
      }
    }
  },
  // pinia 的 computed
  getters: {
    selectedAlarmFile () {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarms)
      return this.alarms[i].file
    }
  },
  persist: {
    key: 'pomodoro-settings',
    paths: ['selectedAlarms', 'notify']
  }
})
