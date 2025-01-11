<template>
  <div>
    <p class="mb-2 v-text-body-1" :class="displayColor" v-if="displayName">
      {{ $t(displayName) }}
    </p>
    <v-select
      v-model="selectedItem"
      :items="filteredItem"
      :item-title="itemTitle"
      :item-value="itemValue"
      :placeholder="placeholder ? $t(placeholder) : ''"
      :rules="[rules]"
      :error="error"
      menu-icon="mdi-chevron-down"
      base-color="primary-dark"
      color="primary-dark"
      variant="outlined"
      hide-details="auto"
      density="compact"
      :class="[
        'custom-single-select',
        { 'v-single-select': useVSingleSeclctClass },
      ]"
      flat
      @blur="handleBlurEvent"
    >
      <template v-slot:no-data>
        <p class="custom-no-list-item">{{ $t("general.noData") }}</p>
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" class="custom-list-item-auto">
        </v-list-item>
      </template>
      <template v-slot:prepend-item>
        <v-sheet v-if="searchBar" color="primary" class="search-text-field">
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
    </v-select>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
import { ref, computed, watch, onMounted, toRefs } from "vue";
interface FilterItem {
  key: string;
  value: string;
}
interface Props {
  displayName?: string;
  placeholder?: string;
  items: (string | FilterItem[])[];
  itemTitle?: string | Function; // The actual key to be displayed
  itemValue?: string; // The actual key to be outputted
  initValue?: any; // Initial selected items
  searchBar?: boolean; // If show search footer
  clear?: boolean;
  selectionSuffix?: string;
  rules?: string | boolean;
  error?: boolean;
  displayColor?: string;
  useVSingleSeclctClass?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  // displayName: () => '',
  items: () => [],
  initValue: () => [],
  searchBar: true,
  clear: false, // Clear all already selected items
  rules: true,
  displayColor: "text-primary-dark",
  useVSingleSeclctClass: false,
});
const emit = defineEmits<{
  (e: "change", selectedItem: string): void;
  (e: "blurEvent"): void;
}>();
const search = ref("");
const initValue = toRefs(props).initValue;
// const selectedItem = ref<any[]>([])
const selectedItem = ref<any>("");
const clearable = computed(() => props.clear);
const filteredItem = computed(() => {
  if (!search.value) {
    return props.items;
  } else {
    const lowerCaseSearch = search.value.toLowerCase();
    if (props.itemTitle) {
      return props.items.filter((item) =>
        item[props.itemTitle].toLowerCase().includes(lowerCaseSearch),
      );
    } else {
      return props.items.filter((item) =>
        item.toLowerCase().includes(lowerCaseSearch),
      );
    }
  }
});
function handleBlurEvent() {
  emit("blurEvent");
}
watch(selectedItem, (newVal: string, oldVal: string) => {
  if (newVal !== oldVal) {
    if (props.itemValue) {
      // console.log('newVal', newVal, newVal?.[props.itemValue]);
      emit(
        "change",
        newVal?.[props.itemValue] ? newVal?.[props.itemValue] : newVal,
      );
    } else {
      emit("change", newVal);
    }
  }
});
watch(
  initValue,
  (newVal) => {
    if (props.itemValue) {
      const selected = props.items.find(
        (item) => item[props.itemValue] === newVal,
      );
      selectedItem.value = selected;
    } else {
      selectedItem.value = props.items.includes(newVal) ? newVal : "";
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
watch(clearable, () => {
  selectedItem.value = "";
});
</script>
<style lang="scss">
.custom-single-select {
  height: 40px;
}
</style>
<style lang="scss" scoped>
.v-list-item-title {
  font-size: 12px;
  min-height: 36px;
}
</style>
