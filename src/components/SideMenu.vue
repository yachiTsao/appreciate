<template>
    <!-- <v-navigation-drawer
      v-if="!drawer"
      width="36"
      :border="0"
      :rail="drawer"
      class="v-custom-navigation-drawer"
      permanent
    >
      <v-sheet color="sidemenu" height="100%" class="py-5 d-flex justify-center">
        <v-btn
          variant="text"
          color="sidemenu-icon"
          density="compact"
          :icon="drawer ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'"
          @click.stop="drawer = true"
        ></v-btn>
      </v-sheet>
    </v-navigation-drawer> -->
    <v-navigation-drawer
      v-model="drawer"
      :border="0"
      color="sidemenu"
      class="v-custom-navigation-drawer"
      :rail="!drawer"
      permanent
    >
      <v-list-item nav class="pt-4 pb-3">
        <template v-slot:append>
          <v-btn
            variant="text"
            color="sidemenu-icon"
            density="compact"
            :icon="drawer ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'"
            @click.stop="drawer = false"
          ></v-btn>
        </template>
        <template v-slot:title>
          <div class="v-text-h3 ps-2">{{ $t(navTitle) }}</div>
        </template>
      </v-list-item>
      <v-list density="compact" nav>
        <template v-for="(item, index) in items" :key="index">
          <template v-if="isGroupItem(item)">
            <v-list-group :value="item.group.value" :fluid="false">
              <template v-slot:activator="{ props, isOpen }">
                <v-list-item
                  v-bind="props"
                  :title="$t(item.group.title)"
                  :prepend-icon="item.group.icon"
                  :variant="isOpen ? 'flat' : 'text'"
                  active-class="bg-sidemenu-group"
                >
                </v-list-item>
              </template>
              <v-list-item
                v-for="(subItem, subIndex) in item.subItems"
                :key="subIndex"
                :value="subItem.value"
                :prepend-icon="subItem.icon"
                :to="subItem.path"
                active-class="bg-sidemenu-selected"
                :active="currentPath === subItem.path"
                class="mb-1"
              >
                <template v-slot:title>
                  <div>{{ $t(subItem.title) }}</div>
                </template>
              </v-list-item>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item
              :value="item.value"
              :prepend-icon="item.icon"
              :to="item.path"
              active-class="bg-sidemenu-selected"
              :active="currentPath === item.path"
            >
              <template v-slot:title>
                <div :class="{ 'ps-10': !item.icon }">
                  {{ $t(item.title) }}
                </div>
              </template>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  interface SubItem {
    icon?: string
    value: string
    title: string
    path?: string
  }
  interface Group {
    value: string
    title: string
    icon: string
  }
  interface GroupItem {
    group: Group
    subItems: SubItem[]
  }
  interface ItemWithoutSubItems {
    value: string
    title: string
    icon: string
    path?: string
  }
  type MenuItem = GroupItem | ItemWithoutSubItems
  interface Props {
    navTitle: string
    items: MenuItem[]
  }
  const props = withDefaults(defineProps<Props>(), {
    navTitle: () => '',
    items: () => []
  })
  const currentPath = computed(() => route.path)
  let drawer = ref(true)
  const isGroupItem = (item: MenuItem): item is GroupItem => {
    return 'group' in item
  }
  const isSideMenuOpen = ref(false)
  </script>
  <style lang="scss">
  .v-custom-navigation-drawer .v-list-item--active > .v-list-item__overlay {
    opacity: 0 !important;
  }
  .v-custom-navigation-drawer {
    .v-list-group__items .v-list-item {
      padding-inline-start: calc(-10px + var(--indent-padding)) !important;
    }
    .v-list-item__append > .v-icon ~ .v-list-item__spacer,
    .v-list-item__prepend > .v-icon ~ .v-list-item__spacer {
      width: 12px;
    }
  }
  </style>
  