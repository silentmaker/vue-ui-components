<template>
    <label
        class="checkbox"
        :class="{ disabled: disabled }"
        @click="toggle">
        <span :class="['bg-sprites', 'check-icon', enabled ? 'checked' : '']"></span>
        <span class="label-content"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'checkbox',
        props: {
            checked: {
                type: Boolean,
                default: false,
            },
            value: {
                type: String,
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            functional: {
                type: Boolean,
                default: false,
            },
        },
        model: {
            prop: 'checked',
            event: 'change',
        },
        data () {
            return {
                enabled: false,
            };
        },
        mounted () {
            this.enabled = this.checked;
            this.$on('init', this.init);
        },
        watch: {
            checked (val) {
                this.enabled = val;
            },
        },
        methods: {
            init (items) {
                if (this.value) {
                    this.enabled = items.indexOf(this.value) !== -1;
                    this.$emit('change', this.enabled);
                }
            },
            toggle () {
                if (this.functional) {
                    this.$emit('change');
                } else if (!this.disabled) {
                    this.enabled = !this.enabled;
                    this.$emit('change', this.enabled);
                    if (this.value) this.$parent.$emit('check', this.value);
                }
            },
        },
    };
</script>

<style lang="less" scoped>
.checkbox {
    display: inline-block;
    vertical-align: middle;
    margin: 0 20px 0 0;
    cursor: pointer;
    
    .check-icon {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-position: 0 -2007px;
        margin: 0 2px 0 0;
        background-color: #fff;

        &.checked {
            background-position: -71px -2007px;
        }
    }
    .label-content {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #666;
    }
    &.disabled {
        opacity: .85;
        cursor: not-allowed;
    }
}
</style>
