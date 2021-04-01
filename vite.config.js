import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import loadModule from './plugins/load-module'
import loadCode from './plugins/load-code'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [loadModule(), loadCode(), vue()],
  server: {
    port: 6220,
  },
})
