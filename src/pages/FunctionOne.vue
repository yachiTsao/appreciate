<template>
  <div>
    <v-sheet width="85%" class="py-8 mx-auto" color="transparent">
      Table List
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
  { title: 'general.number', align: 'start', key: 'number' },
  { title: 'general.name', align: 'start', key: 'name' },
  { title: '', align: 'end', key: 'actions', sortable: false }
])
const items = ref([
  { number: 1, name: 'John Doe' },
  { number: 2, name: 'Jane Doe' }
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