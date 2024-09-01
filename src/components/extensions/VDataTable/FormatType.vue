<template>
  <div v-if="item !== '-'" class="d-flex align-center">
    <v-sheet :color="adjustColor(item)" width="50" height="26" rounded="xl" class="d-flex align-center justify-center">
    {{ item }}
    </v-sheet>
  </div>
  <p v-else>-</p>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
interface Props {
  item: string | number
}
const props = withDefaults(defineProps<Props>(), {
  // item: () => ({}),
})
let color = 'gray-40'
function adjustColor(item: string | number) {
  switch (item.toString()) {
    case 'must':
      color = 'primary-orange'
      break
    case 'need':
      color = 'sixth'
      break
    default:
    break
  }
  return color
}
</script>
<style lang="scss" scoped></style>
