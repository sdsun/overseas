// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import FastClick from 'fastclick'
FastClick.attach(document.body)
// import Element from 'element-ui'
// import './element-variables.scss'
import i18n from './languages'
import './plugins/vant'
import './router/routerGuard'
import './filters'
import Mixin from './mixins'
Vue.mixin(Mixin)

Vue.config.productionTip = false
// Vue.use(Element)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
