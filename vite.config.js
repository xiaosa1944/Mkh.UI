const { resolve } = require('path')
const { copyFileSync } = require('fs')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import handlebars from 'vite-plugin-handlebars'
import loadModule from './plugins/load-module'
import loadCode from './plugins/load-code'

//复制入口文件index.html，用户可通过这种方式来使用自己的index.html
copyFileSync('./entries/index.html', './index.html')

export default defineConfig({
  plugins: [
    loadModule(),
    loadCode(),
    vue(),
    //index.html文件处理插件(https://github.com/alexlafroscia/vite-plugin-handlebars)
    handlebars({
      context: {
        /** 版权信息 */
        copyright: '版权所有：OLDLI',
        /** Logo */
        logo: './images/logo.png',
      },
    }),
  ],
  server: {
    port: 6220,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index1111.html'),
    },
  },
})
