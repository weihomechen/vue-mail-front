<template>
    <div v-loading.body="loading" class="app-container calendar-list-container">
        <el-row class="tool-bar">
            <el-button-group>
                <el-button v-if="mailType === 'receive'" v-waves @click="reply()" type="primary" icon="edit" size="small">回复</el-button>
                <el-button v-if="mailType === 'receive'" v-waves @click="reply(true)" type="primary" icon="edit" size="small">回复全部</el-button>
                <el-button v-if="mailType === 'send'" v-waves @click="edit" type="primary" icon="edit" size="small">编辑</el-button>
                <el-button v-waves @click="forward" type="primary" icon="share" size="small">转发</el-button>
                <el-button v-waves @click="deleteMail" type="primary" icon="delete" size="small">删除</el-button>
                <el-button v-waves @click="initPage" type="primary" size="small">
                    <icon-svg icon-class="reload4"/>
                </el-button>
            </el-button-group>
            <el-dropdown @command="handleMark" split-button type="primary" size="small" menu-align="start">
                标记为
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="star">
                         <icon-svg icon-class="favourite" class="download-icon" />星标邮件</el-dropdown-item>
                    <el-dropdown-item v-for="label in labelList" :key="label.id" :command="label.id+''">
                        <icon-svg icon-class="label1" class="download-icon" />{{label.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown split-button type="primary" size="small" menu-align="start">
                附件
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="file in mail.oldFileList" :key="file.name">
                        <icon-svg icon-class="download3" class="download-icon"/>
                        <a :href="file.url" download="">{{file.name}}</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown split-button type="primary" size="small" menu-align="start">
                录音
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="audio in mail.oldAudioList" :key="audio.name">
                        <icon-svg icon-class="voice4" class="download-icon"/>
                        <a :href="audio.url" download="">{{audio.name}}</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-row>
        <div class="mail-info">
            <div class="title-info">
                <span class="mail-title">{{mail.title}}</span>
                <i class="detail-mark-star fa" @click="toggleStar()" v-bind:class="[mail.isStar? 'fa-star':'fa-star-o']"></i>
                <el-tag v-for="(label, index) in mail.labelList" :key="label.id" :closable="true" :color="label.color" :close-transition="false" @close="delLabel(index)" class="label-item">
                    {{label.name}}
                </el-tag>
            </div>
            <div>
                <el-tag type="primary" class="info-tag">发件人</el-tag>
                <span class="send-name">{{mail.sender}}</span>
                <{{mail.sendMail}}>;
            </div>
            <div>
                <el-tag type="primary" class="info-tag">时间&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>{{showMailTime | parseTime(('{y}-{m}-{d} {h}:{i}')) }}
            </div>
            <el-row>
                <el-col :span="1">
                    <el-tag type="primary">收件人</el-tag>
                </el-col>
                <el-col :span="22">
                    <span v-for="item in mail.target" :key="item.mail" class="target-item">
                        <span class="target-name">{{item.name}}</span>
                        <{{item.mail}}>;
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="1">
                    <el-tag type="primary">抄送&nbsp;&nbsp;&nbsp;&nbsp;</el-tag>
                </el-col>
                <el-col :span="22">
                    <span v-for="item in mail.copy" :key="item.mail" class="target-item">
                        <span class="target-name">{{item.name}}</span>
                        <{{item.mail}}>;
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="mail-content" v-html="mail.content"></div>
    </div>
</template>

<script>
import * as mailDetailAPI from 'api/mail_detail';
import * as labelAPI from 'api/mail_label';
import { parseTime } from 'utils/index';

export default {
    name: 'mail_detail',
    data() {
        return {
            mail: {
                id: '',
                title: '',
                target: [],
                copy: [],
                sender: '',
                sendMail: '',
                receiveDate: '',
                sendDate: '',
                oldFileList: [],
                oldAudioList: [],
                labelList: [],
                isStar: false
            },
            loading: true,
            activeGroup: ['target'],
            labelList: [],
            mailType: '',
            mailId: null
        }
    },
    created() {
        this.initPage();
    },
    computed: {
        showMailTime() {
            return this.mail.receiveDate || this.mail.sendData;
        }
    },
    methods: {
        initPage() {
            this.getDetail();
            this.getLabelList();
        },
        getDetail() {
            this.loading = true;
            this.mailId = this.$route.params.mailId || this.$store.getters.mailId;
            if (!this.mailId) {
                this.$router.push('/');
            }
            this.mailType = this.$store.getters.mailType;
            const query = { mailId: this.mailId, mailType: this.mailType };
            mailDetailAPI.fetchDetail(query).then(res => {
                this.loading = false;
                this.mail = res.data;
            })
        },
        getLabelList() {
            labelAPI.fetchList().then(res => this.labelList = res.data.labelList)
        },
        reply(isALL) {
            if (isALL) {
                this.$store.commit('SET_PAGE_TYPE', 'replyAll');
            } else {
                this.$store.commit('SET_PAGE_TYPE', 'reply');
            }
            this.$store.commit('SET_MAIL_TYPE', 'receive');
            this.$router.push({ path: '/mail_send/index' });
        },
        edit() {
            this.$store.commit('SET_PAGE_TYPE', 'edit');
            this.$store.commit('SET_MAIL_TYPE', this.mailType);
            this.$router.push({ path: '/mail_send/index' });
        },
        forward() {
            this.$store.commit('SET_PAGE_TYPE', 'forward');
            this.$store.commit('SET_MAIL_TYPE', this.mailType);
            this.$router.push({ path: '/mail_send/index' });
        },
        deleteMail() {
            this.$confirm('是否删除这封邮件', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                mailDetailAPI.delMail().subscribe({
                    next: () => {
                        this.$message({
                            type: 'success',
                            message: '删除成功',
                            duration: 1000
                        });
                        setTimeout(() => this.$router.go(-1), 1000);
                    },
                    error: () => this.$message({
                        type: 'error',
                        message: '删除失败'
                    })
                })
            }).catch();
        },
        delLabel(index) {
            this.mail.labelList.splice(index, 1);
        },
        toggleStar() {
            labelAPI.toggleStar([this.mail.id]).subscribe({
                next: () => {
                    debugger
                    this.mail.isStar = !this.mail.isStar;
                }
            })
        },
        handleMark(labelId) {
            if (labelId === 'star') {
                this.toggleStar();
            } else {
                labelAPI.markLabel(labelId, [this.mail.id]).subscribe({
                    next: () => {
                        const label = this.labelList.filter(item => { if (item.id == labelId) return true })
                        if (!this.mail.labelList.find(item => item.id == labelId)) {
                            this.mail.labelList.push(label[0]);
                        }
                    }
                })
            }
        }
    }
}
</script>

<style>
.tool-bar {
    margin-top: -20px;
    margin-left: -20px;
}

.mail-info {
    background-color: #EFF2F7;
}

.mail-info div {
    font-size: 14px;
    margin: 4px;
}

.mail-info .el-tag {
    margin-right: 6px;
}

.title-info {
    padding: 2px 5px;
}

.mail-title {
    font-size: 18px;
    vertical-align: -3px
}

.detail-mark-star {
    font-size: 18px;
    vertical-align: -3px;
    color: #F08A5D;
    cursor: pointer;
}

.label-item {
    margin-left: 5px;
}

.info-tag {
    margin-left: inherit;
}

.target-board {
    display: inline-block;
}

.send-name,
.target-name {
    color: #1FAB89;
    font-weight: 600;
}

.el-collapse-item__header {
    height: 30px;
    line-height: 30px;
    padding-left: 0;
    color: #20A0FF;
    font-size: 13px;
}

.el-collapse-item__content {
    padding: 2px;
}
</style>
