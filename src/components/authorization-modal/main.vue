<template>
    <modal class="authorization-container" :width="640" @close="$emit('close')">
        <template slot="title">{{ title }}</template>
        <template slot="body">
            <search :data="chosen" :source="source.staff" @remove="remove" @add="add"></search>
            <tabset size="small" :default="currentTab" :tabs="tabs" :data="{chosen, source}"></tabset>
        </template>
    </modal>
</template>

<script>
import modal from '../modal/main.vue';
import tabset from '../tabset/main.vue';
import search from './components/search.vue';
import department from './components/department.vue';
import staff from './components/staff.vue';
import tag from './components/tag.vue';

export default {
    name: 'km-authorization-modal',
    components: { modal, search, tabset, department, staff, tag },
    props: {
        title: {
            type: String,
            default: '请选择员工范围',
        },
        mode: {
            type: Array,
            default: () => (['department', 'staff', 'tag']),
        },
        data: {
            type: Array,
            required: true,
        },
        source: {
            type: Object,
            default: () => ({}),
        },
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            chosen: [],
            allTabs: [
                { id: 'department', title: '按部门选择', component: department },
                { id: 'staff', title: '按人员选择', component: staff },
                { id: 'tag', title: '按标签选择', component: tag },
            ],
            tabs: [],
            currentTab: '',
        };
    },
    watch: {
        'data': 'init',
    },
    methods: {
        init() {
            this.tabs = this.allTabs.filter(tab => this.mode.indexOf(tab.id) !== -1);
            this.currentTab = this.mode ? this.mode[0] : 'department';
            this.chosen = this.data.slice();
        },
        add(item) {
            if (this.chosen.findIndex(c => c.id === item.id) === -1) this.chosen.push(item);
        },
        remove(index) {
            this.chosen.splice(index, 1);
        },
    },
}
</script>

<style lang="less">
.authorization-container {
    .search-container {
        position: relative;

        .name-list {
            width: 100%;
            min-height: 42px;
            max-height: 112px;
            padding: 5px 10px 0;
            overflow: auto;
            background-color: #fff;
            border: 1px solid #c9d0d9;
            border-radius: 4px;
    
            .name-label {
                position: relative;
                display: inline-block;
                padding: 2px 10px;
                margin: 0 8px 5px 0;
                line-height: 24px;
                text-align: center;
                color: #777;
                background: #fdfdfe;
                border: 1px solid #e6e8ec;
                border-radius: 4px;
    
                .remove-icon {
                    display: block;
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #c9d0d9;
                    opacity: 0;
                    cursor: pointer;
                    transition: opacity,background-color .3s;
    
                    &:hover {
                        background-color: #EF513B;
                    }
                    &::before,
                    &::after {
                        content: '';
                        display: block;
                        width: 0;
                        height: 8px;
                        border: solid 1px #fff;
                        position: absolute;
                        top: 2px;
                        left: 5px;
                        transform: rotate(-45deg);
                    }
                    &::after {
                        transform: rotate(45deg);
                    }
                }
                &:hover {
                    .remove-icon {
                        opacity: 1;
                    }
                }
            }
            .search-input {
                display: inline-block;
                border: none;
                width: 4px;
                color: #fff;
            }
        }
        .cadidate-list {
            position: absolute;
            bottom: 0;
            transform: translateY(100%);
            background-color: #fff;
            border: solid 1px #f1f2f3;
            max-height: 240px;
            overflow: auto;
            z-index: 1;

            li {
                display: block;
                padding: 10px 20px;
                &:hover {
                    cursor: pointer;
                    background-color: #f1f2f3;
                }
            }
        }
    }
}
</style>
