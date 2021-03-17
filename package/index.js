import pkg from '../package.json'
import { createApp } from 'vue'
import router from './router'
import Layout from './layout.vue'

let MkhUI = {
  /**版本号 */
  version: pkg.version,
  /**模块列表 */
  modules: [],
}

/**
 * @description 安装模块
 */
MkhUI.useModule = module => {
  MkhUI.modules.push(module)
}

/**
 * @description 启动
 */
MkhUI.start = () => {
  console.log(MkhUI.modules)
  const app = createApp(Layout)

  //使用路由
  app.use(router)

  app.mount('#app')
}

/**
 * 从package.json中创建模块
 * @param {Object} pkg 模块包信息
 */
const creatModule = pkg => {
  return {
    id: pkg.id,
    code: pkg.name.replace('@mkh/mod-', ''),
    description: pkg.description,
  }
}

export default MkhUI

export { creatModule }
