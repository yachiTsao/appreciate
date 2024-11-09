import { defineStore } from "pinia";
import type { RecordModule } from "../record";
import { StoreIdsEnum } from "../enums/StoreIdEnum";
import { PaymentEnum } from "../enums/PaymentEnum";
import { CategoryEnum } from "../enums/CategoryEnum";

export const useRecordStore = defineStore({
  id: StoreIdsEnum.record,
  state: (): RecordModule.State => ({
    items: JSON.parse(localStorage.getItem("records") || "[]"),
  }),
  getters: {
    // Convert records for display purposes
    convertRecords: (state) => {
      return state.items.map((item) => {
        if (!Object.values(PaymentEnum).includes(item.payment)) {
          item.payment = PaymentEnum[item.payment as keyof typeof PaymentEnum];
        }
        if (!Object.values(CategoryEnum).includes(item.category)) {
          item.category =
            CategoryEnum[item.category as keyof typeof CategoryEnum];
        }
        return item;
      });
    },
    // Get original values for dropdowns
    getPaymentValues: () => Object.values(PaymentEnum),
    getCategoryValues: () => Object.values(CategoryEnum),
  },
  actions: {
    async initRecords() {
      localStorage.setItem(
        "records",
        JSON.stringify([
          {
            id: "001",
            date: "2024/11/01",
            payment: "CREDIT_CARD",
            category: "DINNER",
            dollar: 130,
            detail: "牛肉麵",
            type: "MUST",
          },
          {
            id: "002",
            date: "2024/11/01",
            payment: "CREDIT_CARD",
            category: "SHOPPING",
            dollar: 352,
            detail: "蝦皮購物 長袖上衣",
            type: "NEED",
          },
          {
            id: "003",
            date: "2024/11/02",
            payment: "CASH",
            category: "LUNCH",
            dollar: 80,
            detail: "火腿蛋三明治套餐",
            type: "MUST",
          },
          {
            id: "004",
            date: "2024/11/02",
            payment: "LINE_PAY",
            category: "DRINK",
            dollar: 35,
            detail: "烏弄 金萱烏龍",
            type: "NEED",
          },
        ]),
      );
    },
    async addRecord(record: RecordModule.RecordItem) {
      this.items.push(record);
      localStorage.setItem("records", JSON.stringify(this.items));
    },
    async updateRecord(record: RecordModule.RecordItem) {
      const index = this.items.findIndex((item) => item.id === record.id);
      this.items[index] = record;
      localStorage.setItem("records", JSON.stringify(this.items));
    },
    async deleteRecord(id: string) {
      const index = this.items.findIndex((item) => item.id === id);
      this.items.splice(index, 1);
      localStorage.setItem("records", JSON.stringify(this.items));
    },
  },
  // persist: true
});
