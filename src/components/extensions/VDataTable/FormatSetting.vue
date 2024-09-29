<template>
  <div>
    <v-btn
      class="mx-1 px-2"
      :color="action.color"
      variant="outlined"
      :disabled="disabled"
    >
      <v-icon class="mr-1" size="20">{{ action.icon }}</v-icon>
      {{ $t(action.title) }}
    </v-btn>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
import { onMounted, ref } from "vue";
interface Props {
  item: string;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => "",
});
const action = {
  icon: "mdi-file-code-outline",
  color: "primary-blue",
  title: "product.product.application",
};
const disabled = ref(false);
function isDisable() {
  if (props.item.length === 0) {
    disabled.value = true;
  }
}
onMounted(async () => {
  isDisable();
});
// const props = withDefaults(defineProps<Props>(), {
//   actions: () => []
// })
// const emit = defineEmits<{
//   (e: 'viewItem', rowItem: string[]): void
// }>()

// function showAction(action: string) {
//   // 可以根據 action 是否在 props.actions 中判斷是否顯示
//   return props.actions.includes(action)
// }
// function emitRowItem(name: any, item: any) {
//   emit(name, item)
// }
</script>
<style lang="scss" scoped></style>
