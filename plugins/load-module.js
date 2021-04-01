const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'

export default function () {
  //模块列表
  let modules = {}

  //加载路由页面信息
  const loadPages = (dir, pages) => {
    const files = fs.readdirSync(dir)

    files.forEach(file => {
      const subDir = path.join(dir, file)
      var stat = fs.statSync(subDir)
      if (stat.isDirectory()) {
        loadPages(subDir, pages)
      } else if (file === 'page.js') {
        pages.push(normalizePath(subDir))
      }
    })
  }

  //加载模块全局组件信息
  const loadComponents = (dir, components) => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const subDir = path.join(dir, file)
        var stat = fs.statSync(subDir)
        if (stat.isDirectory()) {
          var componentPath = path.resolve(subDir, 'index.vue')
          if (fs.existsSync(componentPath)) {
            components.push({ name: file, path: normalizePath(componentPath) })
          }
        }
      })
    }
  }

  return {
    name: 'mkh-load-module',
    resolveId(id, importer) {
      //匹配@mkh-module并从package.json文件中获取模块编码，然后附加到id后面
      if (id === '@mkh-module') {
        const pkg = JSON.parse(fs.readFileSync(path.resolve(path.dirname(importer), '../package.json'), 'utf8'))
        const code = pkg.name.replace('@mkh/mod-', '')
        modules[code] = path.dirname(importer)
        return id + '-' + code
      }

      return null
    },
    load(id) {
      if (id.startsWith('@mkh-module')) {
        let src = 'const pages = []\r\nconst components = []\r\n'
        const code = id.replace('@mkh-module-', '')
        const dir = modules[code]

        /** 加载模块路由页面 */
        const pages = []
        loadPages(path.resolve(dir, 'views'), pages)
        pages.forEach((p, i) => {
          const name = `page_${i}`
          src += `import ${name} from '${p}'\r\n`
          src += `pages.push(${name})\r\n`
        })

        /** 加载模块全局组件 */
        const components = []
        loadComponents(path.resolve(dir, 'components'), components)
        components.forEach((c, i) => {
          const name = `component_${i}`
          src += `import ${name} from '${c.path}'\r\n`
          src += `components.push({name:\'${c.name}\',component:${name}})\r\n`
        })
        src += `export {pages,components}`
        return src
      }

      return null
    },
  }
}
