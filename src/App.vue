<template>
  <div id="app">
    <list :items="items">
      <list-item label="NAME" field="name"></list-item>
      <list-item label="AGE" field="age"></list-item>
      <list-item label="NO.AGE" field="age" :parse="parseAge"></list-item>
      <list-item label="RANGE">
        <template slot-scope="{ item }">
          <range :min="1" :max="40" :tooltip="true" :parse="age => `${age}岁`"
            v-model="item.age">
          </range>
        </template>
      </list-item>
      <list-item label="OPERATE">
        <template slot-scope="{ index }">
          <button @click="deleteItem(index)">delete</button>
        </template>
      </list-item>
    </list>
  </div>
</template>

<script>
import list from './components/list/list.vue';
import listItem from './components/list/list-item.vue';
import range from './components/range.vue';

export default {
  name: 'app',
  components: {
    list,
    listItem,
    range,
  },
  data() {
    return {
      items: [
        { name: 'john', age: 12 },
        { name: 'elvin', age: 13 },
        { name: 'joe', age: 14 },
        { name: 'amy', age: 15 },
      ],
    };
  },
  methods: {
    parseAge(age) {
      return `no.${age}`;
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      this.$toast('Successfully Deleted!');
    },
  },
};
</script>
