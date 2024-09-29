<template>
  <div class="d-flex align-center">
    <v-switch
      v-model="switchStatus"
      :disabled="disable"
      hide-details
      inset
      color="primary-blue"
      class="v-custom-switch"
      @change="changeStatus(item)"
    ></v-switch>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
import { ref, onMounted } from "vue";
interface Props {
  item: any;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => [],
});
let switchStatus = ref(false);
let disable = ref(false);
const emit = defineEmits(["change"]);
function productStatus(item: string | number) {
  switch (item.toString()) {
    case "1":
      switchStatus.value = true;
      disable.value = false;
      break;
    case "0":
      switchStatus.value = false;
      disable.value = false;
      break;
    default:
      switchStatus.value = false;
      disable.value = true;
      break;
  }
}
const changeStatus = (item: any) => {
  if (switchStatus.value) {
    item.display = 1;
    emit("change", item);
  } else {
    item.display = 0;
    emit("change", item);
  }
};
onMounted(async () => {
  productStatus(props.item.display);
});
</script>
<style lang="scss">
.v-custom-switch.v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  height: 20px;
  width: 20px;
  background-color: rgba(var(--v-theme-on-primary-blue));
}
.v-custom-switch.v-switch--inset .v-switch__track {
  height: 24px;
  width: 42px;
  background-color: rgba(var(--v-theme-gray-80));
  min-width: 0 !important;
}
.v-custom-switch.v-switch--inset .v-switch__thumb {
  height: 28px;
  width: 28px;
}
.v-custom-switch.v-switch .v-switch__thumb {
  background-color: rgba(var(--v-theme-gray-40));
}
</style>
