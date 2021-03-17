import MkhUI from '../package/index'
import Admin from './modules/admin/index'
import Blog from './modules/blog/index'

//使用模块
MkhUI.useModule(Admin)
MkhUI.useModule(Blog)

MkhUI.start()
