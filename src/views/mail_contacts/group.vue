<template>
    <div class="app-container calendar-list-container group-container">
    
        <div class="filter-container">
            <el-button @click="openForm('add')" type="primary" icon="plus">新增分组</el-button>
        </div>
    
        <el-table :data="list" ref="groupTable" v-loading.body="listLoading" border highlight-current-row style="width: 100%">
    
            <el-table-column align="center" min-width="200px" label="分组名">
                <template scope="scope">
                    <el-tag @click="goToGroup(scope.row.id)" type="primary" color="#E3FDFD">{{scope.row.name}}</el-tag>
                </template>
            </el-table-column>
    
            <el-table-column align="center" label="操作" min-width="200px">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="openForm('edit', scope.row)" class="edit-group">编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="delGroup(scope.row.id)">删除
                    </el-button>
                    <el-button size="small" type="success" @click="goToGroup(scope.row.id)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    
        <el-dialog :title="groupOperation | operationFilter" :visible.sync="formVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="分组名称" prop="name" label-width="100px">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-transfer v-model="value" filterable :filter-method="filterContacts" :left-default-checked="[2, 3]" :right-default-checked="rightChecked" :props="{key: 'mail',label: 'name'}" :render-content="renderFunc" :titles="['联系人', '分组联系人']" :button-texts="['取消添加', '添加到该分组']" :footer-format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}" :data="contacts">
                </el-transfer>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as groupAPI from 'api/mail_group';
import * as contactsAPI from 'api/mail_contacts';

export default {
    name: 'group_manage',
    data() {
        return {
            listLoading: true,
            total: 0,
            listQuery: {
                page: 1,
                limit: 10
            },
            list: [],
            groupOperation: '',
            formVisible: false,
            form: {
                name: '',
                contacts: []
            },
            contacts: [],
            value: [],
            rightChecked: [],
            rules: {
                name: [
                    { required: true, message: '请输入分组名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    beforeCreate() {
        contactsAPI.fetchList().then(res => {
            this.contacts = res.data.contacts
        });
    },
    created() {
        this.initPage();
    },
    filters: {
        operationFilter(operation) {
            const operationMap = {
                add: '新增分组',
                edit: '编辑分组'
            };
            return operationMap[operation];
        }
    },
    methods: {
        initPage() {
            this.getList();
        },
        getList() {
            groupAPI.fetchList().then(res => {
                this.list = res.data.groupList;
                this.total = res.data.total;
                this.listLoading = false;
            })
        },
        getContacts() {
            contactsAPI.fetchList().then(res => this.contacts = res.data.contacts);
        },
        renderFunc(h, option) {
            return h('span', {}, option.name + '-' + option.mail);
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
                contacts: []
            };
        },
        openForm(operation, group) {
            this.groupOperation = operation;
            this.formVisible = true;
            if (operation === 'add') {
                this.initForm();
            } else {
                this.contacts.forEach(contact => {
                    group.contacts.forEach(item => {
                        if (contact.mail === item.mail) {
                            this.value.push(item.mail);
                        }
                    })
                })
                this.form.name = group.name;
            }
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (!valid) {
                    // console.log('error submit!!');
                    return;
                } else {
                    const handle = this.groupOperation === 'add' ? groupAPI.add : groupAPI.edit;
                    this.form.contacts = this.value;
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
                }
            });
        },
        delGroup(id) {
            this.$confirm('是否删除该分组？', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                groupAPI.del(id).subscribe({
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
        goToGroup(id) {
            this.$router.push({ path: '/mail_contacts/index', query: { groupId: id } })
        },
        filterContacts(query, item) {
            return item.name.indexOf(query) > -1 || item.mail.indexOf(query) > -1;
        }
    }
}
</script>
<style>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}

.el-transfer-panel {
    min-width: 320px;
}

.group-container .el-dialog--small {
    width: 60%;
}

.group-container .el-transfer-panel__body {
    height: 260px;
}
</style>
