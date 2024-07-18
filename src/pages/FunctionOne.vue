<template>
  <div>
    <v-sheet width="85%" class="py-8 mx-auto" color="transparent">
      {{ $t('general.list') }}
    <VDataTable
      :headers="headers"
      :items="items"
      :loading="loading"
      :fixed-last-column="true"
      :actions="['view', 'edit', 'delete']"
      @viewItem="(val) => goToAction('view', val)"
      @editItem="(val) => goToAction('edit', val)"
      @deleteItem="(val) => goToAction('delete', val)"
    />
    </v-sheet>
  </div>  
</template>
<script setup lang="ts">
import { ref } from 'vue'
import VDataTable from '@/components/general/VDataTable.vue'
let loading = ref(true)
const headers = ref([
  { title: 'general.date', align: 'start', key: 'date' },
  { title: 'general.name', align: 'start', key: 'name' },
  { title: 'general.type', align: 'start', key: 'type' },
  { title: 'general.dollar', align: 'start', key: 'dollar' },
  { title: '', align: 'end', key: 'actions', sortable: false }
])
const items = ref([
  { date: '2024/07/18', name: 'Pizza', type: 'dinner', dollar: 50 },
  { date: '2024/07/19', name: '滷肉飯', type: 'dinner', dollar: 50 },
  { date: '2024/07/20', name: '牛肉麵', type: 'lunch', dollar: 100 },
  { date: '2024/07/21', name: '麻辣火鍋', type: 'dinner', dollar: 200 },
  { date: '2024/07/22', name: '炒飯', type: 'lunch', dollar: 80}
])
function goToAction(number: number, action: string) {
  switch (action) {
    case 'view':
      console.log(`Viewing item ${number}`)
      break
    case 'edit':
      console.log(`Editing item ${number}`)
      break
    case 'delete':
      console.log(`Deleting item ${number}`)
      break
  }
}
setTimeout(() => {
  loading.value = false
}, 2000)
</script>