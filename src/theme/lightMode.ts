import type { ColorVariables } from '@/declarations/Theme'
const {
  primaryBlue,
  primaryDarkBlue,
  primaryGreen,
  primaryOrange,
  highlightRed,
  highlightGreen,
  gray0,
  gray20,
  gray30,
  gray40,
  gray50,
  gray60,
  gray80,
  gray90,
  gray100
}: ColorVariables = {
  primaryBlue: '#2872B6',
  primaryDarkBlue: '#003A70',
  primaryGreen: '#0FADB7',
  primaryOrange: '#FF9F5A',
  highlightRed: '#EE5E6F',
  highlightGreen: '#17B05D',
  gray0: '#1E282C',
  gray20: '#556675',
  gray30: '#8E969E',
  gray40: '#A9B6C3',
  gray50: '#394552',
  gray60: '#C4D7E9',
  gray80: '#E3ECF5',
  gray90: '#EDEEEE',
  gray100: '#FBFBFB'
}

export const lightColors = {
  white: gray100,
  black: gray0,
  'primary-blue': primaryBlue,
  'on-primary-blue': gray100,
  'primary-dark-blue': primaryDarkBlue,
  'on-primary-dark-blue': gray100,
  'primary-green': primaryGreen,
  'primary-orange': primaryOrange,
  'highlight-red': highlightRed,
  'highlight-green': highlightGreen,
  'gray-0': gray0,
  'gray-20': gray20,
  'gray-30': gray30,
  'on-gray-30': gray0,
  'gray-40': gray40,
  'on-gray-40': gray0,
  'gray-50': gray50,
  'on-gray-50': gray100,
  'gray-60': gray60,
  'on-gray-60': gray0,
  'gray-80': gray80,
  'on-gray-80': gray0,
  'gray-90': gray90,
  'on-gray-90': gray0,
  'gray-100': gray100,
  'on-gray-100': gray0,
  error: highlightRed,
  'on-error': gray80,
  info: primaryBlue,
  success: highlightGreen,
  warning: primaryOrange,
  header: primaryBlue,
  'on-header': gray100,
  sidemenu: gray60,
  'on-sidemenu': gray0,
  'sidemenu-group': primaryBlue,
  'on-sidemenu-group': gray100,
  'sidemenu-icon': primaryDarkBlue,
  'sidemenu-selected': gray80,
  card: gray100,
  'on-card': gray20,
  table: gray100,
  'on-table': gray20,
  'table-pagination-selected': primaryBlue,
  'on-table-pagination-selected': gray100,
  alert: gray100,
  'on-alert': gray20,
  'alert-title': primaryBlue,
  dialog: gray100,
  'on-dialog': gray20,
  tab: gray60,
  'on-tab': gray20,
  'tab-selected': gray100,
  'on-tab-selected': gray0,
  filter: gray80,
  'on-filter': gray20,
  label: gray90,
  'on-label': gray30,
  dropdown: gray80,
  'on-dropdown': gray20,
  field: gray80,
  'on-field': gray20,
  tooltip: gray100,
  'on-tooltip': gray20,
  'expansion-group': primaryDarkBlue,
  'on-expansion-group': gray100,
  mdeditor: gray90,
  mdtoolbar: gray80,
  mdborder: gray60,
  mdcode: gray90,
  'on-mdcode': gray20,
  mdmodalbody: gray100,
  'on-mdmodalbody': gray20,
  mdmodalinput: gray80,
  stepper: primaryBlue,
  'on-stepper': gray100,
  'on-date-picker': primaryDarkBlue
}
