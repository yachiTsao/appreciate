/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify/lib/framework";
import { lightColors, darkColors } from "../theme";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: lightColors,
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: darkColors,
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    variations: {
      colors: ["primary-blue", "gray-60"],
      lighten: 1,
      darken: 2,
    },
    themes: {
      darkTheme,
      lightTheme,
    },
  },
  defaults: {
    VBtn: {
      elevation: 0,
      class: "text-none",
      style: {
        "letter-spacing": "normal",
      },
    },
    VListItemTitle: {
      class: "v-text-body-2",
    },
    VListItem: {
      class: "v-text-body-2",
      style: {
        "min-height": "36px",
      },
    },
  },
});
