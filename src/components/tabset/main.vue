<template>
    <div class="tabs-container">
        <ul :class="['tabs', 'clearfix', size || '']">
            <li :key="index" :class="[currentId === tab.id ? 'active' : '']"
                v-for="(tab, index) in tabs"
                @click="changeTab(tab)">
                <div>{{ tab.title }}</div>
                <div class="current-mark"></div>
            </li>
        </ul>
        <div class="description" v-if="currentTab && currentTab.description" v-html="currentTab.description"></div>
        <transition name="fade" mode="out-in">
            <component :data="data" :is="currentTab.component" v-if="currentTab"></component>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'km-tabset',
    props: {
        default: {
            type: String,
            default: '',
        },
        tabs: {
            type: Array,
            default: [],
        },
        size: {
            type: String,
        },
        data: {
            type: [Object, Array],
            default: null,
        },
    },
    data() {
        return {
            currentId: '',
        };
    },
    mounted() {
        this.currentId = this.default;
    },
    watch: {
        default(value) {
            this.currentId = value;
        },
        '$route': 'updateTab',
    },
    computed: {
        ...mapGetters({
            companyInfo: 'setting/companyInfo',
        }),
        currentTab() {
            return (this.tabs.filter(tab => tab.id === this.currentId))[0];
        },
    },
    methods: {
        changeTab(tab) {
            if (tab.path) {
                this.$router.push({ path: tab.path, query: { company_from: this.companyInfo.code } });
            } else {
                this.currentId = tab.id;
            }
        },
        updateTab(to, from) {
            const targetTab = this.tabs.filter(tab => tab.path === to.fullPath);
            if (targetTab.length) {
                this.currentId = targetTab[0].id;
            }
        },
    },
}
</script>

<style lang="less" scoped>
.tabs-container {
    padding-top: 10px;
    
    .tabs {
        height: 64px;
        border-bottom: solid 1px #f1f1f2;
        
        li {
            position: relative;
            float: left;
            height: 64px;
            line-height: 64px;
            margin: 0 28px;
            font-size: 18px;
            cursor: pointer;

            &:first-of-type {
                margin-left: 0px;
            }
            .current-mark {
                position: absolute;
                width: 0;
                height: 3px;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 2px;
                transition: width .1s;
                background-color: #008dfc;
            }
            &.active {
                color: #008dfc;
                
                .current-mark {
                    width: 54px;
                }
            }
        }
        &.small {
            height: 48px;

            li {
                height: 48px;
                line-height: 48px;
                font-size: 15px;
            }
        }
    }
}
</style>
