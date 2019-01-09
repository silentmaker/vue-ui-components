import Vue from 'vue';
import demo from './demo.vue';

import './themes/swan/index.less';

Vue.config.productionTip = false;

new Vue({
  render: h => h(demo),
}).$mount('#app');
