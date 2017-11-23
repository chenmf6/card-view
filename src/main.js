import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   render: h => h(App)
// }).$mount('#app-box')
new Vue({
  el: '#app-box',
  template: '<App/>',
  components: { App }
})
