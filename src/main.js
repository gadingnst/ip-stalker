import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'hack/dist/hack.css'
import 'hack/dist/dark.css'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store,
  render: create => create(App)
}).$mount('#app')
