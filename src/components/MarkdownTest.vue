<template>
  <div>
    <v-btn @click="save()" variant="text" class="my-2 bg-blue-grey-darken-4">
      {{ isReadonly ? "EDIT" : "SAVE" }}
    </v-btn>
  </div>
  <MdEditor
    v-if="!isReadonly"
    :ref="editorRef"
    v-model="markdownState.text"
    :theme="markdownState.theme"
    :language="markdownState.lang"
  />
  <MdPreview
    v-if="isReadonly"
    :editorId="id"
    :modelValue="markdownState.text"
    :theme="markdownState.theme"
  />
  <MdCatalog v-if="isReadonly" :editorId="id" :scrollElement="scrollElement" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { MdEditor, MdPreview, MdCatalog, config } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";
import ZH_TW from "@vavt/cm-extension/dist/locale/zh-TW";
import type { ExposeParam } from "md-editor-v3";

config({
  editorConfig: {
    languageUserDefined: {
      "zh-TW": ZH_TW,
    },
  },
});
const markdownState = ref({
  text: "",
  theme: "dark",
  lang: "zh-TW",
});
const id = "preview-only";
const scrollElement = document.documentElement;
let isReadonly = ref(false);
const onSave = (v, h) => {
  console.log(v);
  markdownState.value.text = v;
  h.then((html) => {
    console.log(html);
  });
  isReadonly.value = true;
};
const editorRef = ref<ExposeParam>();
function save() {
  editorRef.value?.triggerSave();
  isReadonly.value = !isReadonly.value;
  console.log(markdownState.value.text);
}
// onMounted(() => {
//   console.log(editorRef);
//   editorRef.value?.on('catalog', console.log);
// });
</script>
<style>
.md-editor-dark {
  --md-bk-color: #455a64;
  --md-color: #cfd8dc;
  --md-scrollbar-bg-color: #90a4ae;
}
.md-editor-toolbar-wrapper .md-editor-toolbar-item:hover {
  background-color: #37474f;
}
.md-editor-catalog-active > span,
.md-editor-catalog-link span:hover {
  color: #01579b;
}
</style>
