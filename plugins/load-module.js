const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'

export default function (modules) {
  const prefix = '@mkh-module-'

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
      if (id.startsWith(prefix)) {
        const code = id.replace(prefix, '')
        if (importer.indexOf('index.html') > 0) {
          modules[code] = path.resolve(path.dirname(normalizePath(importer)), 'src')
        } else {
          modules[code] = path.dirname(normalizePath(importer))
        }
        return id
      }

      return null
    },
    load(id) {
      if (id.startsWith(prefix)) {
        let src = ''
        const code = id.replace(prefix, '')
        const dir = modules[code]

        /** 加载接口服务api */
        const apiDir = path.resolve(dir, 'api/index.js')
        if (fs.existsSync(apiDir)) {
          src += `import api from '${normalizePath(apiDir)}'\r\n`
        }

        /** 加载状态 */
        const storeDir = path.resolve(dir, 'store/index.js')
        if (fs.existsSync(storeDir)) {
          src += `import store from '${normalizePath(storeDir)}'\r\n`
        }

        /** 加载模块路由页面 */
        const pages = []
        loadPages(path.resolve(dir, 'views'), pages)
        src += 'const pages = []\r\n'
        pages.forEach((p, i) => {
          const name = `page_${i}`
          src += `import ${name} from '${p}'\r\n`
          src += `pages.push(${name})\r\n`
        })

        /** 加载模块全局组件 */
        const components = []
        loadComponents(path.resolve(dir, 'components'), components)
        src += 'const components = []\r\n'
        components.forEach((c, i) => {
          const name = `component_${i}`
          src += `import ${name} from '${c.path}'\r\n`
          src += `components.push({name:\'${c.name}\',component:${name}})\r\n`
        })

        src += `export default { api, store, pages, components }`
        return src
      }

      return null
    },
  }
}
