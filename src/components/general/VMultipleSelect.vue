<template>
  <div>
    <p class="mb-2 v-text-body-1" v-if="displayName">{{ $t(displayName) }}</p>
    <v-select
      v-model="selectedItems"
      :items="filteredItems"
      :item-title="itemTitle"
      :item-value="itemValue"
      :placeholder="placeholder ? $t(placeholder) : ''"
      :rules="[rules]"
      menu-icon="mdi-chevron-down"
      base-color="primary-blue"
      color="primary-blue"
      variant="outlined"
      hide-details="auto"
      density="compact"
      multiple
      class="v-multiple-select"
      flat
    >
      <template v-slot:no-data>
        <p class="custom-no-list-item">{{ $t('general.noData') }}</p>
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" class="custom-list-item-auto">
          <template v-slot:prepend>
            <v-checkbox-btn
              color="primary-blue"
              :model-value="isItemSelected(item.value)"
              density="compact"
              @click.stop="toggleItemSelection(item.value)"
            ></v-checkbox-btn>
          </template>
        </v-list-item>
      </template>
      <template v-slot:prepend-item>
        <v-sheet v-if="searchBar" color="gray-100" class="search-text-field">
          <v-list-item class="custom-list-item-auto">
            <v-text-field
              v-model="search"
              :placeholder="$t('general.search')"
              density="compact"
              variant="plain"
              class="elevation-0"
              single-line
              hide-details
            >
              <template v-slot:prepend-inner>
                <v-icon>mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-list-item>
          <v-divider></v-divider>
        </v-sheet>
      </template>
      <template v-slot:append-item>
        <v-sheet color="gray-100" class="footer" v-if="actionFooter">
          <v-divider></v-divider>
          <div class="d-flex justify-space-between text-primary-blue">
            <v-btn height="32" variant="text" @click.stop="selectAllItems">{{
              $t('general.select.selectAll')
            }}</v-btn>
            <v-btn height="32" variant="text" @click.stop="cleanAllItems">
              <v-icon density="compact" icon="mdi:mdi-reload" class="mr-1"></v-icon>
              {{ $t('general.select.cleanAll') }}
            </v-btn>
          </div>
        </v-sheet>
      </template>
      <template v-slot:selection="{ index }">
        <span v-if="index === 0" class="v-text-body-3">
          {{ displaySelection() }}
          {{ selectedItems.length > 1 && selectionSuffix ? $t(selectionSuffix) : null }}
        </span>
      </template>
    </v-select>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { ref, computed, watch, onMounted, toRefs } from 'vue'
interface FilterItem {
  key: string
  value: string
}
interface Props {
  displayName: string
  placeholder?: string
  items: (string | FilterItem[])[]
  itemTitle?: string // The actual key to be displayed
  itemValue?: string // The actual key to be outputted
  initValue?: any // Initial selected items
  actionFooter?: boolean // If show action footer
  searchBar?: boolean // If show search footer
  clear?: boolean
  selectionSuffix?: string
  rules?: string | boolean
}
const props = withDefaults(defineProps<Props>(), {
  displayName: () => '',
  items: () => [],
  initValue: () => [],
  actionFooter: true,
  searchBar: true,
  clear: false, // Clear all already selected items
  rules: true
})
const emit = defineEmits<{
  (e: 'change', selectedItems: string[]): void
}>()
const search = ref('')
const initValue = toRefs(props).initValue
// const selectedItems = ref<any[]>([])
const selectedItems = ref<any>('')
const clearable = computed(() => props.clear)
const selectAll = computed(() => selectedItems.value.length === props.items.length)
const selectSome = computed(() => selectedItems.value.length > 0)
const filteredItems = computed(() => {
  if (!search.value) {
    return props.items
  } else {
    const lowerCaseSearch = search.value.toLowerCase()
    if (props.itemTitle) {
      return props.items.filter((item) =>
        item[props.itemTitle].toLowerCase().includes(lowerCaseSearch)
      )
    } else {
      return props.items.filter((item) => item.toLowerCase().includes(lowerCaseSearch))
    }
  }
})
function selectAllItems() {
  const selectedValues = new Set(selectedItems.value)

  filteredItems.value.forEach((item) => {
    const valueToAdd = props.itemValue ? item[props.itemValue] : item.value
    if (valueToAdd) {
      selectedValues.add(valueToAdd)
    }
  })

  selectedItems.value = Array.from(selectedValues)
}
function cleanAllItems() {
  const selectedValues = new Set(selectedItems.value)

  filteredItems.value.forEach((item) => {
    const valueToRemove = props.itemValue ? item[props.itemValue] : item.value
    selectedValues.delete(valueToRemove)
  })

  selectedItems.value = Array.from(selectedValues)
}
function displaySelection() {
  if (selectedItems.value.length > 1) {
    return selectedItems.value.length
  } else {
    const selectedValue = selectedItems.value[0]
    const selectedItem = props.items.find((item) => item[props.itemValue] === selectedValue)
    return selectedItem[props.itemTitle]
  }
}
function isItemSelected(item: any) {
  return selectedItems.value.includes(item)
}
function toggleItemSelection(item: any) {
  if (isItemSelected(item)) {
    selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem !== item)
  } else {
    selectedItems.value = [...selectedItems.value, item]
  }
}
watch(selectedItems, (newVal: string[], oldVal: string[]) => {
  if (newVal !== oldVal) {
    emit('change', newVal)
  }
})
watch(
  initValue,
  (newVal) => {
    if (props.itemValue) {
      selectedItems.value = newVal.filter((selectedItem) =>
        props.items.some((item) => item[props.itemValue] === selectedItem)
      )
    } else {
      selectedItems.value = newVal.filter((item: any) => props.items.includes(item))
    }
  },
  {
    deep: true,
    immediate: true
  }
)
watch(clearable, () => {
  selectedItems.value = []
})
</script>
<style lang="scss" scoped>
// .v-multiple-select {
//   max-width: 65px;
// }
.v-list-item-title {
  font-size: 12px;
  min-height: 36px;
}
</style>
