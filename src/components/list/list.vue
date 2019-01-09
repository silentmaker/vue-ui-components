<template>
    <div>
        <table class="list" ref="table">
            <thead :class="maxHeight > 0 ? 'scroll' : ''">
                <tr>
                    <th :key="index" :style="{width: column.size ? `${column.size}px` : 'inherit'}"
                        v-for="(column, index) in columns">
                        <item-label :label="column.label"
                            :order="getSort(column.order)"
                            :sort="column.sort || null"
                            @sorted="order => toggleSort(column.order, order)">
                        </item-label>
                    </th>
                </tr>
            </thead>
            <transition-group
                tag="tbody" name="fade" v-if="!loading && items.length"
                :class="maxHeight > 0 ? 'scroll' : ''"
                :style="{ 
                    height: maxHeight > 0 ? 'auto' : `${tableHeight}px`, 
                    maxHeight: `${maxHeight > 0 ? maxHeight : 'none'}` 
                }">
                <tr :key="item.id || index" v-for="(item, index) in items">
                    <item-field
                        :class="size"
                        :key="idx" v-for="(column, idx) in columns"
                        :column="column" :item="item" :index="index">
                    </item-field>
                </tr>
            </transition-group>
        </table>

        <loading :style="{ minHeight: `${tableHeight}px` }" v-show="loading"></loading>

        <div class="table-content" v-show="!loading && !items.length">
            <div class="emtpy-content">
                <img :src="require('img/pc-list-empty.png')" alt="Empty List">
                <div class="mt-l font-m">暂无内容</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { deepGet, deepSet } from 'js/common/utils';
    import itemField from './item-field';
    import itemLabel from './item-label.vue';
    import loading from '../loading/loading.vue';

    export default {
        props: {
            items: {
                type: Array,
                default: () => ([]),
            },
            loading: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'middle',
            },
            maxHeight: {
                type: Number,
                default: -1,
            },
        },
        components: { itemField, itemLabel, loading },
        data () {
            return {
                vnodes: [],
                tableWidth: 0,
                tableHeight: 0,
            };
        },
        mounted () {
            this.tableWidth = this.$refs.table.clientWidth;
        },
        watch: {
            items (val) {
                if (!this.tableHeight) {
                    const lineHeight = this.size === 'small' ? 41 : 59;

                    this.tableHeight = val.length * lineHeight - 1;
                }
            },
        },
        computed: {
            columns () {
                return this.vnodes.map((vnode) => {
                    const { componentOptions: { propsData, children }, data: { scopedSlots } } = vnode;
                    const {
                        field, label, parse, size, order, sort, title,
                    } = propsData;
                    return {
                        field, label, parse, size, order, sort, scopedSlots, children, title,
                    };
                });
            },
        },
        created () {
            this.vnodes = !this.$slots.default ? []
            : this.$slots.default.filter(vnode => vnode.componentOptions);
        },
        methods: {
            getSort (path) {
                if (path) return deepGet(this.$parent, path);
            },
            toggleSort (path, order) {
                deepSet(this.$parent, path, order);
            },
        },
    };
</script>

<style lang="less" scoped>
_:-ms-fullscreen, :root tr { height: 100%; }
@supports (-ms-ime-align:auto) {
    tr { height: 100%; }
}
table.list {
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
        th {
            font-size: 14px;
            font-weight: normal;
            background-color: #eef4f8;
            text-align: left;
            height: 44px;
            color: #6b829f;
            padding: 0 10px;
        }
    }
    thead.scroll {
        display: inline-table;
        width: 100%;
    }
    tbody {
        tr {
            border: solid 1px #efefef;
            border-top: none;
            td {
                line-height: 58px;
                vertical-align: middle;
                white-space: nowrap;
                padding: 0 10px;
                font-size: 14px;
                color: #666;
                &:first-of-type { color: #333; }
            }
            td.small {
                line-height: 40px;
            }
        }
    }
    tbody.scroll {
        display: block;
        overflow: auto;
        height: auto;
        max-height: 410px;
        table-layout: fixed;
        tr {
            width: 100%;
            display: table;
        }
    }
}
.table-content {
    border: solid 1px #efefef;
    border-top: none;
    min-height: 300px;
    .emtpy-content {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        padding-top: 80px;
        text-align: center;
        color: #DFE3EA;

        img {
            display: block;
            width: 100%;
        }
    }
}
</style>
