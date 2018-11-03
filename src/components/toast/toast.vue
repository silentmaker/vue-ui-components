<template>
  <transition :name="options.transition">
    <div :class="['toast-container', `${options.status}`]"
      :style="{transitionDuration: `${options.duration}s`}"
      v-if="message">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  DEFAULT: {
    id: 'default-toast',
    status: 'success',
    duration: 2,
    transition: 'fade',
  },
  data() {
    return {
      message: '',
      options: {},
      queue: [],
      timer: null,
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
  width: 240px;
  height: 40px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: #fff;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;

  &.success {
    background-color: green;
  }
  &.error {
    background-color: red;
  }
  &.warning {
    background-color: orange;
  }
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.slidedown-enter-active, .slidedown-leave-active {
  transition-property: transform,opacity;
}
.slidedown-enter, .slidedown-leave-to {
  transform: translateX(-50%) translateY(-80%);
  opacity: 0;
}
</style>
