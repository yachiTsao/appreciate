<template>
  <div class="fill-height">
    <v-card class="fill-height v-custom-background">
      <v-sheet width="85%" class="pa-2 mx-auto" color="transparent">
        <div class="d-flex justify-space-between pa-4">
          <p>{{ $t("general.overview") }}</p>
        </div>
        <!-- <VFilterSelectLayout
          :display-name="filterDisplayName"
          :filter-list="filterList"
          :init-filter-list="initFilterList"
        /> -->
        <v-row class="ma-0">
          <v-col>
            <v-sheet color="third" class="pa-4">
              <p class="v-text-h3">Monthly Total Cost</p>
              <v-layout>
                <VPieChart
                  :data="pieData"
                  :isShowTooltip="true"
                  :tooltipTitle="tooltipTitle"
                  :height="'300px'"
                />
              </v-layout>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet color="third" class="pa-4">
              <p class="v-text-h3">Cost & Budget</p>
              <v-row>
                <v-col>
                  <v-row
                    v-for="(item, index) in costAndBudget"
                    :key="index"
                    class="ma-0 mt-8"
                  >
                    <v-sheet color="fourth" width="5" height="55"></v-sheet>
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
                    />
                  </v-layout>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-sheet color="third" class="pa-4 ma-3" width="100%">
            <div class="d-flex align-center">
              <p class="v-text-h3 pr-2">Monthly Growth</p>
              <v-sheet color="primary" class="pa-2" width="fit-content" height="fit-content"
                >type of dinner</v-sheet>
            </div>
            <!-- <span class="v-text-h3">Monthly Growth</span>
            <v-sheet
              color="primary"
              class="pa-2"
              width="fit-content"
              height="fit-content"
              >type of dinner</v-sheet> -->
            <v-layout>
              <VBarChart
                :chartData="barData"
                :period="['202401', '202402', '202403']"
                :height="'300px'"
              />
            </v-layout>
          </v-sheet>
        </v-row>
        <v-row class="ma-0">
          <v-sheet color="third" class="pa-4 ma-3" width="100%">
            <p class="v-text-h3">Need & Must</p>
            <v-layout>
              <VLineChart
                :chartData="lineData"
                :period="['202401', '202402', '202403']"
                :height="'300px'"
              />
            </v-layout>
          </v-sheet>
        </v-row>
      </v-sheet>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import VPieChart from "@/components/chart/VPieChart.vue";
import VGaugeChart from "@/components/chart/VGaugeChart.vue";
import VBarChart from "@/components/chart/VBarChart.vue";
import VLineChart from "@/components/chart/VLineChart.vue";

let pieData = [
  { name: "A", value: 335 },
  { name: "B", value: 315 },
  { name: "C", value: 205 },
];
let tooltipTitle = "2024/08/27";
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
let barData = ref([12, 34, 43]);
let lineData = ref([
  {
    name: "A",
    type: "line",
    symbol: "none",
    data: [
      ["202401", 23],
      ["202402", 31],
      ["202403", 45],
    ],
  },
  {
    name: "B",
    type: "line",
    symbol: "none",
    data: [
      ["202401", 23],
      ["202402", 42],
      ["202403", 59],
    ],
  },
  {
    name: "C",
    type: "line",
    symbol: "none",
    data: [
      ["202401", 55],
      ["202402", 76],
      ["202403", 47],
    ],
  },
]);
</script>
