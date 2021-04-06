import pkg from '../package.json'
import { pages, components } from '@mkh-module'
import './styles/index.scss'
import VCharts from 'vue-echarts'
import * as echarts from 'echarts'

let mod = MkhUI.createModule(pkg)
mod.pages = pages
mod.components = components

mod.callback = ({ app }) => {
  /* 注册vue-echarts组件 */
  /* 说明文档 https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md */
  app.component('VChart', VCharts)

  //绑定到全局变量
  app.config.globalProperties.$echarts = echarts
}

MkhUI.useModule(mod)
