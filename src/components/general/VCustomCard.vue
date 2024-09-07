<template>
  <v-sheet :color="color" class="dashed-border pa-4 fill-height" rounded>
    <div class="v-text-h4 text-primary mb-4">
      <slot name="title"></slot>
    </div>
    <slot name="content"></slot>
  </v-sheet>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { ref } from 'vue'
interface Props {
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'card'
})
</script>
<style lang="scss" scoped>
.dashed-border {
  border: 1px dashed rgb(var(--v-theme-primary));
}
</style>
