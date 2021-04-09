const { copyFileSync } = require('fs')
const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import loadModule from './plugins/load-module'
import loadCode from './plugins/load-code'
import htmlTransform from './plugins/html-transform'

//复制入口文件index.html，用户可通过这种方式来使用自己的index.html
copyFileSync('./entries/index.html', './index.html')

export default defineConfig({
  plugins: [
    htmlTransform({
      render: {
        /** 版权信息 */
        copyright: '版权所有：OLDLI',
        /** Logo */
        logo: './images/logo.png',
      },
    }),
    loadModule(),
    loadCode(),
    vue(),
  ],
  server: {
    port: 6220,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'package'),
    },
  },
})
