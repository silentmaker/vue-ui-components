import category from './main.vue';

category.install = (Vue) => {
    Vue.component(category.name, category);
};

export default category;
