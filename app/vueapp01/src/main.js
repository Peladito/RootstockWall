// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Web3 from 'web3'
Vue.config.productionTip = false
Vue.use(BootstrapVue);
/* eslint-disable no-new */
var web3 = new Web3(Web3.givenProvider);
Vue.mixin({
  data: function() {
    return {
      get web3() {

        return web3;
      }
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
