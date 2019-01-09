<template>
    <label><slot></slot></label>
</template>

<script>
    export default {
        name: 'radio-group',
        props: {
            value: {
                type: String,
                default: '',
            },
        },
        watch: {
            // 监听绑定参数，可增加互斥逻辑
            value (val) {
                this.update(val);
            },
        },
        methods: {
            update (label) {
                this.$children.forEach((child) => {
                    this.$emit('input', label);
                    child.isChecked = child.label === label;
                });
            },
        },
        mounted () {
            // 初始化传入参数
            this.update(this.value);
        },
    };
</script>
