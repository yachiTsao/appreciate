<template>
  <v-layout :class="{ 'custom-gray-card': isNoDataGrayMode }">
    <v-chart :option="option" autoresize :style="{ height: props.height }" />
    <!-- <VNoChartData :noData="isNoDataGrayMode" /> -->
  </v-layout>
</template>

<script setup lang="ts">
import { ref, provide, toRefs, onMounted, watch, computed } from "vue";
// ECharts
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { color } from "@/utils/chartColor.ts";
import { useI18n } from "vue-i18n";

// import VNoChartData from '@/components/general/VNoChartData.vue'
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
]);
provide(THEME_KEY, "light");

interface DataItem {
  name: string;
  value: number;
  id?: string;
  [key: string]: any;
}
interface Props {
  data: DataItem[];
  overflow?: string;
  height?: string;
  isShowTooltip?: boolean;
  isShowLabel?: boolean;
  isEmptyTrigGray?: boolean;
  tooltipTitle?: string;
  legendFormatterName?: string;
  centerX?: "75%" | "80%"; // 75% 是 1 row 2 charts 用, 80% 是 1 row 1 chart 用
  theme?: string;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  height: "266px",
  isShowTooltip: false,
  isShowLabel: false,
  tooltipTitle: "",
  isEmptyTrigGray: false,
  legendFormatterName: "",
  centerX: "75%",
  overflow: "none",
  theme: "darkTheme",
});
const data = toRefs(props).data;
const overflow = toRefs(props).overflow;
const isShowLabel = toRefs(props).isShowLabel;
const centerX = toRefs(props).centerX;
const isNoDataGrayMode = ref(false);
const { t, te } = useI18n();

const resultData = computed(() => {
  return data.value.map((item) => ({
    ...item,
    name: te(item.name) ? t(item.name) : item.name,
  }));
});
watch(data, (newVal) => {
  if (props.legendFormatterName !== "") {
    option.value.legend.formatter = function (dataName: string) {
      // dataName 應該是給 id, 因為一開始會用 id 當 name
      const sereisDataItem = newVal.find(
        (item: { name: string }) => item.name === dataName,
      );
      if (sereisDataItem && sereisDataItem[props.legendFormatterName]) {
        const idToName = sereisDataItem[props.legendFormatterName];
        return idToName;
      } else {
        return props.legendFormatterName;
      }
    };
  }

  if (props.isEmptyTrigGray && data.value.length === 0) {
    option.value.legend.formatter = null;
    isNoDataGrayMode.value = true;
  } else {
    isNoDataGrayMode.value = false;
  }
});
const option = ref({
  color: color,
  tooltip: {
    show: props.isShowTooltip,
    trigger: "item",
    formatter: function (params: any) {
      const paramsNameKey = props.legendFormatterName
        ? props.legendFormatterName
        : "name";
      let result = `<span style="font-size: 12px; font-weight: bold;"> ${props.tooltipTitle}</span><br>`;
      result += `<div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 243px;
          font-size: 12px;
        "><div> ${params.marker} ${params.data[paramsNameKey]} </div> <div class="pl-2"> $${Number(
          params.value,
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}<span class="pl-1">(${
          params.percent
        }%)</span></div></div>`;
      return result;
    },
    textStyle: {
      color: "#556675",
      fontFamily: "Noto Sans TC",
      fontSize: 12,
    },
  },
  legend: {
    orient: "vertical",
    top: "8%",
    left: "left",
    itemWidth: 10, // 图例项的宽度
    itemHeight: 6, // 图例项的高度
    textStyle: {
      color: "#DFD7D5",
      fontFamily: "Noto Sans TC",
      fontSize: 12,
      width: 230,
      overflow: overflow.value,
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      center: [props.centerX, "50%"],
      avoidLabelOverlap: false,
      padAngle: 2,
      itemStyle: {
        borderRadius: 6,
      },
      label: {
        show: props.isShowLabel,
        color: "#A9B6C3",
        formatter: "{d}%", // 格式化标签为百分比
      },
      labelLine: {
        show: false,
        length: 8, // 第一段线的长度
        length2: 5, // 第二段线的长度
      },
      emphasis: {
        disabled: !props.isShowTooltip,
        scale: false,
        focus: "self",
      },
      data: resultData,
    },
  ],
});
watch(overflow, (newVal) => {
  option.value.legend.textStyle.overflow = newVal;
});
watch(isShowLabel, (newVal) => {
  option.value.series[0].label.show = newVal;
});
watch(centerX, (newVal) => {
  option.value.series[0].center = [newVal, "50%"];
});
watch(
  () => props.theme,
  (newVal) => {
    option.value.legend.textStyle.color =
      newVal === "darkTheme" ? "#DFD7D5" : "#556675";
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.custom-gray-card {
  filter: grayscale(100%);
}
</style>
