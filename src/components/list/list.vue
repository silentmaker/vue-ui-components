<template>
  <table class="list">
    <thead>
      <tr>
        <th :key="index" v-for="(column, index) in columns">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(item, index) in items">
        <item-field :key="idx" v-for="(column, idx) in columns"
          :column="column" :item="item" :index="index">
        </item-field>
      </tr>
    </tbody>
  </table>
</template>

<script>
import itemField from './item-field';

export default {
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  components: { itemField },
  data() {
    return {
      vnodes: [],
    };
  },
  computed: {
    columns() {
      return this.vnodes.map((vnode) => {
        const { componentOptions: { propsData, children }, data: { scopedSlots } } = vnode;
        const {
          field, label, parse,
        } = propsData;
        return {
          field, label, parse, scopedSlots, children,
        };
      });
    },
  },
  created() {
    this.vnodes = !this.$slots.default ? []
      : this.$slots.default.filter(vnode => vnode.componentOptions);
  },
};
</script>

<style lang="less" scoped>
table.list {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  thead {
    th {
      background-color: #f1f1f2;
      text-align: left;
      line-height: 42px;
    }
  }
  tbody {
    tr {
      border-bottom: solid 1px #f1f1f2;
      td {
        line-height: 36px;
        vertical-align: middle;
        white-space: nowrap;
      }
    }
  }
}
</style>
