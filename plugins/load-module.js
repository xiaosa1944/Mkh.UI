const fs = require('fs')
const path = require('path')
import { normalizePath } from 'vite'

export default function (modules) {
  const prefix = '@mkh-module-'

  //加载路由页面信息
  const loadPages = (dir, pages) => {
    if (fs.existsSync(dir)) {
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
        let src = '' //导入代码
        let exportCode = '' //导出代码
        const code = id.replace(prefix, '')
        const dir = modules[code]

        /** 加载package.json */
        const packageFile = normalizePath(path.resolve(dir, '../package.json'))
        const hasPackageFile = fs.existsSync(packageFile)
        if (hasPackageFile) {
          src += `import { id, version, description } from '${packageFile}'\r\n`
          exportCode += `id:id || 0, code:'${code}', version, description`
        }

        /** 加载接口服务api */
        const apiDir = normalizePath(path.resolve(dir, 'api/index.js'))
        if (fs.existsSync(apiDir)) {
          src += `import api from '${apiDir}'\r\n`
          exportCode += ',api'
        }

        /** 加载状态 */
        const storeDir = normalizePath(path.resolve(dir, 'store/index.js'))
        if (fs.existsSync(storeDir)) {
          src += `import store from '${storeDir}'\r\n`
          exportCode += ',store'
        }

        /** 加载模块路由页面 */
        const pages = []
        const pagesDir = normalizePath(path.resolve(dir, 'views'))
        loadPages(pagesDir, pages)
        pages.forEach((p, i) => {
          const name = `page_${i}`
          src += `import ${name} from '${p}'\r\n`
        })

        /** 加载模块全局组件 */
        const components = []
        const componentsDir = normalizePath(path.resolve(dir, 'components'))
        loadComponents(componentsDir, components)
        components.forEach((c, i) => {
          const name = `component_${i}`
          src += `import ${name} from '${c.path}'\r\n`
        })

        src += 'const pages = []\r\n'
        src += 'const components = []\r\n'
        pages.forEach((p, i) => {
          const name = `page_${i}`
          src += `pages.push(${name})\r\n`
        })
        components.forEach((c, i) => {
          const name = `component_${i}`
          src += `components.push({name:\'${c.name}\',component:${name}})\r\n`
        })

        src += `const mod = {${exportCode}, pages, components }\r\n`
        //注册模块
        src += 'MkhUI.useModule(mod);\r\n'
        //导出模块
        src += 'export default mod'
        return src
      }

      return null
    },
  }
}
