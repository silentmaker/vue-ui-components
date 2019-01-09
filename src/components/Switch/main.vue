<template>
  <div :class="['km-switch', enabled ? '' : 'off', disabled ? 'disabled' : '']" @click="toggle">
    <div class="handle"></div>
  </div>
</template>

<script>
export default {
  name: 'km-switch',
  props: {
    value: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      enabled: false,
    };
  },
  mounted() {
    this.enabled = this.value;
  },
  watch: {
    value(val) {
      this.enabled = val;
    },
  },
  methods: {
    toggle() {
      this.enabled = !this.enabled;
      this.$emit('input', this.enabled);
    },
  },
};
</script>
