<template>
  <input type="text" :class="['km-input', type, size]" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'km-input',
  props: {
    size: String,
    type: String,
  },
};
</script>
