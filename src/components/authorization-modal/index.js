import authorizationModal from './main.vue';

authorizationModal.install = (Vue) => {
    Vue.component(authorizationModal.name, authorizationModal);
};

export default authorizationModal;
