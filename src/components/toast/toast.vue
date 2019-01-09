<template>
  <transition :name="options.transition">
    <div :class="['toast-container', 'single-line', `${options.status}`]"
      v-if="message">
      <component size="md" :is="icons[options.status]"></component>
      <span class="ml-s">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import iconInfo from 'img/svg-icons/common/info.svg';
import iconWarning from 'img/svg-icons/common/warning.svg';
import iconError from 'img/svg-icons/common/error.svg';
import iconSuccess from 'img/svg-icons/common/success.svg';

export default {
  components: {
    iconInfo,
    iconWarning,
    iconError,
    iconSuccess,
  },
  DEFAULT: {
    id: 'default-toast',
    status: 'success',
    duration: 2.5,
    transition: 'fade',
  },
  data() {
    return {
      message: '',
      options: {},
      queue: [],
      timer: null,
      icons: {
        info: iconInfo,
        warning: iconWarning,
        error: iconError,
        success: iconSuccess,
      },
    };
  },
  watch: {
    queue(tasks) {
      if (tasks.length >= 1) {
        this.message = tasks[0].message;
        this.options = tasks[0].options;
        this.timer = setTimeout(() => {
          this.message = '';
          this.options = {};
        }, this.options.duration * 1000);
        this.queue = [];
      }
    },
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less" scoped>
.toast-container {
  position: fixed;
  max-width: 560px;
  left: 50%;
  top: 40%;
  padding: 12px 20px;
  text-align: center;
  font-size: 15px;
  line-height: 24px;
  border-radius: 2px;
  transform: translateX(-50%);
  z-index: 999;

  &.success {
    background-color: #ddf5dc;
    color: #09bb07;
  }
  &.warning,
  &.error {
    background-color: #ffebe5;
    color: #fc3b00;
  }
  &.info {
    background-color: #ebebf2;
    color: #333;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
