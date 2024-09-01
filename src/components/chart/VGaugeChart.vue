<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-chart
      :option="gaugeOption"
      :style="{ height: height, width: width }"
      autoresize
    />
    <div class="d-flex flex-column align-start justify-center ml-6">
      <v-row class="ma-0 d-flex align-center justify-start custom-legend">
        <v-sheet
          :color="legendColor"
          width="10"
          height="5"
          class="mr-2"
        ></v-sheet>
        <p class="v-text-body-2">{{ used }}</p>
      </v-row>
      <v-row class="ma-0 d-flex align-center justify-start custom-legend">
        <v-sheet color="#DFD7D5" width="10" height="5" class="mr-2"></v-sheet>
        <p class="v-text-body-2">{{ total }}</p>
      </v-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide, ref, toRefs, watch } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
use([CanvasRenderer, GaugeChart]);
provide(THEME_KEY, "light");
interface Props {
  name?: string;
  value: number | string;
  color: string;
  height: string;
  width: string;
  used: string;
  total: string;
  theme?: string;
}
const props = withDefaults(defineProps<Props>(), {
  name: "Gauge Chart",
  value: 0,
  color: "",
  height: () => "300px",
  width: () => "270px",
  used: "Yearly Total Cost",
  total: "Yearly Budget",
  theme: "darkTheme",
});
const data = toRefs(props).value;
let legendColor = ref("");
const gaugeDate = ref([
  {
    value: data,
    itemStyle: {
      color: props.color,
    },
    name: "text1",
    title: {
      show: false,
      offsetCenter: ["-80%", "100%"],
    },
    detail: {
      fontSize: 30,
      formatter: "{value}%",
      valueAnimation: true,
      offsetCenter: ["0", "0"],
      color: props.color,
    },
  },
  {
    value: 99.99,
    name: props.used,
    itemStyle: {
      color: "#DFD7D5",
    },
    title: {
      show: false,
      offsetCenter: ["-5%", "120%"],
    },
    detail: {
      show: false,
      offsetCenter: ["-110%", "120%"],
    },
  },
]);
const gaugeOption = ref({
  series: [
    {
      type: "gauge",
      radius: "70%",
      startAngle: 240,
      endAngle: -60,
      center: ["50%", "55%"],
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        width: 18,
        roundCap: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      silent: true,
      data: gaugeDate,
      title: {
        fontSize: 14,
      },
    },
  ],
});
watch(data, (value) => {
  if (value === 0) {
    gaugeDate.value[0].detail.formatter = "-";
    gaugeDate.value[0].itemStyle.color = "#DFD7D5";
  } else {
    gaugeDate.value[0].detail.formatter = "{value}%";
    gaugeDate.value[0].itemStyle.color = props.color;
  }
});
watch(
  () => props.theme,
  (newVal) => {
    gaugeDate.value[0].detail.color =
      newVal === "darkTheme" ? props.color : "#446199";
    gaugeDate.value[0].itemStyle.color =
      newVal === "darkTheme" ? props.color : "#446199";
    legendColor.value = newVal === "darkTheme" ? props.color : "#446199";
  },
  { immediate: true },
);
</script>
<style lang="scss" scoped>
.custom-legend {
  position: relative;
  top: -20px;
}
</style>
