import Vue from 'vue';
import demo from './demo.vue';
import { toast } from './ui';

Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  render: h => h(demo),
}).$mount('#app');
