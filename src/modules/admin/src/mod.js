import pkg from '../package.json'
import store from './store'
import api from './api'

let mod = MkhUI.createModule(pkg)
mod.store = store
mod.api = api

MkhUI.useModule(mod)

//设置登录方法
MkhUI.config.actions.login = api.login
//设置获取验证码方法
MkhUI.config.actions.getVerifyCode = api.getVerifyCode
//设置获取账户信息方法
MkhUI.config.actions.getAccountInfo = api.getAccountInfo
