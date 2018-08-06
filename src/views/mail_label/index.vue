<template>
    <div class="app-container calendar-list-container">
    
        <div class="filter-container">
            <el-button @click="openForm('add')" type="primary" icon="plus">新增标签</el-button>
        </div>
    
        <el-table :data="list" ref="labelTable" v-loading.body="listLoading" border highlight-current-row style="width: 100%">
    
            <el-table-column align="center" min-width="200px" label="标签名">
                <template scope="scope">
                    <el-tag @click="goToMailList(scope.row.id)" type="primary" color="#E3FDFD">{{scope.row.name}}</el-tag>
                </template>
            </el-table-column>
    
            <el-table-column align="center" label="操作" min-width="200px">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="openForm('edit', scope.row)" class="edit-label">编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="delLabel(scope.row.id)">删除
                    </el-button>
                    <el-button size="small" type="success" @click="goToMailList(scope.row.id)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    
        <el-dialog :title="labelOperation | operationFilter" :visible.sync="formVisible">
            <el-form :model="form">
                <el-form-item label="标签名称" label-width="100px">
                    <el-input v-model="form.name" auto-complete="off" maxlength="15" minlength="1"></el-input>
                </el-form-item>
                <el-form-item label="标签颜色" label-width="100px">
                    <el-color-picker v-model="form.color" show-alpha></el-color-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as labelAPI from 'api/mail_label';

export default {
    name: 'label_manage',
    data() {
        return {
            listLoading: true,
            total: null,
            listQuery: {
                page: 1,
                limit: 10,
                sort: ''
            },
            list: [],
            labelOperation: '',
            formVisible: false,
            form: {
                name: '',
                color: '#20a0ff'
            }
        }
    },
    created() {
        this.getList();
    },
    filters: {
        operationFilter(operation) {
            const operationMap = {
                add: '新增标签',
                edit: '编辑标签'
            };
            return operationMap[operation];
        }
    },
    methods: {
        getList() {
            labelAPI.fetchList().then(res => {
                this.list = res.data.labelList;
                this.total = res.data.total;
                this.listLoading = false;
            })
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        initForm() {
            this.form = {
                name: '',
                color: '#20a0ff'
            };
        },
        openForm(operation, label) {
            this.labelOperation = operation;
            this.formVisible = true;
            if (operation === 'add') {
                this.initForm();
            } else {
                this.form = label;
            }
        },
        submit() {
            const handle = this.labelOperation === 'add' ? labelAPI.add : labelAPI.edit;
            handle(this.form).subscribe({
                next: () => {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1000
                    });
                    setTimeout(() => {
                        this.formVisible = false;
                        this.getList();
                    }, 1000)
                },
                error: () => {
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    })
                }
            })
        },
        delLabel(id) {
            this.$confirm('是否删除该标签，删除后也将删除邮件内该标签', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                labelAPI.del(id).subscribe({
                    next: () => {
                        this.$message('删除成功');
                        this.getList();
                    },
                    error: () => {
                        this.$message('删除失败');
                    }
                })
            })
        },
        goToMailList(id) {
            this.$router.push({ path: '/mail_list/index', query: { labelId: id } })
        }
    }
}
</script>
<style>

</style>
