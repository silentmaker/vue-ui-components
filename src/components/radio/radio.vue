<template>
    <label
        class="radio"
        :class="{ disabled }"
        @click="check">
        <span
            class="bg-sprites icon-radio"
            :class="[
                isChecked ? 'checked' : 'unchecked',
                { disabled },
            ]">
        </span>
        <span class="label-content"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'radio',
        props: {
            label: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                isChecked: false,
            };
        },
        methods: {
            check () {
                if (!this.disabled) {
                    this.$parent.update(this.label);
                }
            },
        },
    };
</script>

<style lang="less" scoped>
    .radio {
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px 0 0;
        cursor: pointer;

        .icon-radio {
            display: inline-block;
            vertical-align: middle;
            width: 18px;
            height: 18px;
            background-position: -142px -2007px;
            margin: 0 2px 0 0;
            background-color: #fff;
        }
        .disabled {
            background-position: -106px -2007px !important;
        }
        .unchecked {
            background-position: -106px -2007px;
        }
        .checked {
            background-position: -178px -2007px;
        }
        &.disabled {
            opacity: .85;
        }
    }
</style>
