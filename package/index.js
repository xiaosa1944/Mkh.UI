import './MkhUI'
import { createApp } from 'vue'
import Layout from './layout.vue'
import MkhRouter, { router } from './router'
import MkhStore, { store } from './store'
//导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import Components from './components'
import './styles/app.scss'
//导入皮肤
import './skins/brief'
import './skins/youthful'

/**
 * @description 启动
 */
const start = async () => {
  const app = createApp(Layout)

  //模块按照Id排序
  MkhUI.modules = MkhUI.modules.sort((a, b) => a.id - b.id)

  //注册路由
  app.use(MkhRouter, MkhUI.modules)

  //注册状态
  app.use(MkhStore, MkhUI.modules)

  //注册ElementPlus
  app.use(ElementPlus, { locale })

  //注册全局组件
  app.use(Components)

  //注册皮肤
  MkhUI.skins.forEach(skin => {
    // 注册组件
    app.component('mu-skin-' + skin.code.toLowerCase(), skin.component)

    // 注册状态
    if (skin.store) {
      store.registerModule(['app', 'skin', skin.code], skin.store)
    }
  })

  //加载模块
  MkhUI.modules.forEach(m => {
    //注册全局组件
    if (m.components) {
      m.components.forEach(c => {
        app.component(`mu-${m.code}-${c.name}`, c.component)
      })
    }

    //执行回调函数
    if (m.callback) {
      m.callback({ app, router, store })
    }
  })

  //从本地存储中加载令牌
  store.commit('app/token/loadFromlocalStorage')
  //加载账户信息
  await store.dispatch('app/account/init')

  app.mount('#app')
}

window.onload = () => {
  //加个延迟，防止预加载页面一闪而过
  setTimeout(start, 1000)
}
