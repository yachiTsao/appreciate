<template>
  <div>
    <v-dialog v-model="dialog" persistent :max-width="width" scrollable scroll-strategy="reposition">
      <v-card elevation="16">
        <v-card-title class="pa-0">
          <v-sheet
            :color="headerColor"
            class="v-text-h3 px-4 py-3 d-flex justify-space-between align-center"
          >
            <div class="dialog-title">
              <slot name="title"></slot>
            </div>
            <v-btn
              v-if="closeIcon"
              variant="text"
              density="compact"
              icon="mdi-close"
              @click="handleCloseIconClick"
            >
            </v-btn>
          </v-sheet>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-sheet :color="bodyColor" class="pa-5">
            <div class="dialog-content">
              <slot name="content"></slot>
            </div>
          </v-sheet>
        </v-card-text>
        <v-card-actions v-if="!hideActions" class="pa-0 dialog-actions">
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { ref, toRefs, watch, computed } from 'vue'
interface Props {
  width?: string | number
  value?: boolean
  headerColor?: string
  bodyColor?: string
  closeIcon?: boolean
  hideActions?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  width: () => 465,
  value: () => false,
  headerColor: () => 'primary-blue',
  bodyColor: () => 'dialog',
  closeIcon: () => true,
  hideActions: () => false
})
const emit = defineEmits<{
  (e: 'update:value', value: boolean): void
  (e: 'close', value: boolean): void
}>()
let dialog = ref(false)
const value = toRefs(props).value
const handleCloseIconClick = () => {
  dialog.value = false
  emit('update:value', false)
  emit('close', true) // 向父元件發送事件
}
watch(
  value,
  (newVal) => {
    // Initial value for showing or hiding the alert applied from the parent component
    dialog.value = newVal
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.dialog-actions {
  background-color: rgba(var(--v-theme-dialog));
}
</style>
