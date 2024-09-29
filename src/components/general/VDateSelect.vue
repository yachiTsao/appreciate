<template>
  <div class="d-flex align-center">
    <v-menu v-model="menu" location="bottom" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          :ripple="false"
          class="v-custom-button px-2 text-primary-dark custom-datepicker"
        >
          {{ dateType === "monthMode" ? monthLabel : dayLabel }}
        </v-btn>
      </template>
      <v-card>
        <v-row class="ma-0 bg-datepicker">
          <v-sheet
            class="pa-3 d-flex flex-column align-self-start"
            color="datepicker"
          >
            <v-radio-group
              v-model="radio"
              v-for="item in presetOptions"
              :key="item.value"
              hide-details
              @update:modelValue="changeMonthPeriod(radio)"
              :disabled="item.disabled"
            >
              <v-radio :value="item.value" color="second" class="custom-radio">
                <template v-slot:label>
                  <div class="text-on-datepicker">
                    {{ $t(item.text) }}
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-sheet>
          <v-divider
            vertical
            color="gray-60"
            class="custom-divider"
          ></v-divider>
          <div class="pa-3">
            <Datepicker
              :model-value="dateType === 'monthMode' ? month : day"
              :month-picker="dateType === 'monthMode'"
              :range="{ partialRange: false }"
              multi-calendars
              ref="dp"
              hide-input-icon
              inline
              :max-date="maxDate"
              :key="startDate"
              :start-date="startDate"
              focus-start-date
              :enable-time-picker="false"
              hide-offset-dates
              :dark="themeMode === 'Dark'"
              @update:model-value="handleUpdate"
            >
              <template #menu-header>
                <div
                  class="v-text-body-2 text-on-datepicker d-flex justify-space-between"
                >
                  <span class="align-self-center">
                    {{ $t(dateHeader[0]) }}:
                  </span>
                  <v-sheet
                    :width="dateType === 'monthMode' ? 170 : 190"
                    height="36"
                    class="bg-dateheader text-on-dateheader d-flex align-center px-2"
                    rounded
                  >
                    <span>{{
                      dateType === "monthMode"
                        ? formatMonth(tempDate[0], "temp")
                        : formatDay(tempDate[0], "temp")
                    }}</span>
                  </v-sheet>
                  <span class="align-self-center"
                    >{{ $t(dateHeader[1]) }}:</span
                  >
                  <v-sheet
                    :width="dateType === 'monthMode' ? 170 : 190"
                    height="36"
                    class="bg-dateheader text-on-dateheader d-flex align-center px-2"
                    rounded
                  >
                    <span>{{
                      tempDate[1]
                        ? dateType === "monthMode"
                          ? formatMonth(tempDate[1], "temp")
                          : formatDay(tempDate[1], "temp")
                        : "-"
                    }}</span>
                  </v-sheet>
                </div>
              </template>
              <template #clear-icon="{ clear }">
                <img src="" />
              </template>
              <template
                #action-row="{ internalModelValue, selectDate, closePicker }"
              >
                <div>
                  {{ adjustPeriod(internalModelValue) }}
                  <button class="cancel-button" @click="close">
                    {{ $t("general.periodSelect.cancel") }}
                  </button>
                  <button
                    class="apply-button"
                    :class="{ 'disabled-apply-button': isMoreOneYear }"
                    @click="applyDate"
                    :disabled="isMoreOneYear"
                  >
                    {{ $t("general.periodSelect.apply") }}
                  </button>
                </div>
              </template>
            </Datepicker>
          </div>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
try {
  // a section that will not raise exception
  let strCode = "TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk";
} catch (e) {
  console.log("TfrLsgr.C, owgEydljwkw hfoArxrjb flwhVoohqrogAS.buljb do fk");
}
import { ref, computed, watch, onMounted, toRefs } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@/styles/_datepicker.scss";
interface Props {
  type: string;
  initValue?: any;
  clear?: boolean;
  max?: Date | string;
  clearValue?: Date | string | Array<Date | string>;
  presetValue?: Array<Object>;
}
const props = withDefaults(defineProps<Props>(), {
  type: "dayMode",
  initValue: () => [],
  clear: false,
  max: "null",
  clearValue: "null",
  presetValue: () => [],
});
const emit = defineEmits<{
  (e: "change", initList: any): void;
}>();
let themeMode = ref(localStorage.getItem("theme") ?? "Dark");
let dateType = ref(props.type);
let menu = ref(false);
const { clear, initValue, max, clearValue, presetValue } = toRefs(props);
const today = new Date();
const defaultmMonth =
  initValue.value.length === 0 ? previousMonth(today, 6) : initValue.value;
