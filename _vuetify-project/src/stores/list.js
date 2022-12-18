import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore({
  id: 'list',
  state () {
    return {
      // 新東西
      items: [],
      // 完成的
      finishedItems: [],
      // 目前事項
      currentItem: '',
      // 讓新增的東西往上加
      id: 1,
      // 是否是休息狀態
      break: false,
      // 現在倒數的秒鐘
      timeleft: time
    }
  },
  // 這裡放所有修改 state 的 function(store 有甚麼func 都放這裡)
  actions: {
    addItem (name) {
      // 用this. 指向 state
      this.items.push({
        id: this.id++,
        name,
        edit: false,
        model: name
      })
    },
    editItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].edit = true
    },
    delItem (id) {
      const i = this.getItemIndexById(id)
      this.items.splice(i, 1)
    },
    confirmEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    undoEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    getItemIndexById (id) {
      return this.items.findIndex(item => item.id === id)
    },
    start () {
      // 另一種寫法
      // this.currentItem = this.items[0].name
      // this.items.splice(0, 1)

      // this.currentItem = this.items.shift().name
      // 例:如果有第二件事
      this.currentItem = this.break ? '休息一下' : this.items.shift().name
    },
    countdown () {
      this.timeleft--
    },
    finish () {
      // this.finishedItems.push({
      //   name: this.currentItem,
      //   id: this.id++
      // })
      if (!this.break) {
        this.finishedItems.push({
          name: this.currentItem,
          id: this.id++
        })
      }
      // 清空
      this.currentItem = ''
      // 判斷接下來有沒有東西
      if (this.items.length > 0) {
        // 例:如果有第二件事
        // 原 false = 變成 true
        this.break = !this.break
      }
      // 如果是 true 重新設定
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem (id) {
      const i = this.finishedItems.findIndex(item => item.id === id)
      this.finishedItems.splice(i, 1)
    }
  },
  persist: {
    key: 'pomodoro-list'
  },
  // 這裡放需要 function 計算後產生的資料
  getters: {
  }
})
