<template>
  <v-chart
    ref="chartRef"
    :option="lineOption"
    :style="{ height: height }"
    autoresize
  />
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
import { provide, ref, toRefs, watch } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { color } from "@/utils/chartColor.ts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  GridComponent,
  LegendComponent,
  LineChart,
  TooltipComponent,
]);
provide(THEME_KEY, "light");
interface DataItem {
  name: string;
  type: string;
  symbol: string;
  data: Array<any>;
}
interface Props {
  name?: string;
  chartData: DataItem[];
  tooltipData?: Array<any>;
  period: Array<string>;
  height: string;
  top?: string;
  cost?: boolean;
  legendFontSize?: number;
  theme?: string;
}
const props = withDefaults(defineProps<Props>(), {
  name: () => "Line Chart",
  chartData: () => [],
  tooltipData: () => [],
  period: () => [],
  height: () => "300px",
  cost: false,
  legendFontSize: 11,
  theme: "darkTheme",
});
const { period, chartData, cost, legendFontSize } = toRefs(props);
const chartRef = ref<InstanceType<typeof VChart> | null>(null);
const lineOption = ref({
  color: ["#FFFFFF", "#FF9F5A"],
  tooltip: {
    trigger: "axis",
    textStyle: {
      fontSize: 11,
    },
    formatter: (params) => {
      return formatter(params);
    },
  },
  legend: {
    type: "scroll",
    textStyle: {
      fontSize: legendFontSize.value ?? 11,
      color: "#FFFFFF",
    },
    top: props.top ?? "0",
    align: "auto",
    itemGap: 20,
    itemHeight: 5,
    itemWidth: 10,
    icon: "rect",
  },
  grid: {
    left: "3%",
    right: "2%",
    bottom: "2%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    axisLabel: {
      margin: 15,
      fontSize: 11,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      onZero: false,
    },
    data: period,
  },
  yAxis: {
    type: "value",
    axisLabel: {
      fontSize: 11,
      formatter: cost.value ? "{value}" : "{value}%",
    },
  },
  series: chartData,
});
function formatter(params: any) {
  let result = `<span style="font-size: 12px; font-weight: bold;"> ${params[0].axisValue}</span><br/>`;
  params.forEach((param) => {
    const cost = props.tooltipData[param.seriesIndex].value[param.dataIndex][1];
    result += `<div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 300px;
          font-size: 12px;
        "><div >${param.marker}${param.seriesName} </div> <div> $${Number(cost)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}</div></div>`;
  });
  return result;
}
watch(chartData, (newVal) => {
  const option = JSON.parse(JSON.stringify(lineOption.value));
  if (chartRef.value && chartRef.value.chart !== undefined) {
    chartRef.value.chart.clear();
  }
  lineOption.value = option;
  lineOption.value.xAxis.data = period.value;
  lineOption.value.series = [];
  lineOption.value.series = newVal;
  lineOption.value.tooltip.formatter = function (params: any) {
    return formatter(params);
  };
});
watch(
  () => props.theme,
  (newVal) => {
    lineOption.value.xAxis.axisLabel.color =
      newVal === "darkTheme" ? "#FFFFFF" : "#556675";
    lineOption.value.yAxis.axisLabel.color =
      newVal === "darkTheme" ? "#FFFFFF" : "#556675";
    lineOption.value.legend.textStyle.color =
      newVal === "darkTheme" ? "#FFFFFF" : "#556675";
    lineOption.value.color[0] = newVal === "darkTheme" ? "#EBE188" : "#446199";
  },
  { immediate: true },
);
</script>
<style scoped></style>
