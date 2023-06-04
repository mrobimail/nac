import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import hu from 'vuetify/es5/locale/hu';
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import * as veeRules from 'vee-validate/dist/rules';
import veeLocaleHU from 'vee-validate/dist/locale/hu.json';

Object.keys(veeRules).forEach((k) => extend(k, veeRules[k]));
localize('hu', veeLocaleHU);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(Vuetify);

const opts = {
  lang: {
    locales: { hu },
    current: 'hu',
  },
};

export default new Vuetify(opts);
