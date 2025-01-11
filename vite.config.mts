import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: path.resolve(__dirname, './vite_env'),
  plugins: [vue(), vuetify()],
  optimizeDeps: {
    exclude: ['vuetify'] // To prevent reloading
  },
  build: {
    target: 'esnext'
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.vue'], // 省略副檔名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
