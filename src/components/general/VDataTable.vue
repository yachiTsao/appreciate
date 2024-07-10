<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="items"
    :loading="loading"
    :loading-text="$t('general.loading')"
    :no-data-text="$t('general.noData')"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :height="height"
    :sort-by="sortBy"
    class="elevation-0 v-custom-data-table"
    :class="{ 'sticky-last-column': fixedLastColumn, 'table-footer--hidden': hideFooter }"
    fixed-header
  >
    <template v-slot:top>
      <!-- Search Box -->
      <!-- <v-toolbar color="gray-60" flat class="pb-3">
        <v-text-field
          v-model="search"
          :placeholder="$t('general.search')"
          density="compact"
          variant="solo"
          prepend-inner-icon="mdi-magnify"
          class="elevation-0"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar> -->
    </template>
    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <th
            :class="{ 'cursor-pointer': column.sortable }"
            @click="() => (column.sortable ? toggleSort(column) : null)"
          >
            <div class="d-flex align-center">
              <span class="mr-2">{{ column.title !== '' ? $t(column.title) : '' }}</span>
              <template v-if="isSorted(column)">
                <v-icon :icon="getSortIcon(column)"></v-icon>
              </template>
            </div>
          </th>
        </template>
      </tr>
    </template>
    <template
      v-for="(header, index) in headers"
      v-slot:[`item.${header.key}`]="{ item }"
      :key="index"
    >
      <!-- 套用 formatDateTime -->
      <!-- <FormatDateTime
        v-if="header.formatDateTime"
        :item="item?.[header.key]"
        :onlyDate="header.onlyDate"
      /> -->
      <!-- 套用 formatLink -->
      <FormatLink
        v-if="header.formatLink"
        :header="header.key"
        :item="item"
        :links="findLinkItemByKey(header.key)?.formatLink"
      />
      <!-- 套用 FormatHover -->
      <FormatHover v-else-if="header.formatHover" :item="item?.[header.key]" />
      <!-- 套用 FormatStatus -->
      <FormatStatus v-else-if="header.formatStatus" :item="item?.[header.key]" />
      <!-- 套用 FormatSwitch -->
      <FormatSwitch
        v-else-if="header.formatSwitch"
        :item="item"
        @change="emitRowItem('changeItem', item)"
      />
      <!-- 套用 FormatSetting -->
      <FormatSetting v-else-if="header.formatSetting" :item="item?.[header.key]" />
      <!-- 套用 FormatPrice -->
      <FormatPrice v-else-if="header.formatPrice" :item="item" />
      <!-- 套用 FormatActions -->
      <div
        v-else-if="header.key === 'actions'"
        class="d-flex"
        :class="tag === '' ? 'justify-end' : 'justify-center'"
      >
        <slot name="prepend-custom-actions" :item="item" />
        <FormatActions
          :actions="actions"
          :item="item"
          :tag="tag"
          @viewItem="emitRowItem('viewItem', item)"
          @editItem="emitRowItem('editItem', item)"
          @deleteItem="emitRowItem('deleteItem', item)"
        />
        <!-- 插槽允許插入其他自定義的按鈕 -->
        <slot name="append-custom-actions" :item="item" />
      </div>
      <!-- 預設顯示 -->
      <span v-else>{{ item?.[header.key] }}</span>
    </template>
    <template v-slot:bottom>
      <div class="v-data-table-footer justify-space-between px-3 py-1" v-if="!hideFooter">
        <div class="v-data-table-footer__items-per-page">
          <span class="pr-2 text-gray-20">{{ $t('general.itemsPerPage') }}</span>
          <v-menu scroll-strategy="close">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :ripple="false"
                min-width="38px"
                color="filter"
                class="px-0 v-custom-button"
              >
                {{ itemsPerPage }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="items in itemsPerPageOptions"
                :key="items.title"
                :value="items.value"
                :class="{ 'bg-primary-blue': items.value === itemsPerPage }"
                class="pa-0 v-footer__select"
                rounded
                @click="switchItemsPerPage(items.value)"
              >
                <v-list-item-title>
                  {{ items.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="length"
            :total-visible="5"
            size="small"
            density="comfortable"
            prev-icon="mdi-arrow-left"
            next-icon="mdi-arrow-right"
            active-color="table-pagination-selected"
            variant="flat"
            rounded="lg"
          ></v-pagination>
        </div>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { computed, ref } from 'vue'
// import { useAuthStore } from '@/stores'
import { VDataTable } from 'vuetify/components/VDataTable'
import FormatDateTime from '@/components/extensions/VDataTable/FormatDateTime.vue'
import FormatLink from '@/components/extensions/VDataTable/FormatLink.vue'
import FormatHover from '@/components/extensions/VDataTable/FormatHover.vue'
import FormatStatus from '@/components/extensions/VDataTable/FormatStatus.vue'
import FormatActions from '@/components/extensions/VDataTable/FormatActions.vue'
import FormatSetting from '@/components/extensions/VDataTable/FormatSetting.vue'
import FormatSwitch from '@/components/extensions/VDataTable/FormatSwitch.vue'
import FormatPrice from '@/components/extensions/VDataTable/FormatPrice.vue'
interface SortByType {
  key: string
  order?: boolean | 'asc' | 'desc'
}
interface Header {
  title: string
  align: 'start' | 'center' | 'end' | undefined
  key: string
  formatDateTime?: boolean
  onlyDate?: boolean
  formatHover?: boolean
  formatStatus?: boolean
  formatLink?: {
    path: string
    query: {
      [key: string]: string
    }
  }
  formatSwitch?: boolean
  formatSetting?: boolean
  formatPrice?: boolean
  sortable?: boolean
}
interface Props {
  headers: Array<Header>
  items: Array<string>
  loading?: boolean
  fixedLastColumn?: boolean
  height?: string | number
  actions?: Array<string>
  hideFooter?: boolean
  sortBy?: Array<SortByType>
  search?: string
  tag?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
  loading: () => false,
  fixedLastColumn: () => false,
  height: () => '60vh',
  actions: () => [],
  hideFooter: () => false,
  search: () => '',
  tag: () => ''
})
const emit = defineEmits<{
  (e: 'viewItem', rowItem: string[]): void
  (e: 'deleteItem', rowItem: string[]): void
  (e: 'editItem', rowItem: string[]): void
  (e: 'changeItem', rowItem: string[]): void
}>()
// const authStore = useAuthStore()
let page = ref(1)
let itemsPerPage = ref(20)
const itemsPerPageOptions = [
  { value: 20, title: '20' },
  { value: 40, title: '40' },
  { value: 60, title: '60' }
]
const length = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage.value)
})
const findLinkItemByKey = (key: string) => {
  return props.headers.find((header) => header.key === key)
}
function emitRowItem(name: any, item: any) {
  emit(name, item)
}
function switchItemsPerPage(newItemsPerPage: number) {
  itemsPerPage.value = newItemsPerPage
}
</script>
<style lang="scss" scoped>
td > a:not(.v-btn):hover {
  text-decoration: underline;
}
</style>
<style lang="scss">
.v-custom-data-table {
  .v-table__wrapper .v-data-table__tr .v-data-table__td,
  .v-table__wrapper > table tbody > tr > td,
  .v-data-table-footer {
    background-color: rgb(var(--v-theme-table));
    color: rgb(var(--v-theme-on-table));
  }
  .v-table__wrapper > table > thead > tr > th {
    background-color: rgb(var(--v-theme-gray-80)) !important;
    color: rgb(var(--v-theme-gray-20));
  }
  &.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    box-shadow: inset 0 -1px 0 rgba(var(--v-theme-gray-100), var(--v-border-opacity));
  }
  &.v-table {
    background: none;
  }
  .v-table__wrapper {
    background: rgb(var(--v-theme-gray-80));
  }
  .v-custom-footer-select .v-field {
    background: rgb(var(--v-theme-filter));
  }
}

