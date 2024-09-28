export interface IHeader {
  title: string
  align: 'start' | 'center' | 'end' | undefined
  key: string
  formatDateTime?: boolean
  formatHover?: boolean
  formatStatus?: boolean
  formatSwitch?: boolean
  formatPrice?: IVDataTableFormatPrice
  formatCharge?: IVDataTableFormatCharge
  formatUtilization?: boolean
  formatLink?: {
    path: string
    query: {
      [key: string]: string
    }
  }
  formatLinkedAccountId?: boolean
  formatPosiNegaNum?: boolean
  formatSpecificTagData?: {
    tagName: string
  }
  formatLinkMenu?: {
    menuContenctKey: string
  }
  formatDaysLeft?: boolean
  formatStrDateAddSlash?: boolean
  formatTags?: boolean
  formatRate?: boolean
  sortable?: boolean
  width?: string
  minWidth?: string
  hide?: boolean
  isTranslate?: boolean
}

export interface IToolBarBtn {
  show: boolean
  text: string
  iconName: string
  disabled: boolean
}

export interface IFilterForMonthItem {
  month: string | number
  year: string | number
}

export interface IFilterForPeriodItem {
  [key: string]: any
  isUse: boolean
  type?: string
}
export interface IFilterItem {
  key: string
  value: string | number
}

export interface IFilterGroup {
  group: string
  items: IFilterItem[]
}

export interface IFilterDisplayName {
  [key: string]: string
}

// 會用於日期篩選
export interface IFilterMultiple {
  [key: string]: boolean | IFilterForPeriodItem
}

export interface IFilterList {
  [key: string]: string[] | IFilterItem[] | IFilterGroup[]
}

// 已點擊該 option 之意, 對應 IFilterItem.value. 單選的項目才會有值
export interface IInitFilterList {
  [key: string]: string[] | number[] | Date[] | IFilterForMonthItem[]
}

export interface IVDataTableFormatCharge {
  prefOrSuff?: 'prefix' | 'suffix'
  word?: string // 放前綴或後綴的文字
  toFixed?: number // 小數點四捨五入取到第幾位
  colorClass?: string
  multiple?: number // 乘以的倍數值。如百分比狀況常會需要乘 100
  isNulltoHyphen?: boolean
  needCompare?: boolean
  compareColunm?: Array<string>
}

export interface IVDataTableFormatPrice {
  isOnlyFormat?: boolean
}
