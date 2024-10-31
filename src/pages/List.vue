<template>
  <div class="fill-height">
    <v-card class="fill-height v-custom-background">
      <v-sheet width="85%" class="pa-2 mx-auto" color="transparent">
        <div class="d-flex justify-space-between pa-4">
          <p>{{ $t("general.list") }}</p>
          <v-btn
            class="px-3 text-primary-dark"
            variant="flat"
            height="40"
            color="primary"
            @click="goToAction('create')"
          >
            <v-icon class="mr-1" size="20"> mdi-plus </v-icon>
            {{ $t("general.create") }}
          </v-btn>
        </div>
        <VFilterSelectLayout
          :display-name="filterDisplayName"
          :filter-list="filterList"
          :init-filter-list="initFilterList"
          :filter-date="filterDate"
          @change="(v) => (filterForSearch = v)"
          @search="search()"
        />
        <!-- <v-sheet rounded color="primaryWhite" class="pa-2"> -->
        <VDataTable
          :headers="headers"
          :items="items"
          :fixed-last-column="true"
          :actions="['view', 'delete']"
          @viewItem="(val) => goToAction('view', val)"
          @deleteItem="(val) => goToAction('delete', val)"
        />
        <!-- </v-sheet> -->
      </v-sheet>
    </v-card>
    <VDialogLayout v-model:value="dialog.show" @close="closeDialog()">
      <template #title>
        <p>
          {{
            dialog.type === "view"
              ? $t("general.viewDetail")
              : dialog.type === "create"
                ? $t("general.createDetail")
                : $t("general.editDetail")
          }}
        </p>
      </template>
      <template #content>
        <v-row class="ma-0">
          <VLabel
            v-if="dialog.type === 'view'"
            class="pa-0 pb-2 v-col-12"
            :title="'general.date'"
            suffix=""
            :text="tempItem.date"
          />
          <VTextInput
            v-else
            :displayName="'general.date'"
            :init-value="tempItem.date"
            class="pa-0 pb-2 v-col-12"
          />
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0 pr-2" cols="12" sm="6">
            <VLabel
              v-if="dialog.type === 'view'"
              :title="'general.payment'"
              suffix=""
              :text="tempItem.payment"
            />
            <VTextInput
              v-else
              :displayName="'general.payment'"
              :init-value="tempItem.payment"
              class="pa-0 pb-2 v-col-12"
            />
          </v-col>
          <v-col class="pa-0" cols="12" sm="6">
            <VLabel
              v-if="dialog.type === 'view'"
              :title="'general.dollar'"
              suffix=""
              :text="tempItem.dollar"
            />
            <VTextInput
              v-else
              :displayName="'general.dollar'"
              :init-value="tempItem.dollar"
              class="pa-0 pb-2 v-col-12"
            />
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <VLabel
            v-if="dialog.type === 'view'"
            class="pa-0 pb-2 v-col-12"
            :title="'general.category'"
            suffix=""
            :text="tempItem.category"
          />
          <VTextInput
            v-else
            :displayName="'general.category'"
            :init-value="tempItem.category"
            class="pa-0 pb-2 v-col-12"
          />
        </v-row>
        <v-row class="ma-0">
          <VLabel
            v-if="dialog.type === 'view'"
            class="pa-0 pb-2 v-col-12"
            :title="'general.detail'"
            suffix=""
            :text="tempItem.detail"
          />
          <VTextInput
            v-else
            :displayName="'general.detail'"
            :init-value="tempItem.detail"
            class="pa-0 pb-2 v-col-12"
          />
        </v-row>
        <v-row class="ma-0">
          <VLabel
            v-if="dialog.type === 'view'"
            class="pa-0 pb-2 v-col-12"
            :title="'general.type'"
            suffix=""
            :text="tempItem.type"
          />
          <div v-else>
            <p class="v-text-body-2 text-primary-dark">
              {{ $t("general.type") }}
            </p>
            <v-radio-group
              v-model="result"
              inline
              hide-details
              class="d-flex justify-center"
            >
              <v-radio
                label="Need"
                value="NEED"
                class="pr-2 text-primary-dark"
                color="sixth"
              ></v-radio>
              <v-radio
                label="Must"
                value="MUST"
                class="text-primary-dark"
                color="primary-orange"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-row>
      </template>
      <template #actions>
        <v-row align-end justify-end class="ma-0 px-5 pb-5">
          <v-btn
            height="34"
            block
            color="primary"
            variant="flat"
            :loading="loading"
            @click="
              dialog.type === 'view'
                ? goToAction('edit', tempItem)
                : dialog.type === 'create'
                  ? createDetail()
                  : goToAction('update', tempItem)
            "
          >
            {{
              dialog.type === "view"
                ? $t("general.edit")
                : dialog.type === "create"
                  ? $t("general.create")
                  : $t("general.update")
            }}
          </v-btn>
        </v-row>
      </template>
    </VDialogLayout>
    <VDeletionAlert
      v-model:value="deletionConfirmDialog"
      :loading="loading"
      @delete="deleteitem()"
      @close="deletionConfirmDialog = false"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import VDataTable from "@/components/general/VDataTable.vue";
