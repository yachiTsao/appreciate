<template>
  <v-chart ref="chartRef" :option="barOption" :style="{ height: height }" autoresize />
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = 'TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk'
} catch (e) {
  console.log('TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk')
}
import { provide, ref, toRefs, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { color } from '@/utils/chartColor.ts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
use([CanvasRenderer, GridComponent, BarChart, TooltipComponent, LegendComponent])
provide(THEME_KEY, 'light')
interface Props {
  name?: string
  chartData: Array<any>
  period: Array<string>
  height: string
  singleSeries?: boolean
  stack?: boolean
  legendFontSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  name: () => 'Bar Chart',
  chartData: () => [],
  period: () => [],
  height: () => '300px',
  singleSeries: true,
  stack: false,
  legendFontSize: 11
})
const { period, chartData, singleSeries, stack, legendFontSize } = toRefs(props)
const chartRef = ref<InstanceType<typeof VChart> | null>(null)
const barData = ref([
  {
    name: 'Growth',
    type: 'bar',
    barWidth: singleSeries.value ? '60%' : '',
    label: {
      show: singleSeries.value,
      position: 'top',
      formatter: function (params) {
        return `${params.value}%`
      }
    },
    itemStyle: singleSeries.value
      ? {
          color: function (params) {
            if (params.value > 0) {
              return '#EE5E6F'
            } else {
              return '#17B05D'
            }
          }
        }
      : {},
    emphasis: {
      focus: singleSeries.value ? 'self' : 'none'
    },
    data: chartData
  }
])
const barOption = ref({
  stack: stack,
  color: singleSeries.value ? '' : color,
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: function (params: any) {
      return formatter(params)
    },
    textStyle: {
      fontSize: 11
    },
    axisPointer: {
      type: 'line'
    }
  },
  legend: {
    show: false,
    type: 'scroll',
    orient: 'horizontal',
    left: 'center',
    align: 'auto',
    top: 20,
    itemGap: 20,
    itemHeight: 5,
    itemWidth: 10,
    textStyle: {
      fontSize: legendFontSize.value ?? 11
    }
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: period,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        onZero: false
      },
      axisLabel: {
        margin: 15,
        fontSize: 11
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: singleSeries.value ? '{value}%' : '{value}',
        fontSize: 11
      }
    }
  ],
  series: barData.value
})
function formatter(params: any) {
  if (singleSeries.value) {
    let result = `<span style="font-size: 12px; font-weight: bold;"> ${params[0].axisValue}</span><br>`
    result += `<div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 170px;
            font-size: 12px;
            font-weight: 500;
          "><div> ${params[0].marker} ${params[0].seriesName} </div> <div> ${params[0].value}%</div></div>`
    return result
  } else {
    let result = ''
    for (let i = 0; i < params.length; i++) {
      if (params[i].value) {
        if (result === '') {
          result = `<span style="font-size: 12px; font-weight: bold;"> ${params[i].axisValue}</span><br>`
        }
        result += `<div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 300px;
                font-size: 12px;
                font-weight: 500;
              "><div> ${params[i].marker} ${params[i].seriesName} </div> <div> $${params[i].value
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div></div>`
      }
    }
    return result
  }
}
watch(
  chartData,
  (newVal) => {
    if (!singleSeries.value) {
      const option = JSON.parse(JSON.stringify(barOption.value))
      if (chartRef.value && chartRef.value.chart !== undefined) {
        chartRef.value.chart.clear()
      }
      barOption.value = option
      barOption.value.xAxis[0].data = period.value
      barOption.value.series = []
      barOption.value.series = newVal
      barOption.value.tooltip.axisPointer.type = 'shadow'
      barOption.value.tooltip.formatter = function (params: any) {
        return formatter(params)
      }
      barOption.value.legend.show = true
    }
  },
  { deep: true, immediate: true }
)
</script>
<style scoped></style>
