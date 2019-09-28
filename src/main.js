import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueLazyload from 'vue-lazyload'

Vue.use(iView)
Vue.use(VueLazyload, {
    loading: require('@/assets/loading.gif')
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
