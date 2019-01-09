/* eslint-disable */
import toast from './toast.vue';

export default {
  install(Vue) {
    const CACHE = {};
    const CONSTRUTOR = Vue.extend(toast);

    Vue.prototype.$toast = (message, customOptions) => {
      const options = Object.assign({}, toast.DEFAULT, customOptions);
      const instance = CACHE[options.id] || (CACHE[options.id] = new CONSTRUTOR);

      if (!instance.$el) {
        const vm = instance.$mount();
        document.querySelector('body').appendChild(vm.$el);
      }
      instance.queue.push({ options, message });
    };
  },
};
