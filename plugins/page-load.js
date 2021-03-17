const fs = require('fs')
const path = require('path')

import { createFilter } from '@rollup/pluginutils'
export default function () {
  const filter = createFilter('**/routes/index.js')
  const pages = []
  //加载页面
  const loadPage = dir => {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const subDir = path.join(dir, file)
      var stat = fs.statSync(subDir)
      if (stat.isDirectory()) {
        loadPage(subDir)
      } else if (file === 'page.js') {
        pages.push(subDir)
      }
    })
  }

  return {
    name: 'mkh-page-load',
    transform(code, id) {
      if (!filter(id)) return
      console.log('\n')

      const viewsPath = path.join(id.replace('routes/index.js', ''), 'views')
      loadPage(viewsPath)

      console.log(pages)

      return {
        code,
      }
    },
  }
}
