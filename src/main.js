// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/public/font_icon/iconfont.css'
import '@/assets/styles/normalize.css'
import '@/assets/styles/main.css'
import store from './store'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);
                                                                                                                      
Vue.config.productionTip = false                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
Vue.use(ElementUI)
                             
const noCheckPath = ['/404']

router.beforeEach((to, from, next) => {
  if (noCheckPath.indexOf(to.path) !== -1) {
    next()
  } else {
    store.dispatch('auth')
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
