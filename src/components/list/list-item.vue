<script >
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        field: String,
        size: Number,
        parse: Function,
        order: String,
        sort: Function,
        title: String,
    },
};
</script>