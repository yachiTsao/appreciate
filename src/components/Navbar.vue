<template>
  <div>
    <v-toolbar color="header" height="60">
      <v-toolbar-title class="v-text-h3">
        <div class="d-flex align-center">
          <v-img class="mr-4" aspect-ratio="16/9" inline cover></v-img>
          <span class="font-weight-bold"> {{ $t("general.title") }} </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs v-model="tab">
        <v-tab
          v-for="item in items"
          :key="item.value"
          :text="$t(item.title)"
          :value="item.value"
          @click="
            item.value === 'HOME'
              ? router.push('/')
              : router.push(
                  `/function/${item.value.toLocaleLowerCase()}`,
                )
          "
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-layout class="px-4 align-center justify-end">
        <div class="pr-2">
          <v-btn icon>
            <v-icon>{{
              darkMode ? "mdi-weather-night" : "mdi-weather-sunny"
            }}</v-icon>
          </v-btn>
        </div>
        <div
          class="d-flex align-center justify-center text-gray-20 custom-switch-language"
        >
          <v-icon size="20" class="pr-2">mdi-web</v-icon>
          <v-select
            v-model="lang"
            :items="langOpts"
            item-title="title"
            item-value="value"
            variant="plain"
            density="compact"
            menu-icon=""
            flat
            hide-details
            class="language-list"
          >
            <template v-slot:item="{ props }">
              <v-list-item
                v-bind="props"
                active-class="bg-primary-blue"
                rounded
              ></v-list-item>
            </template>
          </v-select>
        </div>
        <v-btn icon density="comfortable">
          <v-icon icon="mdi:mdi-help-circle-outline" size="20"></v-icon>
        </v-btn>
      </v-layout>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, reactive, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router'
let { locale } = useI18n();
let tab = ref('');
const route = useRoute()
const items = [
  {
    title: "general.home",
    value: "HOME",
  },
  {
    title: "general.functionOne",
    value: "ONE",
  },
  {
    title: "general.functionTwo",
    value: "TWO",
  },
  {
    title: "general.functionThree",
    value: "THREE",
  },
  {
    title: "general.functionFour",
    value: "FOUR",
  },
  {
    title: "general.functionFive",
    value: "FIVE",
  },
];
const authStore = useAuthStore();
const { lang: authLang, theme: authTheme } = storeToRefs(authStore);
let lang = ref(authLang)
let darkMode = ref(authTheme)
const langOpts = reactive([
  { value: "en-US", title: "English" },
  { value: "zh-TW", title: "中文(繁體)" },
  { value: "zh-CN", title: "中文(簡體)" },
])
function toggleTheme() {
  theme.global.name.value = themeMode.value === 'Dark' ? 'customDarkTheme' : 'customLightTheme'
  // theme.global.name.value = theme.global.current.value.dark ? 'customLightTheme' : 'customDarkTheme'
  // darkMode = theme.global.name.value === 'customDarkTheme'
}
function initTab() {
  tab.value = route.path === '/' ? 'HOME' : route.path.split('/')[2].toUpperCase()
}
watch(
  lang,
  (newVal) => {
    localStorage.setItem("lang", newVal);
    locale.value = lang.value ? lang.value : newVal;
  },
  {
    immediate: true,
  }
)
watch(() => route.path, (newVal) => {
  tab.value = route.path === '/' ? 'HOME' : route.path.split('/')[2].toUpperCase()
},
{
  immediate: true,
  deep: true
})
onMounted(() => {
  initTab()
})
</script>
<style lang="scss" scoped>
.language-list .v-field__input {
  padding: 0 0 0 4px;
}
.language-list .v-field {
  color: rgb(var(--v-theme-gray-20));
}
.language-list .v-field--appended {
  --v-field-padding-end: 0;
  padding-inline-end: 0;
}
.v-input--density-compact {
  --v-input-padding-top: 0 !important;
}
.custom-switch-language {
  min-width: 30vh;
}
.v-btn.v-btn--density-default{
  height: 48px;
}
</style>