import VDialogLayout from "@/components/general/VDialogLayout.vue";
import VDeletionAlert from "@/components/general/VDeletionAlert.vue";
import VFilterSelectLayout from "@/components/general/VFilterSelectLayout.vue";
import VLabel from "@/components/general/VLabel.vue";
import VTextInput from "@/components/general/VTextInput.vue";
import { IInitFilterList } from "@/types";
interface FilterItem {
  key: string;
  value: string;
}
let loading = ref(true);
const today = new Date();
const filterList = ref<Record<string, (string | FilterItem[])[]>>({
  month: [],
  type: [],
});
const filterDisplayName = {
  month: "general.month",
  type: "general.type",
};
const initFilterList = ref<IInitFilterList>({
  month: previousMonth(today, 6) || [""],
  type: [],
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
  type: { isUse: false },
});
const filterForSearch = ref([]);
const headers = ref([
  { title: "general.date", align: "start", key: "date" },
  { title: "general.payment", align: "start", key: "payment" },
  { title: "general.dollar", align: "start", key: "dollar" },
  { title: "general.category", align: "start", key: "category" },
  { title: "general.detail", align: "start", key: "detail" },
  { title: "general.type", align: "start", key: "type", formatType: true },
  { title: "", align: "end", key: "actions", sortable: false },
]);
const items = ref([
  {
    id: "000001",
    date: "2024/07/18",
    payment: "credit card",
    detail: "Pizza",
    category: "dinner",
    dollar: 50,
    type: "need",
  },
  {
    id: "000002",
    date: "2024/07/19",
    payment: "cash",
    detail: "滷肉飯",
    category: "dinner",
    dollar: 50,
    type: "must",
  },
  {
    id: "000003",
    date: "2024/07/20",
    payment: "cash",
    detail: "牛肉麵",
    category: "lunch",
    dollar: 100,
    type: "must",
  },
  {
    id: "000004",
    date: "2024/07/21",
    payment: "credit card",
    detail: "麻辣火鍋",
    category: "dinner",
    dollar: 200,
    type: "need",
  },
  {
    id: "000005",
    date: "2024/07/22",
    payment: "cash",
    detail: "炒飯",
    category: "lunch",
    dollar: 80,
    type: "must",
  },
]);
let tempItem = ref({});
let dialog = ref({
  show: false,
  type: "view",
});
let deletionConfirmDialog = ref(false);
let result = ref("radio-1");
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
function goToAction(action: string, item?: any) {
  switch (action) {
    case "create":
      tempItem.value = {};
      dialog.value = {
        show: true,
        type: "create",
      };
      break;
    case "view":
      tempItem.value = item;
      dialog.value = {
        show: true,
        type: "view",
      };
      break;
    case "edit":
      tempItem.value = item;
      dialog.value = {
        show: true,
        type: "edit",
      };
      break;
    case "delete":
      tempItem.value = item;
      deletionConfirmDialog.value = true;
      break;
    default:
      // update
      dialog.value = {
        show: false,
        type: "",
      };
      break;
  }
}
function createDetail() {
  dialog.value.show = false;
  console.log("createDetail");
}
function deleteitem() {
  deletionConfirmDialog.value = false;
}
function closeDialog() {
  dialog.value.show = false;
  tempItem.value = {};
}
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
