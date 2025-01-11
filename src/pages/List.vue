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
        <VDataTable
          :headers="headers"
          :items="convertedItems"
          :fixed-last-column="true"
          :actions="['view', 'delete']"
          @viewItem="(val) => goToAction('view', val)"
          @deleteItem="(val) => goToAction('delete', val)"
        />
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
        <v-form ref="form" v-model="isFormValid">
          <v-row class="ma-0">
            <VLabel
              v-if="dialog.type === 'view'"
              class="pa-0 pb-2 v-col-12"
              :title="'general.date'"
              suffix=""
              :text="tempItem.date"
            />
            <p
              v-if="dialog.type !== 'view'"
              class="v-text-body-1 mb-2 text-primary-dark"
            >
              {{ $t("general.date") }}
            </p>
            <Datepicker
              v-if="dialog.type !== 'view'"
              ref="datePicker"
              v-model="date"
              :format="formatDate"
              :enable-time-picker="false"
              :clearable="false"
              :start-date="today"
              hide-input-icon
              :dark="authTheme === 'Dark'"
              class="custom-date-picker mb-4"
            >
              <template #action-row="{}">
                <div class="d-flex justify-space-between">
                  <button class="cancel-button" @click="close()">
                    {{ $t("general.periodSelect.cancel") }}
                  </button>
                  <button class="apply-button" @click="applyDate()">
                    {{ $t("general.periodSelect.apply") }}
                  </button>
                </div>
              </template>
            </Datepicker>
          </v-row>
          <v-row class="ma-0">
            <v-col class="pa-0 pr-2" cols="12" sm="6">
              <VLabel
                v-if="dialog.type === 'view'"
                :title="'general.payment'"
                suffix=""
                :text="
                  $te(tempItem.payment)
                    ? $t(tempItem.payment)
                    : tempItem.payment
                "
              />
              <VSingleSelect
                v-if="dialog.type !== 'view'"
                :displayName="'general.payment'"
                :item-title="(item) => $t(item.key)"
                :item-value="'value'"
                :items="paymentItems"
                :init-value="tempItem.payment"
                :search-bar="false"
                :rules="
                  singleSelectionValidator(
                    tempItem.payment,
                    $t('general.singleSelectError'),
                  )
                "
                @change="(v) => (tempItem.payment = v)"
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
                v-model="tempItem.dollar"
                :init-value="tempItem.dollar"
                :hide-details="false"
                :rules="
                  textValidator(
                    tempItem.dollar,
                    errorMessages,
                    () => checkOnlyNumber(tempItem.dollar),
                    'checkOnlyNumber',
                  )
                "
                @change="(v) => (tempItem.dollar = v)"
              />
            </v-col>
          </v-row>
          <v-row class="ma-0 pb-5">
            <VLabel
              v-if="dialog.type === 'view'"
              class="pa-0 pb-2 v-col-12"
              :title="'general.category'"
              suffix=""
              :text="
                $te(tempItem.category)
                  ? $t(tempItem.category)
                  : tempItem.category
              "
            />
            <VSingleSelect
              v-if="dialog.type !== 'view'"
              :displayName="'general.category'"
              :item-title="(item) => $t(item.key)"
              :item-value="'value'"
              :items="categoryItems"
              :init-value="tempItem.category"
              :search-bar="false"
              class="pa-0 v-col-12"
              :rules="
                singleSelectionValidator(
                  tempItem.category,
                  $t('general.singleSelectError'),
                )
              "
              @change="(v) => (tempItem.category = v)"
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
              v-model="tempItem.detail"
              :displayName="'general.detail'"
              :init-value="tempItem.detail"
              class="pa-0 v-col-12"
              :hide-details="false"
              :rules="textValidator(tempItem.detail, errorMessages)"
              @change="(v) => (tempItem.detail = v)"
            />
          </v-row>
          <v-row class="ma-0 pb-5">
            <VLabel
              v-if="dialog.type === 'view'"
              class="pa-0 v-col-12"
              :title="'general.type'"
              suffix=""
              :text="
                $te(`general.${tempItem.type}`)
                  ? $t(`general.${tempItem.type}`)
                  : tempItem.type
              "
            />
            <div v-else>
              <p class="v-text-body-2 text-primary-dark">
                {{ $t("general.type") }}
              </p>
              <v-radio-group
                v-model="tempItem.type"
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
        </v-form>
      </template>
      <template #actions>
        <v-row align-end justify-end class="ma-0 px-5 pb-5">
          <v-btn
            height="34"
            block
            color="primary"
            variant="flat"
            :loading="loading"
            :disabled="dialog.type !== 'view' && !isFormValid"
            class="custom-button"
            @click="
              dialog.type === 'view'
                ? goToAction('edit', tempItem)
                : dialog.type === 'create'
                  ? createDetail(tempItem)
                  : updateDetail(tempItem)
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
import { onMounted, watch, ref, computed } from "vue";
import VDataTable from "@/components/general/VDataTable.vue";
import VDialogLayout from "@/components/general/VDialogLayout.vue";
import VDeletionAlert from "@/components/general/VDeletionAlert.vue";
import VFilterSelectLayout from "@/components/general/VFilterSelectLayout.vue";
import VLabel from "@/components/general/VLabel.vue";
import VTextInput from "@/components/general/VTextInput.vue";
import VSingleSelect from "@/components/general/VSingleSelect.vue";
import { IInitFilterList } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import { useRecordStore } from "@/stores/recordStore";
import { storeToRefs } from "pinia";
import Datepicker from "@vuepic/vue-datepicker";
import { singleSelectionValidator, textValidator } from "@/utils/mixinTools";
import { useI18n } from "vue-i18n";

