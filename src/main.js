import { configure } from '../package/index.js'
import locale from './locale'
import './mod.js'

MkhUI.config.site.logo = './logo.png'
MkhUI.config.site.title = '业务模块化快速开发平台'

configure({ locale })
