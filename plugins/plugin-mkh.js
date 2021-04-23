import htmlTransform from './html-transform'
import loadModule from './load-module'
import loadLocale from './load-locale'

export default function (options) {
  //模块列表
  const modules = []
  return [htmlTransform(options.htmlTransform), loadModule(modules), loadLocale(modules)]
}
