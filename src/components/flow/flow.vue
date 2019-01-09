<template>
    <div class="flow-container clearfix" ref="container">
        <transition-group tag="ul" name="fade">
            <li :style="{ width: `${size}px`, marginRight: `${gap}px` }"
                :key="column.id" v-for="column in columns">
                <div :key="item.id" v-for="item in column.items">
                    <slot :item="item"></slot>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => ([]),
        },
        size: {
            type: Number,
            required: true,
        },
        gap: {
            type: Number,
            default: 20,
        },
    },
    data() {
        return {
            columns: [],
        };
    },
    mounted() {
        this.reflowData();
        window.addEventListener('resize', this.reflowData);
    },
    watch: {
        items() {
            this.reflowData();
        },
    },
    methods: {
        reflowData() {
            if (this.$refs.container && this.$refs.container.clientWidth) {
                let columns = [];
                const columnCount = Math.floor(this.$refs.container.clientWidth / (this.size + this.gap));
    
                for (let i = 0; i < columnCount; i++) columns.push({ id: `column-${i}`, items: [] });
                this.items.map((item, index) => {
                    let columnIndex = Math.floor(index % columnCount);
                    columns[columnIndex].items.push(item);
                });
                this.columns = columns;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.flow-container {
    li {
        float: left;
    }
}
</style>

