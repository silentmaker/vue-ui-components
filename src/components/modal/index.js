import modal from './main.vue';

modal.install = (Vue) => {
  Vue.component(modal.name, modal);
};

export default modal;
