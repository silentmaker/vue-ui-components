<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div 
                    :class="[
                        'modal-container', 
                        size,
                    ]"
                    :style="{ width: `${width}px` }"
                >
                    <div
                        class="modal-header"
                        :style="{
                            backgroundColor,
                        }">
                        <slot name="header">
                            <div class="icon-close-modal bg-sprites"
                                @click="$emit('close')">
                            </div>
                            <div
                                class="modal-title"
                                :style="{
                                    color,
                                }">
                                <slot name="title">确认</slot>
                            </div>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button
                                type="button"
                                class="btn btn-primary btn-lg"
                                :disabled='confirmDisabled'
                                @click="$emit('submit')"
                                v-if="footerType === 'all' || footerType === 'confirm'">
                                <slot name="confirm">确定</slot>
                            </button>
                            <button
                                type="button"
                                class="btn btn-default btn-lg"
                                @click="$emit('close')"
                                v-if="footerType === 'all' || footerType === 'close'">
                                <slot name="cancel">取消</slot>                                
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'km-modal',
        props: {
            id: {
                type: String,
                default: `lx-model-${Date.now()}`,
            },
            size: {
                type: String,
                default: 'large',
            },
            width: {
                type: Number,
            },
            footerType: {
                type: String,
                default: 'all',
            },
            backgroundColor: { // header背景颜色
                type: String,
                default: '#fff',
            },
            color: { // header字体颜色
                type: String,
                default: '#444',
            },
            confirmDisabled: { // 上传等禁用确认
                type: Boolean,
                default: false,
            },
        },
    };
</script>

<style lang="less" scoped>
.modal-mask {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    overflow-x: hidden;
    overflow-y: scroll;

    .modal-wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%) translateY(120px);

        .modal-container {
            width: 600px;
            max-height: 100%;
            margin: 0px auto;
            padding: 0;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, .4);
            transition: all .3s ease;

            &.large {
                width: 900px;
            }
            &.normal {
                width: 640px;
            }
            &.medium  {
                width: 466px;
            }
            &.small {
                width: 300px;
            }
            .modal-header {
                padding: 20px;

                .icon-close-modal {
                    float: right;
                    width: 16px;
                    height: 16px;
                    background-position: -28px -153px;
                    margin-top: 4px;
                    cursor: pointer;

                    &:hover {
                        background-position: -53px -153px;
                    }
                }
                .modal-title {
                    font-size: 16px;
                }
            }
            .modal-body {
                margin: 0 0 20px 0;
                padding: 0 20px 0 20px;
            }
        }
    }
}

// transition style
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: translateY(-30px);
}
</style>
