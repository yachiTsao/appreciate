import { defineStore } from "pinia";
import type { AuthenticationModule } from "../auth";

const browserLang: string =
  navigator.language === "en" ? "en-US" : navigator.language;
export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthenticationModule.State => ({
    // initialize state from local storage to enable the user to stay logged in
    user: null,
    lang: localStorage.getItem("lang") ?? browserLang,
    // if you want to change the theme, you can set the value to 'Light'.
    theme: localStorage.getItem("theme") ?? "Dark",
    returnUrl: null,
  }),
  actions: {},
  // persist: true
});
