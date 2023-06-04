import Vue from 'vue';
import VueSession from 'vue-session';
import Vuetify from './vuetify';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueSession);

new Vue({
  Vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
