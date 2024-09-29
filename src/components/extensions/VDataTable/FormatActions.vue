<template>
  <p v-if="item.contract_id === tag" class="text-gray-30 v-text-body-2">
    {{ $t("product.order.current") }}
  </p>
  <div v-else v-for="(action, index) in defaultActions" :key="index">
    <v-btn
      v-if="showAction(action.type)"
      class="mx-1 px-2"
      :color="action.color"
      variant="outlined"
      @click="emitRowItem(`${action.type}Item`, item)"
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
interface Props {
  actions?: string[];
  item: object;
  tag?: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  actions: () => [],
});
const emit = defineEmits<{
  (e: "viewItem", rowItem: string[]): void;
  (e: "deleteItem", rowItem: string[]): void;
  (e: "editItem", rowItem: string[]): void;
}>();
const defaultActions = [
  {
    type: "view",
    icon: "mdi-eye-outline",
    color: "second",
    title: "general.view",
  },
  {
    type: "edit",
    icon: "mdi-pencil-outline",
    color: "second",
    title: "general.edit",
  },
  {
    type: "delete",
    icon: "mdi-trash-can-outline",
    color: "error",
    title: "general.deleted",
  },
];
function showAction(action: string) {
  // 可以根據 action 是否在 props.actions 中判斷是否顯示
  return props.actions.includes(action);
}
function emitRowItem(name: any, item: any) {
  emit(name, item);
}
</script>
<style lang="scss" scoped></style>
