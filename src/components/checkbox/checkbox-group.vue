<template>
    <div><slot></slot></div>
</template>

<script>
export default {
    name: 'checkbox-group',
    props: {
        value: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            checkedItems: [],
        };
    },
    mounted() {
        this.init(this.value);
        this.$on('check', this.update);
    },
    watch: {
        value(val) {
            this.init(val);
        },
    },
    methods: {
        init(value) {
            this.checkedItems = value;
            if (this.$children) {
                this.$children.map(child => child.$emit('init', value));
            }
        },
        update(value) {
            const index = this.checkedItems.indexOf(value);

            if (index === -1) {
                this.checkedItems.push(value);
            } else {
                this.checkedItems.splice(index, 1);
            }
            this.$emit('input', this.checkedItems);
        },
    },
}
</script>
