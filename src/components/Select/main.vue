<style lang="less" scoped>
    .selector-container {
        position: relative;
        display: inline-block;

        &:focus {
            outline: none;
        }

        .selector {
            min-width: 60px;
            padding: 9px 25px 9px 12px;
            cursor: default;

            .selector-button {
                display: inline-block;
                vertical-align: middle;
                max-width: 165px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

                .prefix {
                    display: inline-block;
                    width: 35px;
                    color: #c0c2cb;
                }
                .placeholder {
                    color: #c0c2cb;
                }
                .caret {
                    position: absolute;
                    top: 18px;
                    right: 12px;
                }
                .caret-up {
                    border-top: 0px;
                    border-bottom: 4px dashed;
                    border-right: 4px solid transparent;
                    border-left: 4px solid transparent;
                }
            }

            .selector-ul-up {
                bottom: 11px;
            }
            .selector-ul-down {
                top: 40px;
            }

            &.disabled {
                cursor:not-allowed;
            }
        }

        .selector-ul {
            font-size: 14px;
            max-height: 248px;
            background-color: white;
            position: absolute;
            left: -1px;
            margin-bottom: 30px;
            box-shadow: 0 0 10px rgba(33, 33, 33, 0.15);
            overflow-y: auto;
            z-index: 5;

            .selector-li {
                position: relative;
                line-height: 40px;
                padding: 0 10px;
                border-top: 1px solid #fff;

                .icon-triangle-right {
                    position: absolute;
                    top: 12px;
                    right: 9px;
                }

                &:hover {
                    background-color: #f4f7fa;
                    border-color: #f4f7fa;
                }

            }
        }
    }
</style>

<template>
    <div class="selector-container"
         :tabindex="disabled ? '' : -1"
         @click="showMenu"
         @blur="closeMenu">
        <div
            class="selector form-control"
            :class="{ 'disabled': disabled }"
            :style="{ width: `${width}px` }">
            <div class="selector-button">
                <span class="placeholder" v-if="placeholder && !selectItem.value">{{ placeholder }}</span>
                <span v-else>
                    <span class="prefix" v-if="prefix">{{ prefix }}</span>
                    {{ selectItem.label }}
                </span>
                <span
                    class="caret"
                    :class="{ 'caret-up': direction === 'up'}">
                </span>
            </div>
        </div>
        <ul
            v-show="isMenuShow"
            class="selector-ul"
            :class="direction === 'up' ? 'selector-ul-up' : 'selector-ul-down'"
            :style="{ width: `${width}px` }">
            <li
                class="selector-li"
                v-for="(option, index) in options"
                :key="index"
                @click="selectOption(option)">
                <label
                    :style="{ 'margin-left': prefix ? '45px' : '0px' }"
                    :title="option.label">
                    {{ option.label }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    /**
     * 选择器
     */

    export default {
        name: 'selector',
        props: {
            value: { // 绑定值，暂不限制类型
                default: '',
            },
            width: {
                type: Number,
                default: 113,
            },
            disabled: { // 是否禁用
                type: Boolean,
                default: false,
            },
            direction: { // 延伸方向up&down,默认为down
                type: String,
                default: 'down',
            },
            placeholder: {
                type: String,
                default: '',
            },
            restrict: { // 不提供空选项，否则以placeholder提供空选项
                type: Boolean,
                default: true,
            },
            prefix: {
                type: String,
                default: '',
            },
        },
        data: () => ({
            isMenuShow: false,
            selectItem: { // 递归组件选中项绑定值
                label: '',
                value: '',
            },
            options: [],
        }),
        watch: {
            value () {
                // 对于绑定值会发生变化的情况进行适配
                this.getOption(this.options);
            },
            options (val) {
                // 选项可能是异步拉取，需要监听options
                this.getOption(val);
            },
        },
        methods: {
            init () { // TODO: 监听选项异步变化
                this.options = this.$slots.default
                    .filter(vnode => vnode.componentOptions)
                    .map(vnode => vnode.componentOptions.propsData);
                if (!this.restrict) {
                    this.options.unshift({
                        label: this.placeholder,
                        value: '',
                    });
                }
            },
            showMenu () {
                this.isMenuShow = !this.isMenuShow && !this.disabled;
            },
            closeMenu () {
                this.isMenuShow = false;
            },
            getOption () {
                // 如果父组件传来已有选项， 则显示
                this.options.forEach((option) => {
                    if (option.value === this.value) {
                        this.selectOption(option);
                    }
                });
            },
            selectOption (option) {
                if (option.value !== this.selectItem.value) {
                    this.$emit('input', option.value);
                }
                this.selectItem.label = option.label;
                this.selectItem.value = option.value;
            },
        },
        mounted () {
            this.init();
        },
    };

</script>
