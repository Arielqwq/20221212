<template lang="pug">
v-row#list
  v-col(cols="12")
    h1.text-center 待辦事項
  v-col(cols="12")
    v-text-field(ref="input" v-model="newItem" label="新增事項" :rules="[rules.required, rules.length]" @keydown.enter="onInputSubmit")
      template(#append)
        v-btn(icon="mdi-plus" variant="text" @click="onInputSubmit")
    v-table
      thead
        tr
          th 名稱
          th 操作
      tbody
        tr(v-if="items.length === 0")
          td.text-center(colspan="2") 沒有事項
        tr(v-for="item in items" v-else :key="item.id" ref="editInputs")
          td
            v-text-field(v-if="item.edit" v-model="item.model" autofocus :rules="[rules.required, rules.length]")
            span(v-else) {{ item.name }}
          td
            span(v-if="item.edit")
              v-btn(icon="mdi-check" variant="text" color="green" @click="confirmEditItem(item.id)")
              v-btn(icon="mdi-undo" variant="text" color="red" @click="undoEditItem(item.id)")
            span(v-else)
              v-btn(icon="mdi-pencil" variant="text" color="green" @click="editItem(item.id)")
              v-btn(icon="mdi-delete" variant="text" color="red" @click="delItem(item.id)")
  v-divider
  v-col(cols="12")
    h1.text-center 已完成事項
  v-col(cols="12")
    v-table
      thead
        tr
          th 名稱
          th 操作
      tbody
        tr(v-if="finishedItems.length === 0")
          td.text-center(colspan="2") 沒有事項
        tr(v-for="item in finishedItems" v-else :key="item.id" ref="editInputs")
          td {{ item.name }}
          td
            v-btn(icon="mdi-delete" variant="text" color="red" @click="delFinishedItem(item.id)")
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'

const list = useListStore()
const { addItem, editItem, delItem, confirmEditItem, undoEditItem, delFinishedItem } = list
const { items, finishedItems } = storeToRefs(list)

const newItem = ref('')
const input = ref(null)
const editInputs = ref([])

const rules = {
  required (v) {
    // !v 是先把文字轉布林值(當有文字，但轉布林值時，出來的值會是錯(falsr)的，但這樣是不對的，有內容會是true，所以再加!，再轉回我們需要的值)
    return !!v || '欄位必填'
  },
  length (v) {
    return v.length >= 3 || '必須三個字以上'
  }
}

const onInputSubmit = async () => {
  const valid = await input.value.validate()
  console.log(valid)
  if (valid.lengh > 0) return
  addItem(newItem.value)
  // 原本打完事項後點旁邊會出現錯誤(提醒輸入內容)，須修正，文件內v-text- 的 exposed裡提到的controlRef無法用，所以用下面這行修正錯誤，
  // $el 可以抓到元件的 html 元素，再使用 querySelector 抓到 input 標籤，再用blur()取消 focus 就可解決

  input.value.$el.querySelector('input').blur()

  // 改值
  // list.$patch(state => {
  //   state.items.push({
  //     id,
  //     name: newItem.value,
  //     edit: false,
  //     model: newItem.value
  //   })
  //   state.id++
  // })

  // 不呼叫function 的改值
  // items.value.push({
  //   id: id.value++,
  //   name: newItem.value,
  //   edit: false,
  //   model: newItem.value
  // })
  input.value.reset()
}

</script>
