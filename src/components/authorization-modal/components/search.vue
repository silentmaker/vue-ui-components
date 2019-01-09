<template>
    <div class="search-container">
        <div class="name-list" @click="focus">
            <span class="name-label" :key="item.id" v-for="(item, index) in data">
                {{ item.name }}
                <span class="remove-icon" @click="$emit('remove', index)"></span>
            </span>
            <span>{{ text }}</span>
            <input class="search-input" type="text" ref="searchInput" v-model="text">
        </div>
        <ul class="cadidate-list" v-show="cadidates.length">
            <li :key="item.id" v-for="item in cadidates" @click="select(item)">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            text: '',
            cadidates: [],
        };
    },
    watch: {
        'text': 'update',
    },
    methods: {
        focus() {
            this.$refs.searchInput.focus();
        },
        update(e) {
            axios.get(`${this.source}?starts_with=${this.text}`).then(({ data }) => {
                this.cadidates = data.map(item => ({ id: item.id, name: item.display_name, model: 'staff' }));
            });
        },
        select(item) {
            this.text = '';
            this.cadidates = [];
            this.$emit('add', item);
        },
    },
}
</script>
