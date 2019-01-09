<template>
  <span :class="['km-loading', type]">
    <i class="dot first"></i>
    <i class="dot second"></i>
    <i class="dot third"></i>
  </span>
</template>

<script>
export default {
  name: 'km-loading',
  props: {
    type: String,
  },
};
</script>
