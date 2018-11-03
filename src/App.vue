<template>
  <div id="app">
    <range :size="150" :min="1" :max="20" v-model="pageLimit">
      <h4>Page Limit</h4>
    </range>
    <list :items="items.slice(0, pageLimit)">
      <list-item label="Event Title" field="title"></list-item>
      <list-item label="Start" field="started_at"
        :parse="date => date.replace(/\-/g, '/')"></list-item>
      <list-item label="End" field="ended_at"
        :parse="date => date.replace(/\-/g, '/')"></list-item>
      <list-item label="Location" field="location"></list-item>
      <list-item label="Manage">
        <template slot-scope="{ index }">
          <button @click="deleteItem(index)">Delete</button>
        </template>
      </list-item>
    </list>
    <div class="pagination">{{ pageLimit }} Item Per Page</div>
  </div>
</template>

<script>
import { list, listItem, range } from './ui';
import listData from './dummy';

export default {
  name: 'app',
  components: {
    list,
    listItem,
    range,
  },
  data() {
    return {
      items: listData,
      pageLimit: 10,
    };
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1);
      this.$toast('Successfully Deleted!');
    },
  },
};
</script>

<style lang="less">
body,ul,table {
  margin: 0;
  padding: 0;
}
#app {
  padding: 30px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.pagination {
  text-align: center;
  margin: 20px;
  font-size: 12px;
  color: #666;
}
</style>
