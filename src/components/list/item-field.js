export default {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  render(h, { props, data }) {
    if (props.column.field) {
      let value = props.item[props.column.field];

      if (props.column.parse) value = props.column.parse(value);
      if (typeof value !== 'string') value = JSON.stringify(value);
      return h('td', data, value);
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props));
    }

    return h('td', data, props.column.children);
  },
};
