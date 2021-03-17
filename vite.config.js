import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pageLoad from './plugins/page-load'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [pageLoad(), vue()],
})
