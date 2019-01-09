<template>
  <button :class="['km-button', type, size]" v-bind="$attrs" v-on="$listeners">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'km-button',
  props: {
    size: String,
    type: String,
  },
};
</script>
