<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    field: {
      type: String,
    },
    parse: {
      type: Function,
    },
  },
};
</script>