.v-custom-data-table .v-data-table-footer {
  font-size: 12px;
  .v-select__selection-text {
    font-size: 12px;
  }
  .v-field__input {
    min-height: 28px;
    padding: 0;
    padding-left: 12px;
  }
  li:not(.v-pagination__prev, .v-pagination__next, .v-pagination__item--is-active) button {
    background: rgb(var(--v-theme-filter)) !important;
  }
}
.v-data-table.v-custom-data-table.sticky-last-column .v-data-table__wrapper {
  position: relative;
}
.v-data-table.v-custom-data-table.sticky-last-column td:last-child,
.v-data-table.v-custom-data-table.sticky-last-column th:last-child {
  position: sticky;
  top: 0;
  right: 0;
  //  z-index: 1;
  z-index: 0;
}
.v-custom-data-table .v-table__wrapper {
  border-radius: 4px;
  //  background-color: rgb(var(--v-theme-gray-60));
  table > thead > tr > th,
  table > tbody > tr > td {
    height: 48px;
  }
}
.v-custom-data-table {
  border: 2px solid rgba(var(--v-theme-gray-80), 0.6);
  .v-table__wrapper.table-footer--hidden {
    border-top: 2px solid rgba(var(--v-theme-gray-80), 0.6);
    border-right: 2px solid rgba(var(--v-theme-gray-80), 0.6);
    border-bottom: 2px solid rgba(var(--v-theme-gray-80), 0.6);
  }
}

