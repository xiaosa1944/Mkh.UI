const fs = require('fs')
const path = require('path')
import { createFilter } from '@rollup/pluginutils'

export default function () {
  //模块的入口文件都命名为mod.js
  const filter = createFilter('**/mod.js')

  //加载页面
  const loadPage = (dir, relativeDir, pages) => {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const subDir = path.join(dir, file)
      const subRelativeDir = `${relativeDir}/${file}`
      var stat = fs.statSync(subDir)
      if (stat.isDirectory()) {
        loadPage(subDir, subRelativeDir, pages)
      } else if (file === 'page.js') {
        pages.push(subRelativeDir)
      }
    })
  }

  return {
    name: 'mkh-page-load',
    transform(code, id) {
      if (!filter(id)) return
      const viewsPath = path.join(id.replace('mod.js', ''), 'views')
      if (fs.existsSync(viewsPath)) {
        const pages = []
        //加载页面路径
        loadPage(viewsPath, './views', pages)

        if (pages.length > 0) {
          let importPageCode = ''
          let pageArrayCode = ''
          pages.forEach((p, i) => {
            //生成导入页面的代码
            importPageCode += `import page_${i} from '${p}'\n`
            pageArrayCode += `page_${i},`
          })
          pageArrayCode = pageArrayCode.substring(0, pageArrayCode.length - 1)
          code = importPageCode += code
          code = code.replace('MkhUI.useModule(mod)', `mod.pages = [${pageArrayCode}]\nMkhUI.useModule(mod)`)
        }
      }

      return {
        code,
      }
    },
  }
}
