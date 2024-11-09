<template>
  <div class="fill-height">
    <v-card class="fill-height v-custom-background">
      <v-sheet width="85%" class="pa-2 mx-auto" color="transparent">
        <div class="d-flex justify-space-between pa-4 pb-0">
          <p class="d-flex align-start pt-2">{{ $t("general.landingPage") }}</p>
          <v-row class="d-flex align-start justify-end ma-0">
            <v-text-field
              :label="$t('general.monthlyBudget')"
              variant="outlined"
              max-width="200"
              density="compact"
              class="pr-2"
            ></v-text-field>
            <v-btn
              class="px-3 text-primary-dark"
              variant="flat"
              height="40"
              color="primary"
            >
              <v-icon class="mr-1" size="20"> mdi-pencil-plus-outline </v-icon>
              {{ $t("general.createBudget") }}
            </v-btn>
          </v-row>
        </div>
        <div class="d-flex flex-row justify-space-between pb-4">
          <v-card
            v-for="(item, index) in cardInfo"
            :key="index"
            class="d-flex flex-colum align-center px-2 mx-2 text-primary-dark bg-primary-light"
            height="70"
            width="100%"
          >
            <v-icon size="20" class="px-4">{{ item.icon }}</v-icon>
            <p class="v-text-h3 pr-4">{{ $t(item.title) }}</p>
            <p :class="`text-${item.textColor}`" class="pr-2 ms-auto">
              $
              {{ item.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") }}
            </p>
          </v-card>
        </div>
        <v-card class="mx-2">
          <v-row
            v-for="(item, index) in periodInfo"
            :key="index"
            class="d-flex ma-0 bg-primary-light"
          >
            <v-sheet
              :color="item.circleColor"
              width="20"
              height="20"
              rounded="xl"
              class="ma-2 align-self-center"
            ></v-sheet>
            <p class="v-text-h5 align-self-center">{{ $t(item.title) }}</p>
            <p class="v-text-body-3 align-self-end ps-3 text-gray-20">
              {{ item.period }}
            </p>
            <div class="flex-column ms-auto pr-2">
              <p class="text-highlight-red text-right">
                -
                {{
                  item.expense.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                }}
              </p>
              <p class="text-bluetext text-right">
                +
                {{
                  item.income.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                }}
              </p>
            </div>
            <v-divider v-if="index !== periodInfo.length - 1"></v-divider>
          </v-row>
        </v-card>
      </v-sheet>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import VTextInput from "@/components/general/VTextInput.vue";

const today = new Date();
const day = ref(today);
let themeMode = localStorage.getItem("theme");
const cardInfo = ref([
  {
    icon: "mdi-account-arrow-right-outline",
    title: "general.cardTitle.expenses",
    value: 5578,
    textColor: "highlight-red",
  },
  {
    icon: "mdi-account-arrow-left-outline",
    title: "general.cardTitle.income",
    value: 12852,
    textColor: "bluetext",
  },
  {
    icon: "mdi-account-cash-outline",
    title: "general.cardTitle.available",
    value: 17418,
    textColor: "highlight-green",
  },
]);
const periodInfo = ref([
  {
    circleColor: "seventh",
    title: "general.periodTitle.today",
    period: "(2024/10/10)",
    expense: 5578,
    income: 12852,
  },
  {
    circleColor: "eighth",
    title: "general.periodTitle.lastWeek",
    period: "(2024/10/07 - 2024/10/13)",
    expense: 1588,
    income: 1020,
  },
  {
    circleColor: "ninth",
    title: "general.periodTitle.thisMonth",
    period: "(2024/10/01 - 2024/10/10)",
    expense: 12059,
    income: 25812,
  },
  {
    circleColor: "tenth",
    title: "general.periodTitle.thisYear",
    period: "(2024/01/01 - 2024/10/10)",
    expense: 144589,
    income: 300258,
  },
]);
</script>
<style lang="scss"></style>
