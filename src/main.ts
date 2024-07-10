import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import vuetify from './plugins/vuetify'
import { messages } from './i18n/entry'
import { createI18n } from 'vue-i18n'
import { defaultLocale } from '@/i18n/config/index'
import { useAuthStore } from '@/stores'

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate)).use(router).use(vuetify)
// app.use(router).use(vuetify)

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  messages,
  locale: defaultLocale === 'en' ? 'en-US' : defaultLocale,
  fallbackLocale: defaultLocale === 'en' ? 'en-US' : defaultLocale
})

app.use(i18n).mount('#app')
