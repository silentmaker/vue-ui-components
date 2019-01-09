<template>
    <div>department</div>
</template>

<script>
import tree from '../../tree/main.vue';

export default {
    components: { tree },
    props: ['data'],
    mounted() {
        console.log(this.data.option);
    },
}
</script>
