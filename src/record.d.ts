// Declare interface, type, ...etc, which are related to the module.
export namespace RecordModule {
  type State = {
    items: RecordItem[];
  };

  interface RecordItem {
    id: number | string;
    date: string | null;
    payment: number | string;
    category: string;
    dollar: number | string;
    detail: string;
    type: string;
  }
}

export namespace ChartModule {
  type State = {
    items: RecordItem[];
    loading: boolean;
    filteredItems?: any;
  };

  interface RecordItem {
    id: number | string;
    date: string | null;
    payment: number | string;
    category: string;
    dollar: number | string;
    detail: string;
    type: string;
  }
}
