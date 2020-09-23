import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'

import enLocale from './en'//英文
import jaLocale from './ja'//日文
Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
  },
  ja: {
    ...jaLocale,
  }
}
const i18n = new VueI18n({
  locale: localStorage.lang || 'en',
  messages,
  silentTranslationWarn: true,
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
