import tabset from './main.vue';

tabset.install = (Vue) => {
    Vue.component(tabset.name, tabset);
};

export default tabset;
