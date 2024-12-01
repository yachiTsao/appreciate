import { defineStore } from "pinia";
import type { ChartModule } from "../record";
import { StoreIdsEnum } from "../enums/StoreIdEnum";

export const usePieChartStore = defineStore({
  id: StoreIdsEnum.pieChartData,
  state: (): ChartModule.State => ({
    items: JSON.parse(localStorage.getItem("records") || "[]"),
    loading: false,
    filteredItems: [],
  }),
  getters: {
    chartData: (state) => {
      state.loading = true;
      const categoryTotals = state.filteredItems.reduce(
        (acc, item) => {
          const category = item.category;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] +=
            typeof item.dollar === "number"
              ? item.dollar
              : parseFloat(item.dollar);
          return acc;
        },
        {} as Record<string, number>,
      );

      const result = Object.keys(categoryTotals).map((category) => ({
        name: category,
        value: categoryTotals[category],
      }));

      state.loading = false;
      return result;
    },
  },
  actions: {
    async initData(filterMonth: string) {
      const filteredItems = this.items.filter((item) =>
        item.date.startsWith(filterMonth),
      );
      this.filteredItems = filteredItems;
    },
  },
});

export const useLineChartStore = defineStore({
  id: StoreIdsEnum.lineChartData,
  state: (): ChartModule.State => ({
    items: JSON.parse(localStorage.getItem("records") || "[]"),
    loading: false,
    filteredItems: {},
  }),
  getters: {
    chartData: (state) => {
      state.loading = true;
      // Convert aggregated data to the desired format
      const result = Object.keys(state.filteredItems).map((type) => ({
        name: type,
        type: "line",
        symbol: "none",
        data: Object.keys(state.filteredItems[type]).map((date) => [
          date,
          state.filteredItems[type][date],
        ]),
      }));

      state.loading = false;
      return result;
    },
    tooltipData: (state) => {
      const transformedData = Object.keys(state.filteredItems).map((key) => {
        return {
          id: key,
          value: Object.keys(state.filteredItems[key]).map((date) => [
            date,
            state.filteredItems[key][date],
          ]),
        };
      });

      return transformedData;
    },
  },
  actions: {
    async aggregatedData() {
      // Aggregate data by date and type
      const aggregatedData = this.items.reduce(
        (acc, item) => {
          const date = item.date.substring(0, 7); // 提取年月部分
          const type = item.type.toLowerCase();

          if (!acc[type]) {
            acc[type] = {};
          }

          if (!acc[type][date]) {
            acc[type][date] = 0;
          }

          acc[type][date] +=
            typeof item.dollar === "number"
              ? item.dollar
              : parseFloat(item.dollar);
          return acc;
        },
        {} as Record<string, Record<string, number>>,
      );

      this.filteredItems = aggregatedData;
    },
  },
});
