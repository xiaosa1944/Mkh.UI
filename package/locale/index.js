import { createI18n } from 'vue-i18n'

let i18n

export default (app, options) => {
  i18n = createI18n({
    locale: options.default || 'zh-cn',
    fallbackLocale: options.fallback || 'zh-cn',
    messages: options.messages,
  })

  //注册国际化
  app.use(i18n)
}

export { i18n }
