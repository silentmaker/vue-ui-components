<template>
    <span class="pointer" @click="toggle" v-if="typeof order === 'string' && sort">
        <span class="mr-s">{{ label }}</span>
        <span :class="['sort-icon', order]"></span>
    </span>
    <span v-else>{{ label }}</span>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
        },
        order: {
            type: String,
        },
        sort: {
            type: Function,
        },
    },
    methods: {
        toggle() {
            const order = this.order !== '' ? (this.order === 'desc' ? 'asc' : 'desc') : 'desc';
            this.$emit('sorted', order);
            this.sort();
        },
    },
}
</script>

<style lang="less" scoped>
.sort-icon {
    position: relative;

    &::before,
    &::after {
        position: absolute;
        left: 0;
        content: "";
        width: 0;
        height: 0;
    }
    &::before {
        top: -1px;
        border: 4px solid transparent;
        border-bottom-color: #9fb0c3;
    }
    &::after {
        top: 9px;
        border: 4px solid transparent;
        border-top-color: #9fb0c3;
    }
    &.asc::before {
        border-bottom-color: #6b829f;
    }
    &.desc::after {
        border-top-color: #6b829f;
    }
}
</style>
