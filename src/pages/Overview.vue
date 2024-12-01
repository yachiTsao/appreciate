<template>
  <div class="fill-height">
    <v-card class="fill-height v-custom-background">
      <v-sheet width="85%" class="pa-2 mx-auto" color="transparent">
        <div class="d-flex justify-space-between pa-4">
          <p>{{ $t("general.overview") }}</p>
        </div>
        <VFilterSelectLayout
          :display-name="filterDisplayName"
          :filter-list="filterList"
          :init-filter-list="initFilterList"
          :filter-date="filterDate"
          @change="(v) => (filterForSearch = v)"
          @search="search()"
        />
        <v-row class="ma-0">
          <v-col
            class="ps-0"
            :class="{ 'pl-0': mdAndUp, 'px-0': mdAndDown, 'pb-4': mdAndDown }"
            cols="12"
            sm="12"
            md="12"
            lg="6"
          >
            <v-sheet color="primary-light" class="pa-4" rounded>
              <p class="v-text-h3 text-primary-dark">Monthly Total Cost</p>
              <v-layout>
                <VPieChart
                  :data="pieChartStore.chartData"
                  :isShowTooltip="true"
                  :tooltipTitle="tooltipTitle"
                  :theme="chartTheme"
                  :height="'300px'"
                />
              </v-layout>
            </v-sheet>
          </v-col>
          <v-col class="pe-0">
            <v-sheet color="primary-light" class="pa-4" rounded>
              <p class="v-text-h3 text-primary-dark">Cost & Budget</p>
              <v-row>
                <v-col>
                  <v-row
                    v-for="(item, index) in costAndBudget"
                    :key="index"
                    class="ma-0 mt-8"
                  >
                    <v-sheet color="second" width="5" height="55"></v-sheet>
                    <div class="px-3 d-flex flex-column align-self-center">
                      <p class="text-sixth">{{ item.title }}</p>
                      <p class="v-text-body-4">
                        ${{
                          item.value
                            .toFixed(2)
                            .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        }}
                      </p>
                    </div>
                  </v-row>
                </v-col>
                <v-col>
                  <v-layout>
                    <VGaugeChart
                      :value="gaugeData[0].budgetAchieved"
                      :color="'#EBE188'"
                      :used="'Total Cost'"
                      :total="'Budget:'"
                      :height="'263px'"
                      :width="'270px'"
                      :theme="chartTheme"
                    />
                  </v-layout>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-sheet color="primary-light" class="pa-4 my-3" width="100%" rounded>
            <div class="d-flex align-center">
              <p class="v-text-h3 pr-2 text-primary-dark">Monthly Growth</p>
              <VSingleSelect
                :item-title="(item) => $t(item.key)"
                :item-value="'value'"
                :items="categoryItems"
                :init-value="tempCategory"
                :search-bar="false"
                class="py-2 v-col-2"
                @change="(v) => (tempCategory = v)"
              />
            </div>
            <v-layout>
              <VBarChart
                :chartData="barData"
                :period="['2024/11', '2024/12']"
                :height="'300px'"
                :theme="chartTheme"
              />
            </v-layout>
          </v-sheet>
        </v-row>
        <v-row class="ma-0">
          <v-sheet color="primary-light" class="pa-4 my-3" width="100%" rounded>
            <p class="v-text-h3 text-primary-dark">Need & Must</p>
            <v-layout>
              <VLineChart
                :chartData="lineChartStore.chartData"
                :tooltipData="lineChartStore.tooltipData"
                :period="['2024/11', '2024/12']"
                :height="'300px'"
                :cost="true"
                :theme="chartTheme"
              />
            </v-layout>
          </v-sheet>
        </v-row>
      </v-sheet>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import VPieChart from "@/components/chart/VPieChart.vue";
