import { deepGet } from 'js/common/utils';

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
    render (h, {
        props,
        data,
    }) {
        let innerChildren = props.column.children;

        if (props.column.field) {
            let value = deepGet(props.item, props.column.field);

            if (props.column.parse) value = props.column.parse(value);
            if (typeof value !== 'string') value = JSON.stringify(value);
            if (value === null || value === undefined) value = '--';

            innerChildren = value;
        }

        if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
            innerChildren = props.column.scopedSlots.default(props);
        }
        if (props.column.size) {
            return h('td', data, [
                h('div', {
                    class: { 'single-line': true },
                    style: { maxWidth: `${props.column.size}px` },
                    attrs: {
                        title: (props.column.field && props.column.title ? innerChildren : ''),
                    },
                }, innerChildren),
            ]);
        }
        return h('td', data, innerChildren);
    },
};
