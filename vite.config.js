import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import loadPage from './plugins/load-page'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [loadPage(), vue()],
  server: {
    port: 6220,
  },
})
