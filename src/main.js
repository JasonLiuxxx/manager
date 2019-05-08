import Vue from 'vue'
import App from './App.vue'

//饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios
import request from './lib/http'
Vue.use(request)

Vue.config.productionTip = false

import router from './router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
