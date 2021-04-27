import { createI18n } from 'vue-i18n'

let i18n

export default (app, options) => {
  const messages = {}
  Object.keys(options.messages).forEach(key => {
    const { el, mkh, mod } = options.messages[key]

    //将语言集保存下载
    MkhUI.locales.push({
      label: mkh.name,
      value: key,
    })

    messages[key] = { el, mkh: mkh.messages, mod }
  })

  i18n = createI18n({
    locale: options.default || 'zh-cn',
    fallbackLocale: options.fallback || 'zh-cn',
    messages,
  })

  //注册国际化
  app.use(i18n)
}

export { i18n }
