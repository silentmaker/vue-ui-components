<template>
  <div class="range-container">
    <div class="track" ref='track'>
      <div class="fill" :style="{width: `${current}px`}"></div>
      <div :class="['handle', dragging ? 'active' : '']"
        :style="{transform: `translateX(${current}px)`}"
        @mousedown="hold">
        <div class="tip" v-if="tooltip">{{ parse ? parse(value) : value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
    },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
    parse: {
      type: Function,
    },
    value: {
      type: Number,
      default: 0,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragging: false,
      width: 0,
      start: {
        clientX: 0,
        current: 0,
      },
      distance: 0,
      current: 0,
    };
  },
  mounted() {
    this.width = (this.size || this.$refs.track.clientWidth) - 4;
    document.body.addEventListener('mousemove', this.drag);
    document.body.addEventListener('mouseup', this.drop);
    this.init(this.value);
  },
  watch: {
    value(val) {
      this.init(val);
    },
  },
  methods: {
    init(val) {
      let value = val;
      if (value < this.min) value = this.min;
      if (value > this.max) value = this.max;
      this.current = parseInt((value - this.min) / (this.max - this.min) * this.width, 10);
    },
    hold(e) {
      this.dragging = true;
      this.start.clientX = e.clientX;
      this.start.current = this.current;
    },
    drag(e) {
      if (this.dragging) {
        let value = 0;
        this.current = e.clientX - this.start.clientX + this.start.current;
        if (this.current < 0) this.current = 0;
        if (this.current > this.width) this.current = this.width;
        value = parseInt(this.current / this.width * (this.max - this.min) + this.min, 10);
        this.$emit('input', value);
      }
    },
    drop() {
      this.dragging = false;
    },
  },
  destroyed() {
    document.body.removeEventListener('mousemove', this.drag);
    document.body.removeEventListener('mouseup', this.drop);
  },
};
</script>

<style lang="less" scoped>
.range-container {
  margin: 10px;
  height: 24px;

  .track {
    position: relative;
    top: 10px;
    height: 4px;
    border-radius: 2px;
    background-color: #f1f1f2;
    .fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      border-radius: 2px;
      background-color: #008dfc;
    }
    .handle {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #008dfc;
      cursor: pointer;
      &.active {
        top: -6px;
        left: -6px;
        width: 16px;
        height: 16px;
      }
    }
    .tip {
      position: absolute;
      top: -32px;
      left: 50%;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      padding: 0 5px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      border-radius: 4px;
      background-color: #f1f1f2;
      color: #666;
      &:after {
        content: '';
        display: block;
        border: solid 4px transparent;
        border-top-color: #f1f1f2;
        position: absolute;
        left: 50%;
        margin-left: -4px;
      }
    }
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
