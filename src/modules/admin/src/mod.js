import pkg from '../package.json'
import api from './api'
import store from './store'
import { pages, components } from '@mkh-module'

let mod = MkhUI.createModule(pkg)
mod.api = api
mod.store = store
mod.pages = pages
mod.components = components

MkhUI.useModule(mod)

//配置登录组件
MkhUI.config.component.login = 'k'
//设置登录方法
MkhUI.config.actions.login = api.login
//设置获取验证码方法
MkhUI.config.actions.getVerifyCode = api.getVerifyCode
//设置获取账户信息方法
MkhUI.config.actions.getAccountInfo = api.getAccountInfo
