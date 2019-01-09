<template>
    <div class="tree-container">
        <ul class="tree" v-if="treeData">
            <li class="item">
                <ul class="tree-header">
                    <li class="right ml-xl pl-s pr-s">新增</li>
                    <li class="right ml-xl pl-s pr-s">删除</li>
                    <li class="right ml-xl pl-s pr-s">次序</li>
                    <li class="left">{{ rootHeader }}</li>
                </ul>
            </li>
            <item :level="limit" :update="handleUpdate" :options="options" :model="treeData" />
        </ul>
        <loading v-else></loading>
        <modal size="medium" @close="closeModal" @submit="createItem" v-if="showModal">
            <template slot="title">{{ modalTitle || '新增' }}</template>
            <template slot="body">
                <div class="clearfix mb-xl pl-xl mt-xl">
                    <label for="name" class="col-xs-2 line-height-form"><span class="red">*</span>名称</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" id="name" v-model="formData.name">
                        <div class="red mt-m" v-if="isSubmitting && !formData.name.trim()">名称不能为空</div>
                    </div>
                </div>
                <div class="clearfix mb-xl pl-xl">
                    <label for="weight" class="col-xs-2 line-height-form">次序</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" id="weight" v-model.number="formData.weight">
                        <div class="red mt-m" v-if="isSubmitting && formData.weight && !Number.isInteger(formData.weight)">次序必须为整数</div>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import item from './components/node.vue';
import modal from '../modal/main.vue';
import loading from '../loading/loading.vue';

export default {
    name: 'tree',
    components: { item, modal, loading },
    props: {
        data: Object,
        type: String,
        rootName: {
            type: String,
            required: true,
        },
        rootHeader: {
            type: String,
            default: '分类名称',
        },
        limit: {
            type: Number,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({
                hideIcon: false,
            }),
        },
    },
    data() {
        return {
            asyncData: '',
            formData: {
                target_type: this.type,
                category_id: '',
                name: '',
                weight: '',
            },
            modalTitle: '',
            showModal: false,
            isSubmitting: false,
        };
    },
    computed: {
        treeData() {
            return this.data || this.asyncData;
        }
    },
    mounted() {
        if (!this.data && this.type) this.loadData();
    },
    methods: {
        loadData() {
            axios.get(`/api/v1/categories?type=${this.type}`).then(({ data }) => {
                this.asyncData = { name: this.rootName, isRoot: true, expanded: true, children: data };
            }).catch(error => {
                errorTips(error.response.data);
                httpError(error);
            });
        },
        handleUpdate(action, id, value) {
            switch (action) {
                case 'remove':
                    this.$confirm('你确定要删除该分类吗？', {
                        success: () => {
                            axios.delete(`/api/v1/settings/categories/${id}`).then(() => {
                                this.$toast('成功删除分类');
                                this.removeItem(this.treeData, id);
                            }).catch(error => {
					            errorTips(error.response.data);
                                httpError(error);
                            });
                        }
                    });
                    break;
                case 'weight':
                case 'name':
                    let update = {};
                    update[action] = value;
                    axios.put(`/api/v1/settings/categories/${id}`, update).then(() => {
                        this.$toast('成功更新分类');
                        this.updateItem(this.treeData, { id, update });
                    }).catch(error => {
					    errorTips(error.response.data);
                        httpError(error);
                    });
                    break;
                case 'create':
                    this.formData.category_id = id;
                    this.modalTitle = `新增 ${value} 下的分类`;
                    this.showModal = true;
                    break;
                default:
                    break;
            }
        },
        removeItem(data, id) {
            if (data.children && data.children.length) {
                const pruned = data.children.filter(item => item.id !== id);
                if (pruned.length === data.children.length) {
                    data.children.map(child => this.removeItem(child, id));
                } else {
                    data.children = pruned;
                }
            }
        },
        updateItem(data, { id, update }) {
            if (data.children && data.children.length) {
                let position = -1;
                data.children.map((item, index) => {
                    if (item.id === id) position = index;
                });
                if (position === -1) {
                    data.children.map(child => this.updateItem(child, { id, update }));
                } else {
                    const target = data.children.splice(position, 1)[0];
                    data.children.splice(position, 0, Object.assign({}, target, update));
                }
            }
        },
        createItem() {
            this.isSubmitting = true;
            if (!this.formData.name.trim() || (this.formData.weight && !Number.isInteger(this.formData.weight))) return false;
            if (!this.formData.weight) this.formData.weight = 0;
            axios.post('/api/v1/settings/categories', this.formData).then(({ data }) => {
                this.$toast('成功添加分类');
                this.showModal = false;
                this.isSubmitting = false;
                this.appendItem(this.treeData, this.formData.category_id, data);
                this.formData.name = null;
                this.formData.weight = null;
            }).catch(error => {
                if (error.response.data && error.response.data.message) {
                    this.$toast(error.response.data.message, { status: 'error' });
                }
                httpError(error);
            });
        },
        appendItem(data, id, model) {
            if (data.id === id) {
                if (data.children) {
                    let position = -1;
                    data.children.map((item, index) => {
                        if (item.weight > model.weight && position === -1) position = index;
                    });
                    data.children.splice(position, 0, model);
                } else {
                    data.children = [model];
                    this.$forceUpdate();
                }
            } else if (data.children && data.children.length) {
                data.children.map(child => this.appendItem(child, id, model));
            }
        },
        closeModal() {
            this.showModal = false;
            this.isSubmitting = false;
            this.formData.name = null;
            this.formData.weight = null;
        },
    },
}
</script>

<style lang="less" scoped>
.tree-container {
    min-width: 940px;
    max-width: 1080px;
    margin-bottom: 20px;
    .tree-header {
        height: 36px;
    }
    .item { line-height: 36px; }
}
</style>