.v-custom-data-table .v-table__wrapper > table > tbody > tr:not(.v-data-table-rows-loading) > td,
.v-custom-data-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th,
.v-custom-data-table .v-table__wrapper > table > thead > tr > th {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-custom-data-table
  .v-table__wrapper
  > table
  > tbody
  > tr:not(.v-data-table-rows-loading):last-child
  > td {
  border-bottom: none !important;
}
.v-custom-data-table:not(.table-footer--hidden)
  .v-table__wrapper
  > table
  > tbody
  > tr:last-child:not(.v-data-table-rows-loading)
  > td {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
// .v-custom-data-table .v-table__wrapper > table > tbody > tr > td:first-child {
//  border-left: 2px solid rgba(var(--v-theme-gray-100), 0.4);
// }
// .v-custom-data-table .v-table__wrapper > table > tbody > tr > td:last-child {
//   border-right: 2px solid rgba(var(--v-theme-gray-100), 0.4);
// }
.v-custom-data-table .v-data-table-footer {
  border-top: 2px solid rgba(var(--v-theme-gray-80), 0.6);
  border-radius: 0 0 4px 4px;
  .v-field--center-affix .v-field__append-inner,
  .v-field--center-affix .v-field__clearable,
  .v-field--center-affix .v-field__prepend-inner {
    display: none;
  }
  .v-pagination__item:not(.v-pagination__item--is-active) .v-btn,
  .v-pagination__prev .v-btn,
  .v-pagination__next .v-btn {
    background: transparent;
  }
  .v-btn--disabled.v-btn--variant-elevated .v-btn__overlay,
  .v-btn--disabled.v-btn--variant-flat .v-btn__overlay {
    opacity: 0;
  }
}
.v-list-item.v-footer__select {
  min-height: 36px;
  max-width: 38px;
  text-align: center;
  .v-list-item-title {
    font-size: 12px;
  }
}
.sticky-status {
  position: sticky;
  right: 0;
  background-color: white;
  z-index: 1;
}
.v-custom-button.v-btn:hover > .v-btn__overlay,
.v-custom-button.v-btn[aria-haspopup='menu'][aria-expanded='true'] > .v-btn__overlay,
.v-custom-button.v-btn[aria-haspopup='menu'][aria-expanded='true']:hover > .v-btn__overlay {
  opacity: 0;
}
</style>
