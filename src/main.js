// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Using ElementUI ui framework in vue
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

// Using iView ui framework in vue
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// Vue.use(ElementUI)
Vue.use(ElementUI, {locale})
Vue.use(iView)

// Using vuex for state-management
import Vuex from 'vuex'
Vue.use(Vuex)

// Demo for filter usage
Vue.filter('santizeAnnotationContent', value => {
  try {
    var x = JSON.parse(value)
    return x.blocks.map((i) => i.text).join('\n')
  } catch (e) {
    return value
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  data: new Vue(),
  template: '<App/>',
  components: { App }
})

export default app
