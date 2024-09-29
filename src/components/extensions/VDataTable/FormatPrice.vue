<template>
  <p>
    <span v-if="prependText">$</span> {{ props.item.list_price }}
    <span v-if="appendText">%</span>
  </p>
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
  item: any;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => {},
});
let prependText = ref(false);
let appendText = ref(false);
function format() {
  if (props.item.charge_type_code === "FIXED") {
    return (prependText.value = true);
  } else {
    return (appendText.value = true);
  }
}
onMounted(async () => {
  format();
});
</script>
<style lang="scss" scoped></style>
