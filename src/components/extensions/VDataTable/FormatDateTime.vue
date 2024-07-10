<template>
  <!-- <span v-if="item && item !== '-'">{{
    onlyDate === true ? formatDate(item) : formatDateTime(item)
  }}</span>
  <span v-else class="text-gray-40 v-text-body-2">-</span> -->
</template>
<script setup lang="ts">
// import { ref } from 'vue'
// import { useAuthStore } from '@/stores'
// import { changeToLocaleTimeByTimezone } from '@/utils/dayjs'
// interface Props {
//   item: ''
//   onlyDate?: boolean
// }
// const props = withDefaults(defineProps<Props>(), {
//   item: () => '',
//   onlyDate: false
// })
// const authStore = useAuthStore()
// const formatDateTime = (date: string) => {
//   return changeToLocaleTimeByTimezone({
//     time: date,
//     lang: 'en',
//     targetTimezone: authStore.timezone ? authStore.timezone : 'America/New_York',
//     format: 'YYYY/MM/DD HH:mm:ss'
//   })
// }
// const formatDate = (date: string) => {
//   return changeToLocaleTimeByTimezone({
//     time: date,
//     lang: 'en',
//     targetTimezone: authStore.timezone ? authStore.timezone : 'America/New_York',
//     format: 'YYYY/MM/DD'
//   })
// }
</script>
<style lang="scss" scoped></style>
