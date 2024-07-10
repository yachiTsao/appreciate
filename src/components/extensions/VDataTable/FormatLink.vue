<template>
  <router-link
    v-if="item?.[header] != '' && item?.[header] != 0"
    class="text-primary-orange text-decoration-underline"
    :to="{
      path: links?.path,
      query: mapQueryToItem(links?.query, item)
    }"
    >{{ item?.[header] }}
  </router-link>
  <span v-else class="text-gray-40 v-text-body-2">-</span>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
interface Props {
  header: string // record specific header key
  item: Record<string, string | number>
  links?: {
    path: string
    query: {
      [key: string]: string
    }
  }
}
const props = withDefaults(defineProps<Props>(), {
  // item: () => ({}),
})
function mapQueryToItem(
  query: { [key: string]: string },
  item: { [key: string]: string }
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key, item[value] || value])
  )
}
</script>
<style lang="scss" scoped></style>
