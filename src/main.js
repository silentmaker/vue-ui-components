import axios from 'axios';
import Vue from 'vue';

import app from './app.vue';

import './themes/swan/index.less';

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  render: h => h(app),
}).$mount('#app');