import VGaugeChart from "@/components/chart/VGaugeChart.vue";
import VBarChart from "@/components/chart/VBarChart.vue";
import VLineChart from "@/components/chart/VLineChart.vue";
import VSingleSelect from "@/components/general/VSingleSelect.vue";
import { useTheme, useDisplay } from "vuetify";
import { IInitFilterList } from "@/types";
import { useRecordStore } from "@/stores/recordStore";
import { usePieChartStore, useLineChartStore } from "@/stores/overviewStore";
interface FilterItem {
  key: string;
  value: string;
}
let theme = useTheme();
const { mdAndUp, mdAndDown } = useDisplay();
const recordStore = useRecordStore();
const pieChartStore = usePieChartStore();
const lineChartStore = useLineChartStore();
const { getCategoryValues } = storeToRefs(recordStore);
const categoryItems = computed(() =>
  getCategoryValues.value.map((value) => ({
    key: value,
    value,
  })),
);
let tempCategory = ref("");
let systemTheme = ref(theme);
let chartTheme = ref("darkTheme");
const today = new Date();
const filterList = ref<Record<string, (string | FilterItem[])[]>>({
  month: [],
});
const filterDisplayName = {
  month: "general.month",
};
const initFilterList = ref<IInitFilterList>({
  month: previousMonth(today, 6) || [""],
});
const filterDate = ref({
  month: {
    isUse: true,
    type: "monthMode",
    max: today,
    clearValue: previousMonth(today, 1),
    presetValue: [
      {
        text: "general.periodSelect.lastYear",
        value: "lastYear",
        month: [
          { month: today.getMonth(), year: today.getFullYear() - 1 },
          { month: today.getMonth(), year: today.getFullYear() },
        ],
        disabled: false,
      },
      {
        text: "general.periodSelect.previousSixMonths",
        value: "last6Months",
        month: previousMonth(today, 6),
        disabled: false,
      },
      {
        text: "general.periodSelect.previousThreeMonths",
        value: "last3Months",
        month: previousMonth(today, 3),
        disabled: false,
      },
      {
        text: "general.periodSelect.previousOneMonth",
        value: "lastMonth",
        month: previousMonth(today, 1),
        disabled: false,
      },
      {
        text: "general.periodSelect.monthToDate",
        value: "monthToDate",
        month: [
          { month: today.getMonth(), year: today.getFullYear() },
          { month: today.getMonth(), year: today.getFullYear() },
        ],
        disabled: false,
      },
      {
        text: "general.periodSelect.quarterToDate",
        value: "quarterToDate",
        month: [
          {
            month: startMonthForQuarterToDate(today),
            year: today.getFullYear(),
          },
          { month: today.getMonth(), year: today.getFullYear() },
        ],
        disabled: [0, 3, 6, 9].includes(today.getMonth()) ? true : false,
      },
      {
        text: "general.periodSelect.yearToDate",
        value: "yearToDate",
        month: [
          { month: 0, year: today.getFullYear() },
          { month: today.getMonth(), year: today.getFullYear() },
        ],
        disabled:
          today.getMonth() === 0 || today.getMonth() === 0 ? true : false,
      },
    ],
  },
});
let tooltipTitle = "2024/11";
let costAndBudget = ref([
  {
    title: "Total Cost",
    value: 4500,
  },
  {
    title: "Budget",
    value: 10000,
  },
]);
let gaugeData = ref([
  {
    type: "YTD",
    totalCost: 1999,
    budgetAchieved: 45,
    budget: "4,500",
    color: "",
    isNoData: false,
  },
]);
let barData = ref([12, 43]);
function startMonthForQuarterToDate(date: any) {
  const month = date.getMonth();
  let startMonth = 0;
  if (month < 3) {
    startMonth = 0; // 一月
  } else if (month < 6) {
    startMonth = 3; // 四月
  } else if (month < 9) {
    startMonth = 6; // 七月
  } else {
    startMonth = 9; // 十月
  }
  return startMonth;
}
function previousMonth(currentDate: any, previous: number) {
  let firstDay = new Date();
  firstDay.setDate(1);
  firstDay.setMonth(firstDay.getMonth() - previous);
  return [
    { month: firstDay.getMonth(), year: firstDay.getFullYear() },
    { month: currentDate.getMonth(), year: currentDate.getFullYear() },
  ];
}
watch(
  systemTheme,
  (val) => {
    chartTheme.value = val.global.name;
  },
  {
    immediate: true,
    deep: true,
  },
);
onMounted(async () => {
  if (categoryItems.value.length > 0) {
    tempCategory.value = categoryItems.value[0].value;
  }
  await lineChartStore.aggregatedData();
  await pieChartStore.initData("2024/11");
});
</script>
