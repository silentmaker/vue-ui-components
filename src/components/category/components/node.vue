<template>
    <li class="item">
        <ul class="operations" v-if="model.name !== '其他'">
            <li class="bg-sprites icon-create" @click="update('create', model.id, model.name)" v-if="level > 0"></li>
            <li class="icon-create" v-else></li>
            <li class="bg-sprites icon-remove" @click="update('remove', model.id)" v-if="!model.isRoot"></li>
            <li class="weight" v-if="!model.isRoot">
                <input class="form-control" :value="model.weight" type="text" ref="weightInput"
                    @blur="updateWeight(model.id, $event.target.value)" v-if="weightEditing">
                <span @click.stop="editWeight" v-else>{{ model.weight }}</span>
            </li>
        </ul>
        <div class="content" @click="toggle">
            <span :class="['bg-sprites ', 'icon-toggle', open ? 'active' : '']"
                v-if="expanedable"></span>
            <span :class="['bg-sprites', 'icon-folder', open ? 'active' : '']"
                v-if="!options.hideIcon"></span>
            <input class="form-control" type="text" :value="model.name" @click.stop ref="nameInput"
                @blur="updateName(model.id, $event.target.value)" v-show="!model.isRoot && nameEditing">
            <span class="name single-line" @click.stop="editName" v-show="!model.isRoot && !nameEditing">{{ model.name }}</span>
        </div>
        <transition-group class="tree" tag="ul" name="fade" v-if="expanedable">
            <node v-for="model in model.children" :key="model.id" v-if="open"
                :level="level - 1" :update="update" :options="options" :model="model">
            </node>
        </transition-group>
    </li>
</template>

<script>
export default {
    name: 'node',
    props: {
        model: Object,
        level: Number,
        options: {
            type: Object,
            default: () => ({}),
        },
        update: Function,
    },
    data () {
        return {
            open: false,
            nameEditing: false,
            weightEditing: false,
        };
    },
    computed: {
        expanedable () {
            return this.model.children && this.model.children.length;
        },
    },
    mounted() {
        this.open = this.model.expanded || false;
    },
    methods: {
        toggle () {
            if (this.expanedable) {
                this.open = !this.open;
            }
        },
        editName() {
            this.nameEditing = !this.nameEditing;
            this.$nextTick(() => this.$refs.nameInput.focus());
        },
        editWeight() {
            this.weightEditing = !this.weightEditing;
            this.$nextTick(() => this.$refs.weightInput.focus());
        },
        updateName(id, value) {
            if (this.model.name !== value) this.update('name', id, value);
            this.nameEditing = false;
        },
        updateWeight(id, value) {
            if (this.model.weight !== value) this.update('weight', id, value);
            this.weightEditing = false;
        },
        createCategory() {
            console.log('create');
        },
    },
};
</script>

<style lang="less" scoped>
.tree {
    .item {
        position: relative;
        margin-left: 12px;
        line-height: 42px;
        cursor: pointer;

        .content {
            padding-left: 16px;
            border-bottom: solid 1px #efefef;
            &:hover { background-color: #efefef; }
            .name {
                display: inline-block;
                vertical-align: middle;
                line-height: 42px;
                max-width: 800px;
            }
            input.form-control {
                display: inline-block;
                width: 160px;
                margin-top: 2px;
            }
        }
        .operations {
            float: right;
            li {
                float: right;
                width: 28px;
                margin-left: 20px;
            }
            .weight .form-control {
                position: relative;
                left: -20px;
                margin-top: 2px;
                width: 60px;
            }
            .icon-remove,
            .icon-create {
                display: inline-block;
                width: 22px;
                height: 22px;
                vertical-align: middle;
                margin-top: 11px;
            }
            .icon-create {
                margin: 11px 8px 0 10px;
                background-position: -30px -1478px;
                &:hover { background-position: -30px -1515px; }
            }
            .icon-remove {
                margin: 11px 24px 0 24px;
                background-position: 0px -1478px;
                &:hover { background-position: 0px -1515px; }
            }
        }
        .icon-folder {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            background-position: -74px -73px;
            &.active { background-position: -99px -73px; }
        }
        .icon-toggle {
            position: absolute;
            left: 0px;
            top: 15px;
            width: 12px;
            height: 12px;
            background-position: -13px 2px;
            &.active { background-position: 2px 4px; }
        }
    }
}
</style>
