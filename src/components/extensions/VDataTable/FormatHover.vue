<template>
  <v-menu open-on-hover location="end" offset="10">
    <template v-slot:activator="{ props }">
      <span
        v-if="item && item.length > 0"
        class="text-primary-orange text-decoration-underline cursor-pointer"
        v-bind="props"
      >
        {{ item.length }}
      </span>
      <span v-else class="text-gray-40 v-text-body-2">-</span>
    </template>
    <v-list class="bg-tooltip">
      <v-list-item v-for="(value, index) in item" :key="index">
        <v-list-item-title>
          {{ value }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
import { convertCamelCaseToSpaceSeparated } from "@/utils/mixinTools";
interface Props {
  item: string[];
}
const props = withDefaults(defineProps<Props>(), {
  item: () => [],
});
</script>
<style lang="scss" scoped></style>