interface FilterItem {
  key: string;
  value: string;
}
const authStore = useAuthStore();
const recordStore = useRecordStore();
const { theme: authTheme } = storeToRefs(authStore);
const { convertRecords, getPaymentValues, getCategoryValues } =
  storeToRefs(recordStore);
const { t } = useI18n();
let loading = ref(true);
let isFormValid = ref(false);
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
  {
    title: "general.payment",
    align: "start",
    key: "payment",
    isTranslate: true,
  },
  { title: "general.dollar", align: "start", key: "dollar" },
  {
    title: "general.category",
    align: "start",
    key: "category",
    isTranslate: true,
  },
  { title: "general.detail", align: "start", key: "detail" },
  { title: "general.type", align: "start", key: "type", formatType: true },
  { title: "", align: "end", key: "actions", sortable: false },
]);
const convertedItems = computed(() => convertRecords.value);
let tempItem = ref({
  date: "",
  payment: "",
  dollar: "",
  category: "",
  detail: "",
  type: "",
});
let dialog = ref({
  show: false,
  type: "view",
});
let deletionConfirmDialog = ref(false);
const datePicker = ref();
const date = ref(new Date());
const formatDate = (date: any) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};
const paymentItems = computed(() =>
  getPaymentValues.value.map((value) => ({
    key: value,
    value,
  })),
);
const categoryItems = computed(() =>
  getCategoryValues.value.map((value) => ({
    key: value,
    value,
  })),
);
const checkOnlyNumber = (value: string): boolean => /^[0-9]*$/.test(value);
const errorMessages = {
  default: t("general.textInputError"),
  checkOnlyNumber: t("general.onlyNumber"),
};
function applyDate() {
  datePicker.value.selectDate();
}
function close() {
  datePicker.value.closeMenu();
}
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
      date.value = new Date();
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
      tempItem.value = { ...item }; // 將 item 複製到 tempItem
      date.value = new Date(item.date);
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
      dialog.value = {
        show: false,
        type: "",
      };
      break;
  }
}
function createDetail(creatItem: any) {
  creatItem.date = formatDate(date.value);
  recordStore.addRecord(creatItem);
  dialog.value.show = false;
}
function updateDetail(updatedItem: any) {
  recordStore.updateRecord(updatedItem);
  dialog.value.show = false;
}
function deleteitem() {
  recordStore.deleteRecord(tempItem.value.id);
  deletionConfirmDialog.value = false;
}
function closeDialog() {
  dialog.value.show = false;
  tempItem.value = {};
}
watch(date, (newDate) => {
  tempItem.value.date = formatDate(newDate);
});
onMounted(async () => {
  await recordStore.initRecords();
  loading.value = false;
});
</script>

<style lang="scss">
.custom-date-picker {
  .dp__overlay_cell_active,
  .dp__cell_in_between,
  .dp__range_end,
  .dp__range_start,
  .dp__range_between {
    font-weight: bold;
  }
  .dp__calendar_header_separator {
    height: 0;
  }
  .dp__input {
    background: rgba(var(--v-theme-third));
    height: 40px;
  }
  .dp__cell_disabled,
  .dp__overlay_cell_disabled {
    background: transparent !important;
    color: rgba(var(--v-theme-gray-0), 0.6) !important;
  }
  .dp__cell_disabled:hover,
  .dp__overlay_cell_disabled:hover {
    background: transparent !important;
    color: rgba(var(--v-theme-gray-0), 0.6) !important;
  }
  .dp__overlay {
    height: 210px !important;
    width: 260px !important;
  }
  .dp__action_row {
    justify-content: center;
    padding-top: 0;
    padding-bottom: 8px;
  }
}
.apply-button {
  background-color: rgba(var(--v-theme-primary));
  color: rgba(var(--v-theme-primary-dark));
  padding: 8px 24px;
  margin-left: 12px;
  border-radius: 4px;
  font-size: 12px;
}
.cancel-button {
  color: rgba(var(--v-theme-primary-dark));
  padding: 8px 20px;
  border: 1px solid rgba(var(--v-theme-primary-dark));
  border-radius: 4px;
  font-size: 12px;
}
</style>
<style lang="scss" scoped>
.custom-button:disabled {
  background-color: rgba(var(--v-theme-white)) !important;
  opacity: 0.5 !important;
}
</style>
