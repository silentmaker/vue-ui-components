<template>
    <modal size="normal" :footerType="options.cancelable ? 'all' : 'confirm'"
        @close="abort" @submit="success" v-if="isShow">
        <template slot="title">{{ options.title }}</template>
        <template slot="body">
            <div class="confirm-container">
                <div class="confirm-icon bg-sprites"></div>
                <div class="confirm-content" v-html="message"></div>
            </div>
        </template>
    </modal>
</template>

<script>
import modal from '../modal/main.vue';

export default {
    name: 'confirm',
    DEFAULT: {
        id: 'default-confirm',
        title: '确认',
        cancelable: true,
        success: () => {},
        abort: () => {},
    },
    components: { modal },
    data() {
        return {
            isShow: false,
            message: '',
            options: {},
        };
    },
    methods: {
        abort() {
            this.isShow = false;
            typeof this.options.abort === 'function' && this.options.abort();
        },
        success() {
            this.isShow = false;
            typeof this.options.success === 'function' && this.options.success();
        },
    },
}
</script>

<style lang="less" scoped>
.confirm-container {
    min-height: 60px;

    .confirm-icon {
        width: 45px;
        height: 45px;
        float: left;
        background-position: 0 -254px;
    }
    .confirm-content {
        margin-left: 60px;
        padding-top: 10px;
        line-height: 24px;
    }
}
</style>