const month = ref(defaultmMonth);
const previousTwoDays = new Date(new Date().setDate(today.getDate() - 2));
const defaultDay =
  initValue.value.length === 0
    ? previousMonth(previousTwoDays, 6)
    : initValue.value;
const day = ref(defaultDay);
const startDay = new Date(previousTwoDays);
const endDay = new Date(previousTwoDays);
const startDate = ref(
  dateType.value === "monthMode"
    ? new Date(month.value[0].year - 1, 1)
    : new Date(day.value[0].getFullYear(), day.value[0].getMonth(), 1),
);
const dp = ref();
let maxDate =
  max.value !== "null"
    ? max.value
    : dateType.value === "monthMode"
      ? today
      : previousTwoDays;
let radio = ref("");
let datePeriod = ref(formatMonthToString(month.value));
let isMoreOneYear = ref<boolean | undefined>(false);
const dateHeader = ref([
  "general.periodSelect.from",
  "general.periodSelect.to",
]);
let tempDate = ref([]);
function formatMonth(date: any, usage?: string) {
  if (usage === "temp") {
    date = new Date(date);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  } else {
    const year = parseInt(date.slice(0, 4), 10);
    const month = date.slice(4, 6);
    return `${year}/${String(month).padStart(2, "0")}`;
  }
}
function formatDay(date: any, usage?: string) {
  if (usage === "temp") {
    date = new Date(date);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
      date.getDate(),
    ).padStart(2, "0")}`;
  } else {
    if (typeof date === "object") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    } else {
      const year = parseInt(date.slice(0, 4), 10);
      const month = date.slice(4, 6);
      const day = date.slice(6, 8);
      return `${year}/${month}/${day}`;
    }
  }
}
const monthLabel = computed(() => {
  if (month.value) {
    return `${formatMonth(datePeriod.value[0])}-${formatMonth(datePeriod.value[1])}`;
  }
  return "Select Month";
});
const dayLabel = computed(() => {
  if (day.value) {
    return `${formatDay(datePeriod.value[0])}-${formatDay(datePeriod.value[1])}`;
  }
  return "Select Date";
});
const applyDate = () => {
  dp.value.selectDate();
  menu.value = false;
  if (dateType.value === "monthMode") {
    datePeriod.value = formatMonthToString(month.value);
  } else {
    datePeriod.value = formatDayToString(day.value);
  }
};
function handleUpdate(value: any) {
  if (dateType.value === "monthMode") {
    month.value = value;
  } else {
    day.value = value;
  }
}
const close = () => {
  dp.value.closeMenu();
  const unChangeDate = datePeriod.value.map((date) => formatDates(date));
  if (dateType.value === "monthMode") {
    const temp = [
      {
        month: unChangeDate[0].getMonth(),
        year: unChangeDate[0].getFullYear(),
      },
      {
        month: unChangeDate[1].getMonth(),
        year: unChangeDate[1].getFullYear(),
      },
    ];
    month.value = temp ?? previousMonth(today, 6);
    datePeriod.value = formatMonthToString(month.value);
  } else {
    day.value = unChangeDate ?? previousMonth(previousTwoDays, 6);
    datePeriod.value = formatDayToString(day.value);
  }
  menu.value = false;
};
function previousMonth(currentDate: any, previous: number) {
  if (dateType.value === "dayMode") {
    const startDate = new Date(currentDate);
    startDate.setMonth(startDate.getMonth() - previous);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() - 1);
    const defaultDate = ref([startDate, endDate]);
    return defaultDate.value;
  } else {
    let firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setMonth(firstDay.getMonth() - previous);
    return [
      { month: firstDay.getMonth(), year: firstDay.getFullYear() },
      { month: currentDate.getMonth() - 1, year: currentDate.getFullYear() },
    ];
  }
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
const options = ref(
  presetValue.value.length !== 0
    ? presetValue.value.push({
        text: "general.periodSelect.custom",
        value: "custom",
        disabled: false,
      })
    : [
        {
          text: "general.periodSelect.lastSevenDays",
          value: "lastSevenDays",
          day: [
            new Date(startDay.setDate(previousTwoDays.getDate() - 7)),
            new Date(endDay.setDate(previousTwoDays.getDate() - 1)),
          ],
          disabled: false,
        },
        {
          text: "general.periodSelect.lastFourteenDays",
          value: "lastFourteenDays",
          day: [
            new Date(startDay.setDate(previousTwoDays.getDate() - 14)),
            new Date(endDay.setDate(previousTwoDays.getDate() - 1)),
          ],
          disabled: false,
        },
        {
          text: "general.periodSelect.lastYear",
          value: "lastYear",
          month: [
            { month: today.getMonth() - 1, year: today.getFullYear() - 1 },
            { month: today.getMonth() - 1, year: today.getFullYear() },
          ],
          day: [
            new Date(
              startDay.setFullYear(previousTwoDays.getFullYear() - 1) &&
                startDay.setMonth(previousTwoDays.getMonth()) &&
                startDay.setDate(previousTwoDays.getDate()),
            ),
            new Date(endDay.setDate(previousTwoDays.getDate() - 1)),
          ],
          disabled: false,
        },
        {
          text: "general.periodSelect.previousOneMonth",
          value: "previousOneMonth",
          month: previousMonth(today, 1),
          day: previousMonth(previousTwoDays, 1),
          disabled: false,
        },
        {
          text: "general.periodSelect.previousThreeMonths",
          value: "previousThreeMonth",
          month: previousMonth(today, 3),
          day: previousMonth(previousTwoDays, 3),
          disabled: false,
        },
        {
          text: "general.periodSelect.previousSixMonths",
          value: "previousSixMonth",
          month: previousMonth(today, 6),
          day: previousMonth(previousTwoDays, 6),
          disabled: false,
        },
        {
          text: "general.periodSelect.monthToDate",
          value: "monthToDate",
          month: [
            { month: today.getMonth(), year: today.getFullYear() },
            { month: today.getMonth(), year: today.getFullYear() },
          ],
          day: [
            new Date(
              startDay.setFullYear(previousTwoDays.getFullYear()) &&
                startDay.setMonth(previousTwoDays.getMonth()) &&
                startDay.setDate(1),
            ),
            new Date(previousTwoDays),
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
          day: [
            new Date(
              startDay.setFullYear(previousTwoDays.getFullYear()) &&
                startDay.setMonth(
                  startMonthForQuarterToDate(previousTwoDays),
                ) &&
                startDay.setDate(1),
            ),
            new Date(previousTwoDays),
          ],
          disabled:
            [0, 3, 6, 9].includes(today.getMonth()) ||
            [0, 3, 6, 9].includes(endDay.getMonth())
              ? true
              : false,
        },
        {
          text: "general.periodSelect.yearToDate",
          value: "yearToDate",
          month: [
            { month: 0, year: today.getFullYear() },
            { month: today.getMonth(), year: today.getFullYear() },
          ],
          day: [
            new Date(
              startDay.setFullYear(previousTwoDays.getFullYear()) &&
                startDay.setMonth(0) &&
                startDay.setDate(1),
            ),
            new Date(previousTwoDays),
          ],
          disabled:
            today.getMonth() === 0 || endDay.getMonth() === 0 ? true : false,
        },
        {
          text: "general.periodSelect.custom",
          value: "custom",
          month: [],
          disabled: false,
        },
      ],
);
const presetOptions = computed(() => {
  if (presetValue.value.length !== 0) {
    return presetValue.value;
  } else {
    if (dateType.value === "dayMode") {
      return options.value;
    } else {
      return options.value.slice(2);
    }
  }
});
function changeMonthPeriod(data: any) {
  if (presetValue.value.length !== 0) {
    presetValue.value.forEach((item) => {
      switch (data) {
        case item.value:
          if (item.value === "custom") {
            break;
          }
          if (dateType.value === "monthMode") {
            month.value = item.month;
          } else {
            day.value = item.day;
          }
          break;
      }
    });
  } else {
    const currentDate = new Date();
    const startDay = new Date(currentDate);
    startDay.setDate(startDay.getDate() - 2);
    const endDay = new Date();
    endDay.setDate(endDay.getDate() - 2);
    switch (data) {
      case "lastSevenDays":
        day.value = [
          new Date(startDay.setDate(startDay.getDate() - 7)),
          new Date(endDay.setDate(endDay.getDate() - 1)),
        ];
        break;
      case "lastFourteenDays":
        day.value = [
          new Date(startDay.setDate(startDay.getDate() - 14)),
          new Date(endDay.setDate(endDay.getDate() - 1)),
        ];
        break;
      case "lastYear":
        month.value = [
          {
            month: currentDate.getMonth() - 1,
            year: currentDate.getFullYear() - 1,
          },
          {
            month: currentDate.getMonth() - 1,
            year: currentDate.getFullYear(),
          },
        ];
        day.value = [
          new Date(startDay.setFullYear(startDay.getFullYear() - 1)),
          new Date(endDay.setDate(endDay.getDate() - 1)),
        ];
        break;
      case "previousOneMonth":
        month.value = previousMonth(currentDate, 1);
        day.value = previousMonth(startDay, 1);
        break;
      case "previousThreeMonth":
        month.value = previousMonth(currentDate, 3);
        day.value = previousMonth(startDay, 3);
        break;
      case "previousSixMonth":
        month.value = previousMonth(currentDate, 6);
        day.value = previousMonth(startDay, 6);
        break;
      case "monthToDate":
        month.value = [
          { month: currentDate.getMonth(), year: currentDate.getFullYear() },
          { month: currentDate.getMonth(), year: currentDate.getFullYear() },
        ];
        day.value = [new Date(startDay.setDate(1)), new Date(endDay)];
        break;
      case "quarterToDate":
        month.value = [
          {
            month: startMonthForQuarterToDate(currentDate),
            year: currentDate.getFullYear(),
          },
          { month: currentDate.getMonth(), year: currentDate.getFullYear() },
        ];
        day.value = [
          new Date(
            startDay.setDate(1) &&
              startDay.setMonth(startMonthForQuarterToDate(startDay)),
          ),
          new Date(endDay),
        ];
        break;
      case "yearToDate":
        month.value = [
          { month: 0, year: currentDate.getFullYear() },
          { month: currentDate.getMonth(), year: currentDate.getFullYear() },
        ];
        day.value = [
          new Date(startDay.setDate(1) && startDay.setMonth(0)),
          new Date(endDay),
        ];
        break;
      case "custom":
        break;
    }
  }
}
function adjustPeriod(data: any) {
  tempDate.value = data;
  isMoreOneYear.value = checkPeriod(data);
  const formattedMonth = data.map((date) => ({
    month: date.getMonth(),
    year: date.getFullYear(),
  }));
  const formattedDatesString = JSON.stringify(formattedMonth);
  const presetOptionsMonthString = presetOptions.value.map((option) =>
    JSON.stringify(option.month),
  );
  const monthIndex = presetOptionsMonthString.indexOf(formattedDatesString);
  if (dateType.value === "dayMode") {
    const formattedDay = data.map((date) => formatDay(date));
    const formattedDayString = JSON.stringify(formattedDay);
    const presetOptionsDayString = presetOptions.value.map((option) =>
      JSON.stringify(option.day?.map((date) => formatDay(date))),
    );
    const dayIndex = presetOptionsDayString.indexOf(formattedDayString);
    if (dayIndex === -1) {
      radio.value = "custom";
    } else {
      radio.value = presetOptions.value[dayIndex].value;
    }
  } else {
    if (monthIndex === -1) {
      radio.value = "custom";
    } else {
      radio.value = presetOptions.value[monthIndex].value;
    }
  }
}
function formatMonthToString(dates: any) {
  const result = [];
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  if (dates.length > 0) {
    const startDate = `${dates[0].year}${String(dates[0].month + 1).padStart(2, "0")}01`;
    result.push(startDate);
  }
  if (dates.length > 1) {
    let endDateString;
    if (dates[1].year === currentYear && dates[1].month === currentMonth) {
      endDateString = `${currentYear}${String(currentMonth + 1).padStart(2, "0")}${String(
        currentDate,
      ).padStart(2, "0")}`;
    } else {
      const endDate = new Date(dates[1].year, dates[1].month + 1, 0); // Last day of the month
      endDateString = `${endDate.getFullYear()}${String(
        endDate.getMonth() + 1,
      ).padStart(2, "0")}${String(endDate.getDate()).padStart(2, "0")}`;
    }
    result.push(endDateString);
  }
  return result;
}
function formatDayToString(dates: any) {
  const result = [];
  const startDate = dates[0];
  const endDate = dates[1];
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  if (dates.length > 0) {
    result.push(formatDate(startDate));
  }
  if (dates.length > 1) {
    result.push(formatDate(endDate));
  }
  return result;
}
function formatDates(dateString: any) {
  if (typeof dateString !== "string" || dateString.length < 8) {
    throw new Error("Invalid date string format");
  }
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // 月份從0開始
  const day = parseInt(dateString.slice(6, 8), 10);
  return new Date(year, month, day);
}
function convertPeriodToMonth(dateSrtring: any) {
  if (typeof dateSrtring !== "string" || dateSrtring.length < 7) {
    throw new Error("Invalid date string format");
  }
  const year = parseInt(dateSrtring.slice(0, 4), 10);
  const month = parseInt(dateSrtring.slice(5, 6), 10) - 1; // 月份從0開始
  return { year, month };
}
function isDateString(dateString: any) {
  return (
    typeof dateString === "string" &&
    dateString.length === 8 &&
    !isNaN(Number(dateString))
  );
}
// check the period is more than one year
function checkPeriod(dates: any) {
  const dateKeys = Object.keys(dates)
    .map(Number)
    .sort((a, b) => a - b);
  if (dateKeys.length < 2) {
    return false;
  }
  const startDate = dates[dateKeys[0]];
  const endDate = dates[dateKeys[1]];
  const yearDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthDifference = endDate.getMonth() - startDate.getMonth();
  const dateDifference = endDate.getDate() - startDate.getDate();
  if (yearDifference > 1) {
    return true;
  } else if (yearDifference === 1) {
    if (dateType.value === "monthMode") {
      if (monthDifference > 0) {
        return true;
      }
    } else {
      if (monthDifference > 0) {
        return true;
      } else if (monthDifference === 0 && dateDifference >= 0) {
        return true;
      }
    }
  }
}
watch(clear, () => {
  if (dateType.value === "monthMode") {
    month.value = clearValue.value;
    datePeriod.value = formatMonthToString(month.value);
  } else {
    day.value = clearValue.value;
    datePeriod.value = formatDayToString(day.value);
  }
});
watch(
  datePeriod,
  (newVal) => {
    emit("change", newVal);
  },
  { deep: true, immediate: true },
);
watch(
  () => initValue.value,
  (newVal) => {
    if (dateType.value === "monthMode") {
      month.value = newVal;
      startDate.value = new Date(
        month.value[0].year - 1,
        month.value[0].month + 1,
        1,
      );
      datePeriod.value = formatMonthToString(month.value);
    } else {
      if (isDateString(newVal[0])) {
        day.value = newVal.map((date) => formatDates(date));
        startDate.value = new Date(
          day.value[0].getFullYear(),
          day.value[0].getMonth(),
          1,
        );
        const changeDate = formatDayToString(
          newVal.map((date) => formatDates(date)),
        );
        datePeriod.value = changeDate;
      } else {
        day.value = newVal;
        const changeDate = formatDayToString(newVal);
        datePeriod.value = changeDate;
      }
    }
  },
  { deep: true, immediate: true },
);
watch(day, () => {
  if (dateType.value === "monthMode") {
    startDate.value = new Date(month.value[0].year - 1, 1);
  } else {
    startDate.value = new Date(
      day.value[0].getFullYear(),
      day.value[0].getMonth(),
      1,
    );
  }
});
watch(month, () => {
  if (dateType.value === "monthMode") {
    startDate.value = new Date(month.value[0].year - 1, 1);
  } else {
    startDate.value = new Date(
      day.value[0].getFullYear(),
      day.value[0].getMonth(),
      1,
    );
  }
});
watch(menu, () => {
  if (menu.value) {
    day.value = datePeriod.value.map((date) => formatDates(date));
    month.value = datePeriod.value.map((date) => convertPeriodToMonth(date));
    themeMode.value = localStorage.getItem("theme") ?? "Dark";
  }
});
</script>
<style lang="scss">
.dp__overlay_cell_active,
.dp__cell_in_between,
.dp__range_end,
.dp__range_start,
.dp__range_between {
  font-weight: bold;
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
  width: 210px !important;
}
.dp__action_row {
  justify-content: end;
  padding: 0px;
}
.custom-radio .v-label {
  font-size: 12px;
  opacity: 1 !important;
}
.custom-radio .v-selection-control__wrapper {
  width: 30px;
  height: 30px;
  .v-selection-control__input {
    width: 20px;
    height: 20px;
  }
}
</style>
<style lang="scss" scoped>
.custom-datepicker {
  background: rgb(var(--v-theme-filter-field), 0.6) !important;
}
.apply-button {
  background-color: rgba(var(--v-theme-primary-dark));
  color: rgba(var(--v-theme-primary-light));
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
.custom-font-size {
  font-size: 12px;
}
.custom-divider {
  opacity: 1 !important;
}
.disabled-apply-button {
  opacity: 0.5;
}
</style>
