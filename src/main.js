import Vue from 'vue';
import app from './app.vue';
import { toast } from './ui';

Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  render: h => h(app),
}).$mount('#app');
