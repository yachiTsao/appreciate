<template>
  <v-dialog
    v-model="showDialog"
    width="360"
    max-width="360"
    persistent
    scroll-strategy="reposition"
  >
    <v-card class="pa-5 pt-4" color="alert">
      <div class="d-flex justify-end">
        <v-btn
          variant="text"
          density="compact"
          icon="mdi-close"
          size="24"
          @click="handleCloseClick()"
        >
        </v-btn>
      </div>
      <div>
        <div class="d-flex flex-column align-center">
          <v-icon color="error" size="56" class="mb-3">mdi-information</v-icon>
          <p class="v-text-h3 mb-3 text-alert-title">
            {{ $t('general.deletionDialog.title') }}
          </p>
          <p class="mb-6 v-text-body-2 text-center">
            {{ context ? $t(context) : $t('general.deletionDialog.context') }}
          </p>
        </div>
        <v-row class="ma-0 align-center justify-center">
          <v-btn
            class="mr-3"
            height="34"
            color="primary-blue"
            variant="outlined"
            @click="handleCloseClick()"
          >
            {{ $t('general.cancel') }}
          </v-btn>
          <v-btn
            height="34"
            color="error"
            variant="outlined"
            :loading="loading"
            @click="handleDeleteClick()"
          >
            {{ $t('general.deleted') }}
          </v-btn>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { ref, toRefs, watch } from 'vue'
interface Props {
  value?: boolean //由父元件決定此元件的開關
  loading?: boolean
  context?: string
}
const props = withDefaults(defineProps<Props>(), {
  value: () => false,
  loading: () => false,
  context: () => ''
})
const emit = defineEmits(['delete', 'close'])
let showDialog = ref(false)
const value = toRefs(props).value
const handleDeleteClick = () => {
  // 向父元件發送事件
  emit('delete', true)
}
const handleCloseClick = () => {
  // 向父元件發送事件
  emit('close', true)
}
watch(
  value,
  (newVal) => {
    // Initial value for showing or hiding the alert applied from the parent component
    showDialog.value = newVal
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
