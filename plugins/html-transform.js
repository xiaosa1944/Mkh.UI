import ejs from 'ejs'
import { minify } from 'html-minifier-terser'

//html渲染，基于 https://ejs.bootcss.com/
const htmlRender = function (options) {
  return {
    name: 'html-render',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return ejs.render(html, options)
      },
    },
  }
}

//html压缩，基于 https://github.com/terser/html-minifier-terser
const htmlMinify = function (options) {
  return {
    name: 'html-minify',
    transformIndexHtml: {
      enforce: 'post',
      transform(html) {
        const defaultMinifyOptions = {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
        }

        return minify(html, Object.assign({}, defaultMinifyOptions, options || {}))
      },
    },
  }
}

/** index.html处理 */
export default function (options) {
  return [htmlRender(options.render), htmlMinify(options.minify)]
}
