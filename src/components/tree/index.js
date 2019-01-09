import tree from './main.vue';

tree.install = (Vue) => {
    Vue.component(tree.name, tree);
};

export default tree;
