import Vue from 'vue';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
