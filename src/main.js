import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//浏览器兼容性， 主要兼容ie浏览器
import '@babel/polyfill'

// mock
import './mock'

import './core/use'
import './permission'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
