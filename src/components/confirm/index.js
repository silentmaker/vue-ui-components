/* eslint-disable */
import confirm from './confirm.vue';

export default {
  install(Vue) {
    const CACHE = {};
    const CONSTRUTOR = Vue.extend(confirm);

    Vue.prototype.$confirm = (message, customOptions) => {
      const options = Object.assign({}, confirm.DEFAULT, customOptions);
      const instance = CACHE[options.id] || (CACHE[options.id] = new CONSTRUTOR);

      if (!instance.$el) {
        const vm = instance.$mount();
        document.querySelector('body').appendChild(vm.$el);
      }
      instance.options = options;
      instance.message = message;
      instance.isShow = true;
    };
  },
};
