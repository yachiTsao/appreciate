<template>
  <div>
    <p class="mb-2 v-text-body-1" v-if="displayName">{{ $t(displayName) }}</p>
    <v-select
      :model-value="mergedGroupItems"
      :items="group"
      :item-title="itemTitle"
      :item-value="itemValue"
      :placeholder="placeholder ? $t(placeholder) : ''"
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
        <p class="custom-no-list-item">{{ $t("general.noData") }}</p>
      </template>
      <template v-slot:item="{ item }">
        <v-list-group :value="item.value">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              color=""
              :title="item.title"
              class="custom-list-item-auto"
              @click.stop
            >
              <template v-slot:prepend>
                <v-checkbox-btn
                  :model-value="isSelectSome(item.value)"
                  :indeterminate="
                    isSelectSome(item.value) && !isSelectAll(item.value)
                  "
                  color="primary-blue"
                  density="compact"
                  @click.stop.prevent="toggleGroupSelection(item.value)"
                ></v-checkbox-btn>
              </template>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(iv, i) in groupItems(item.value)"
            v-bind="iv"
            :title="iv.key"
            :key="i"
            :value="iv.value"
            class="custom-sub-list-item-auto"
            @click.stop="toggleItemSelection(item.value, iv.value)"
          >
            <template v-slot:prepend>
              <v-checkbox-btn
                color="primary-blue"
                :model-value="isItemSelected(item.value, iv.value)"
                density="compact"
                @click.prevent
              ></v-checkbox-btn>
            </template>
          </v-list-item>
        </v-list-group>
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
            <v-btn
              height="32"
              variant="text"
              @click.stop="selectAllGroupItems"
              >{{ $t("general.select.selectAll") }}</v-btn
            >
            <v-btn height="32" variant="text" @click.stop="clearAllGroupItems">
              <v-icon
                density="compact"
                icon="mdi:mdi-reload"
                class="mr-1"
              ></v-icon>
              {{ $t("general.select.cleanAll") }}
            </v-btn>
          </div>
        </v-sheet>
      </template>
      <template v-slot:selection="{ index }">
        <span v-if="index === 0" class="v-text-body-3">
          {{ displaySelection() }}
          {{
            mergedGroupItems.length > 1 && selectionSuffix
              ? $t(selectionSuffix)
              : null
          }}
        </span>
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
interface GroupItem {
  key: string;
  value: string;
}
interface Group {
  group: string;
  items: GroupItem[];
}
interface SelectedData {
  group: string;
  items: string[];
}
interface Props {
  displayName: string;
  placeholder?: string;
  // items: (string | GroupItem[])[]
  items: Group[];
  itemTitle?: string; // The actual key to be displayed
  itemValue?: string; // The actual key to be outputted
  initValue?: any; // Initial selected items
  actionFooter?: boolean; // If show action footer
  searchBar?: boolean; // If show search footer
  clear?: boolean;
  selectionSuffix?: string;
}
const props = withDefaults(defineProps<Props>(), {
  displayName: () => "",
  items: () => [],
  initValue: () => [],
  actionFooter: true,
  searchBar: true,
  clear: false, // Clear all already selected items
  selectionSuffix: "",
});
const emit = defineEmits<{
  (e: "change", initList: string[]): void;
}>();
const search = ref("");
const initValue = toRefs(props).initValue;
// Test selectedItems with orject format
const selectedItems = ref<SelectedData[]>([]);
// const clearable = computed(() => props.clear)
const clearable = toRefs(props).clear;
const group = computed(() => {
  return filteredGroupItems.value.map((item) => item.group);
});
const filteredGroupItems = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return props.items.reduce((filtered, obj) => {
    // 優先比對 group
    const matchingGroup = obj.group.toLowerCase().includes(lowerCaseSearch);
    // 如果 group 符合，直接將整個 group 加入結果
    if (matchingGroup) {
      filtered.push({
        group: obj.group,
        items: obj.items,
      });
    } else {
      // 如果 group 不符合，檢查 items 中的 key 是否有符合的
      const matchingItems = obj.items.filter((item) =>
        item.key.toLowerCase().includes(lowerCaseSearch),
      );
      // 如果 items 中有符合的，將符合的 items 加入結果
      if (matchingItems.length > 0) {
        filtered.push({
          group: obj.group,
          items: matchingItems,
        });
      }
    }
    return filtered;
  }, [] as Group[]);
});
const mergedGroupItems = computed(() => {
  return selectedItems.value.flatMap((group) => group.items);
});
const isSelectAll = (group: string) => {
  const selectedGroup = selectedItems.value.find(
    (item) => item.group === group,
  );
  if (selectedGroup) {
    const selectedItemsSet = new Set(selectedGroup.items);
    const originalGroup = filteredGroupItems.value.find(
      (item) => item.group === group,
    );
    // 使用 every 方法檢查是否每個項目都在 selectedItems 中
    return (
      originalGroup &&
      originalGroup.items.every((item) => selectedItemsSet.has(item.value))
    );
  }
  return false;
};
const isSelectSome = (group: string) => {
  const selectedGroup = selectedItems.value.find(
    (item) => item.group === group,
  );
  if (selectedGroup) {
    const selectedItemsSet = new Set(selectedGroup.items);
    const originalGroup = filteredGroupItems.value.find(
      (item) => item.group === group,
    );
    // 使用 some 方法檢查是否有任一項目在 selectedItems 中
    return (
      originalGroup &&
      originalGroup.items.some((item) => selectedItemsSet.has(item.value))
    );
  }
  return false;
};
function groupItems(group: string) {
  // return specific group items
  return filteredGroupItems.value.find((item) => item.group === group)?.items;
}
function selectAllGroupItems() {
  const selectedItemsMap = new Map<string, Set<string>>();
  // 將 selectedItems 轉換為 Map
  selectedItems.value.forEach((selectedGroup) => {
    selectedItemsMap.set(selectedGroup.group, new Set(selectedGroup.items));
  });
  // 將 filteredGroupItems 中的項目加入到對應的 Set 中
  filteredGroupItems.value.forEach((filteredGroup) => {
    const { group, items } = filteredGroup;
    const selectedGroupSet = selectedItemsMap.get(group) || new Set<string>();
    items.forEach((item) => selectedGroupSet.add(item.value));
    selectedItemsMap.set(group, selectedGroupSet);
  });
  // 將 Map 轉換回 selectedItems
  selectedItems.value = Array.from(selectedItemsMap.entries()).map(
    ([group, items]) => ({
      group,
      items: Array.from(items),
    }),
  );
}
function clearAllGroupItems() {
  const selectedItemsMap = new Map<string, Set<string>>();
  // 將 selectedItems 轉換為 Map
  selectedItems.value.forEach((selectedGroup) => {
    selectedItemsMap.set(selectedGroup.group, new Set(selectedGroup.items));
  });
  // 將 filteredGroupItems 中的項目從對應的 Set 中移除
  filteredGroupItems.value.forEach((filteredGroup) => {
    const { group, items } = filteredGroup;
    const selectedGroupSet = selectedItemsMap.get(group) || new Set<string>();
    items.forEach((item) => selectedGroupSet.delete(item.value));
    selectedItemsMap.set(group, selectedGroupSet);
  });
  // 將 Map 轉換回 selectedItems
  selectedItems.value = Array.from(selectedItemsMap.entries()).map(
    ([group, items]) => ({
      group,
      items: Array.from(items),
    }),
  );
}
function isItemSelected(group: string, item: any) {
  let selectedGroup = selectedItems.value.find((item) => item.group === group);
  if (!selectedGroup) {
    // 如果未找到指定的 group，則建立此 group 及空 items
    selectedGroup = { group, items: [] };
    selectedItems.value.push(selectedGroup);
  }
  return selectedGroup.items.includes(item);
}
function toggleItemSelection(group: string, item: any) {
  const selectedGroupIndex = selectedItems.value.findIndex(
    (g) => g.group === group,
  );
  if (selectedGroupIndex !== -1) {
    const selectedGroup = selectedItems.value[selectedGroupIndex];
    const itemIndex = selectedGroup.items.indexOf(item);
    if (itemIndex !== -1) {
      // 如果已經被選取，則將其從 items 中移除
      selectedGroup.items.splice(itemIndex, 1);
      // 如果 items 已經空了，則將整個 group 從 selectedItems 中移除
      if (selectedGroup.items.length === 0) {
        selectedItems.value.splice(selectedGroupIndex, 1);
      }
    } else {
      // 如果未被選取，則將 item 加進 items 中
      selectedGroup.items.push(item);
    }
  } else {
    // 如果未找到指定的 group，則建立此 group 及空 items
    const newGroup = { group, items: [item] };
    selectedItems.value.push(newGroup);
  }
}
function toggleGroupSelection(group: string) {
  const isSelectedAll = isSelectAll(group);
  const selectedGroupIndex = selectedItems.value.findIndex(
    (item) => item.group === group,
  );
  if (isSelectedAll) {
    // 如果已經全選，則清空
    selectedItems.value[selectedGroupIndex].items = [];
  } else {
    // 如果未全選，則將所有項目放入
    const originalGroup = filteredGroupItems.value.find(
      (item) => item.group === group,
    );
    if (originalGroup) {
      selectedItems.value[selectedGroupIndex].items = [
        ...originalGroup.items.map((item) => item.value),
      ];
    }
  }
}
function displaySelection(): string {
  if (mergedGroupItems.value.length > 1) {
    return mergedGroupItems.value.length.toString();
  } else {
    const selectedValue = mergedGroupItems.value[0];
    for (const groupItem of props.items) {
      const matchingItem = groupItem.items.find(
        (item) => item.value === selectedValue,
      );
      if (matchingItem) {
        return matchingItem.key;
      }
    }
    return "";
  }
}
watch(mergedGroupItems, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit("change", newVal);
  }
});
watch(
  initValue,
  (newVal) => {
    const initValueSet = new Set(newVal);
    const filteredInitGroupItems: SelectedData[] = props.items
      .map((group) => ({
        ...group,
        items: group.items
          .filter((item) => initValueSet.has(item.value))
          .map((item) => item.value),
      }))
      .filter((group) => group.items.length > 0);
    selectedItems.value = filteredInitGroupItems;
  },
  {
    deep: true,
    immediate: true,
  },
);
watch(clearable, (newVal) => {
  selectedItems.value = Array.from(selectedItems.value, ({ group }) => ({
    group,
    items: [],
  }));
});
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
