<template>
  <div>
    <div class="mb-2 d-flex align-center">
      <slot name="prefix"></slot>
      <p class="v-text-body-1" v-if="displayName" :class="displayColor">{{ $t(displayName) }}</p>
      <slot name="suffix"></slot>
      <slot name="append"></slot>
    </div>
    <v-text-field
      v-model="text"
      base-color="primary"
      color="primary"
      :rules="[rules]"
      density="compact"
      :placeholder="placeholder ? $t(placeholder) : ''"
      :error="error"
      variant="outlined"
      :hide-details="hideDetails"
    ></v-text-field>
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
interface Props {
  displayName?: string
  placeholder?: string
  initValue?: any // Initial selected items
  rules?: string | boolean | Function
  error?: boolean
  hideDetails?: boolean | string
  displayColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  initValue: () => '',
  rules: true,
  error: false,
  hideDetails: 'auto',
  displayColor: 'text-fourth'
})
const emit = defineEmits<{
  (e: 'change', text: string): void
}>()
const initValue = toRefs(props).initValue
let text = ref('')
watch(text, (newVal: string, oldVal: string) => {
  if (newVal !== oldVal) {
    emit('change', newVal)
  }
})
watch(
  initValue,
  (newVal) => {
    if (newVal !== text.value) {
      text.value = newVal
    }
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
