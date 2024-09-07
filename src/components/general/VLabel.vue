<template>
  <div>
    <div
      v-if="title"
      class="mb-2 d-flex align-center justify-space-between"
      :class="fontSize ? fontSize : 'v-text-body-2'"
    >
      <p :class="titleColor">{{ prefix }} {{ $t(title) }} {{ suffix }}</p>
      <slot name="suffix"></slot>
    </div>
    <v-sheet
      :color="color"
      :height="height"
      class="px-3 py-1 d-flex align-center justify-space-between"
      rounded
      elevation="0"
    >
      <div class="d-flex align-center">
        <slot name="inner-prepend"></slot>
        <span class="v-text-body-3">{{ text }}</span>
      </div>
      <div>
        <slot name="inner-append"></slot>
      </div>
    </v-sheet>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
interface Props {
  title?: string
  prefix?: string | number
  suffix?: string | number
  text?: string | number
  color?: string
  height?: string | number
  fontSize?: string | number
  titleColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: () => '',
  prefix: () => '',
  suffix: () => ':',
  text: () => '',
  color: () => 'label',
  height: () => 36,
  fontSize: () => 'v-text-body-2',
  titleColor: () => 'text-fourth'
})
</script>
