/** 导入模块，自动加载模块中的页面pages和全局组件components */
import mod from '@mkh-module-doc'
import VCharts from 'vue-echarts'
import * as echarts from 'echarts'

/** 对于生产代码，模块的编号、编码、版本号、描述说明信息应该从模块的package.json文件中读取 */
mod.id = 0
mod.code = 'doc'
mod.version = '0.0.2'
mod.description = '17MKH文档模块'

/** 模块注册回调函数，当vue根实例挂载前调用 */
mod.callback = ({ app }) => {
  /* 注册vue-echarts组件 */
  /* 说明文档 https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md */
  app.component('VChart', VCharts)

  //绑定到全局变量
  app.config.globalProperties.$echarts = echarts
}

/** 注册模块 */
MkhUI.useModule(mod)

/** 配置登录组件 */
MkhUI.config.component.login = 'k'
/** 设置登录方法 */
MkhUI.config.actions.login = mod.api.login
/** 设置获取验证码方法 */
MkhUI.config.actions.getVerifyCode = mod.api.getVerifyCode
/** 设置获取账户信息方法 */
MkhUI.config.actions.getAccountInfo = mod.api.getAccountInfo
