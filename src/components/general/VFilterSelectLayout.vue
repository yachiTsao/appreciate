<template>
  <v-sheet class="px-4 py-3 mb-4" color="third" rounded>
    <v-row class="ma-0 align-center justify-space-between">
      <v-col cols="12" md="10" class="pa-0 d-flex align-center">
        <v-icon class="mr-4" icon="mdi:mdi-tune"></v-icon>
        <div v-for="(list, key) in filterList" :key="key">
          <!-- TODO: display-name should adjust to match i18n format -->
          <VFilterSelect
            v-if="!group.includes(key)"
            class="mr-4"
            :display-name="displayName ? displayName[key] : convertCamelCaseToSpaceSeparated(key)"
            :items="list"
            :item-title="'key'"
            :item-value="'value'"
            :init-value="initFilterList[key]"
            :clear="clearFilter"
            @change="(val) => (selectedFilterList[key] = val)"
          />
          <VFilterGroupSelect
            v-else
            class="mr-4"
            :display-name="displayName ? displayName[key] : convertCamelCaseToSpaceSeparated(key)"
            :items="list"
            :item-title="'key'"
            :item-value="'value'"
            :init-value="initFilterList[key]"
            :clear="clearFilter"
            @change="(val) => (selectedFilterList[key] = val)"
          />
        </div>
      </v-col>
      <v-col cols="12" md="2" class="pa-0 d-flex align-center justify-end mt-sm-3 mt-md-0">
        <v-btn
          :disabled="filterForSearch.length === 0"
          color="fourth"
          density="compact"
          icon="mdi-broom"
          variant="text"
          class="mr-3"
          @click="clearFilter = !clearFilter"
        >
        </v-btn>
        <v-btn color="fourth" variant="outlined" class="v-text-body-2 px-2" @click="search()">
          {{ $t('general.search') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { ref, computed, watch } from 'vue'
import { transformToSnakeCase, convertCamelCaseToSpaceSeparated } from '@/utils/mixinTools'
import VFilterSelect from '@/components/general/VFilterSelect.vue'
import VFilterGroupSelect from '@/components/general/VFilterGroupSelect.vue'
interface FilterItem {
  key: string
  value: string
}
interface Group {
  group: string
  items: FilterItem[]
}
interface Props {
  filterList: Record<string, (string | FilterItem[] | Group[])[]>
  initFilterList: Record<string, (string | FilterItem[] | Group[])[]>
  displayName?: Record<string, string> // { <key in filterList>: <display name> }
  group?: string[] // record filterList key which filter type is group
}
const props = withDefaults(defineProps<Props>(), {
  filterList: () => ({}),
  initFilterList: () => ({}),
  group: () => []
})
const emit = defineEmits<{
  (e: 'change', value: any): void
  (e: 'search', value: boolean): void
}>()
const selectedFilterList = ref<Record<string, (string | FilterItem[] | Group[])[]>>({
  ...props.filterList
})
const clearFilter = ref(false)
const filterForSearch = computed(() => {
  let list = []
  for (const key of Object.keys(selectedFilterList.value)) {
    const values = selectedFilterList.value[key]
    if (values.length > 0) {
      list.push({
        dimension_name: transformToSnakeCase(key),
        dimension_values: values
      })
    }
  }
  return list
})
function search() {
  emit('search', true)
}
watch(
  filterForSearch,
  (newVal) => {
    emit('change', newVal)
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
