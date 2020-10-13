import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-search-select/dist/VueSearchSelect.css'
import Toasted from 'vue-toasted'
import VueSocketIO from 'vue-socket.io'
require("dotenv").config();

Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_API_SOCKETS,
}));


Vue.config.productionTip = false
Vue.use(Toasted, {
  iconPack: 'fontawesome'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
