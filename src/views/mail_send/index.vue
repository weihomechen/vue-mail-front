<template>
    <div v-loading.body="loading" class="app-container calendar-list-container">
        <el-row :gutter="10">
            <el-col :span="2">
                <el-tag class="target-label" color="#36c6d3">
                    收件人<icon-svg icon-class="add-user4" class="add-user"/>
                </el-tag>
            </el-col>
            <el-col :span="20">
                <multiselect v-model="target" :options="contacts" :multiple="true" :taggable="true" @tag="addContact" :clear-on-select="false" :hide-target="true" placeholder="请选择或输入联系人" label="show" track-by="mail"></multiselect>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" @click="cleanTarget">清空</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="2">
                <el-tag class="target-label" color="#36c6d3">
                    抄送<icon-svg icon-class="add-user4" class="add-user"/>
                </el-tag>
            </el-col>
            <el-col :span="20">
                <multiselect v-model="copy" :options="contacts" :multiple="true" :taggable="true" @tag="addContact" :clear-on-select="false" :hide-target="true" placeholder="请选择或输入联系人" label="show" track-by="mail"></multiselect>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" @click="cleanCopy">清空</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2">
                <el-tag class="target-label" color="#36c6d3">主题
                </el-tag>
            </el-col>
            <el-col :span="20">
                <el-input v-model="mail.title" placeholder="请输入主题"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span='12'>
                <el-upload class="upload-file" :before-upload="handleBefore" :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove" :show-file-list="true" :file-list="mail.oldFileList" drag action="https://httpbin.org/post" multiple>
                    <i class="el-icon-upload"></i>
                    <i class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </i>
                </el-upload>
                <ul v-show="!!mail.oldFileList.length" class="old-file-list"></ul>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" :disabled="isRecording" @click="startRecorder" size="small">开始录音</el-button>
                <el-button type="primary" :disabled="!isRecording" @click="stopRecorder" size="small">结束录音</el-button>
                <ul v-show="!!mail.oldAudioList.length" class="old-audio-list">
                    <li v-for="(audio, index) in mail.oldAudioList">
                        <audio :src="audio.url" controls></audio>
                        <a class="old-audio-name" :href="audio.url" download>{{audio.name}}</a>
                        <icon-svg icon-class="delete11" class="del-audio" @click.native="delOldAudio(index)" />
                    </li>
                </ul>
                <ul class="audio-list">
                    <li v-for="(audio, index) in mail.audioList">
                        <audio :src="audio.url" controls></audio>
                        <el-input class="audio-name" v-model="audio.name" size="small"></el-input>
                        <icon-svg icon-class="delete11" class="del-audio" @click.native="delAudio(index)" />
                    </li>
                </ul>
            </el-col>
        </el-row>
    
        <div class="editor-container">
            <Tinymce :id="editorId" :height=editorHeight ref="editor" v-model="mail.content"></Tinymce>
        </div>
    
        <el-row>
            <el-col :span="12" :offset="9">
                <el-button type="primary" @click="sendSubmit">发送</el-button>
                <el-button type="primary" @click="saveAsDraft">保存</el-button>
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
import Tinymce from "components/Tinymce";
import * as contactsAPI from "api/mail_contacts";
import * as mailSendAPI from "api/mail_send";
import * as mailDetailAPI from "api/mail_detail";
import { isEmail, isEmpty, getType } from "utils/validate";
import { getNowFormatDate, parseTime } from "utils";
import { Observable } from "rxjs/Observable";

export default {
  name: "mail_send",
  components: { Tinymce },
  data() {
    return {
      loading: true,
      mail: {
        title: "",
        oldFileList: [],
        oldAudioList: [],
        content: "",
        target: [],
        copy: [],
        fileList: [],
        audioList: []
      },
      date: "",
      target: [],
      copy: [],
      isRecording: false,
      recorder: null,
      contacts: [],
      editorId: "mail_send_ediotr",
      editorHeight: null,
      timing: ""
    };
  },
  created() {
    this.initSendPage();
  },
  methods: {
    initSendPage() {
      this.getContacts().subscribe({
        next: () => {
          this.getContent();
        }
      });
      this.editorHeight = window.innerHeight - 420;
    },
    getContacts() {
      this.loading = true;
      return Observable.create(observer => {
        contactsAPI.fetchList().then(res => {
          res.data.contacts.forEach(item => {
            item.show = item.name + "<" + item.mail + ">";
          });
          this.contacts = res.data.contacts;
          this.loading = false;
          observer.next();
        });
      });
    },
    getContent() {
      const pageType = this.$store.getters.pageType;
      const mailId = this.$store.getters.mailId || this.$store.getters.draftId;
      const mailType = this.$store.getters.mailType;
      if (pageType && pageType !== "add") {
        mailDetailAPI.fetchDetail({ mailId, mailType }).then(res => {
          // 设定字段时要慎重，两边字段不匹配好累啊
          const detail = res.data;
          this.mail.title = detail.title;
          this.mail.content = detail.content;
          this.mail.oldFileList = detail.oldFileList;
          this.mail.oldAudioList = detail.oldAudioList;
          this.date = detail.receiveDate || detail.sendDate;
          let receiveStr = "";
          detail.target.forEach(item => {
            item.show = item.name + "<" + item.mail + ">";
            receiveStr += item.show + ";";
          });
          let copyStr = "";
          detail.copy.forEach(item => {
            item.show = item.name + "<" + item.mail + ">";
            copyStr += item.show + ";";
          });
          const sender = {
            name: detail.sender,
            mail: detail.sendMail,
            show: detail.sender + "<" + detail.sendMail + ">"
          };
          switch (pageType) {
            case "reply":
              this.mail.title = "回复：" + this.mail.title;
              this.addContentHeader(sender.show, receiveStr, copyStr);
              this.target.push(sender);
              break;
            case "replyAll":
              this.mail.title = "回复：" + this.mail.title;
              this.addContentHeader(sender.show, receiveStr, copyStr);
              this.target = [sender].concat(detail.target, detail.copy);
              break;
            case "edit":
              this.target = detail.target;
              this.copy = detail.copy;
              break;
            case "forward":
              this.mail.title = "转发" + this.mail.title;
              this.addContentHeader(sender.show, receiveStr, copyStr);
              break;
            default:
          }
        });
      } else if (pageType && pageType === "add") {
        const target = this.$store.getters.target;
        if (target) {
          if (target === "all") {
            this.target = this.contacts;
          } else {
            target.forEach(
              item => (item.show = item.name + "<" + item.mail + ">")
            );
            this.target = target;
          }
          this.$store.commit("SET_TARGET", null);
        }
      }
    },
    addContentHeader(sender, receiveStr, copyStr) {
      const header = `<p><span>------------------------ &nbsp; 原始邮件&nbsp;------------------------</span></p>
                <div style="background: #e4eaef"><br>
                <p>&nbsp;<strong>发件人:</strong>${sender}</p>
                <p>&nbsp;<strong>时间:&nbsp;&nbsp;&nbsp;</strong>${parseTime(
                  this.date
                )}</p>
                <p>&nbsp;<strong>收件人:</strong>${receiveStr}</p>
                <p>&nbsp;<strong>抄送:&nbsp;&nbsp;&nbsp;</strong>${copyStr}</p>
                <p>&nbsp;<strong>主题:&nbsp;&nbsp;&nbsp;</strong>${
                  this.mail.title
                }</p>
                <p><br/></p>
                </div>`;
      this.mail.content = header + this.mail.content;
    },
    addContact(newTag) {
      if (!isEmail(newTag)) {
        this.$message({
          showClose: true,
          message: "输入的邮箱不合法",
          type: "warning",
          duration: 1200
        });
        return;
      }
      const tag = {
        name: newTag,
        show: newTag,
        mail: newTag
      };
      this.contacts.push(tag);
      this.target.push(tag);
    },
    cleanTarget() {
      this.target = [];
    },
    cleanCopy() {
      this.copy = [];
    },
    handleBefore(file) {
      // 上传前可以对要上传文件进行控制
    },
    handleSuccess(file, fileInfo) {
      this.mail.fileList.push({
        name: fileInfo.name,
        uuid: fileInfo.uid,
        url: fileInfo.url
      });
    },
    handlePreview(file) {
      // 预览,一些文件因为格式问题无法预览。推荐使用a标签，src为文件的下载地址，点击即可下载,参照录音
      window.open(file.url);
    },
    handleRemove(file) {
      // 移除
      this.mail.fileList.forEach((item, index) => {
        if (item.uuid === file.uid) {
          this.mail.fileList.splice(index, 1);
        }
      });
    },
    startRecorder() {
      Recorder.get(rec => {
        this.recorder = rec;
        this.recorder.start();
        this.isRecording = true;
      });
    },
    stopRecorder() {
      this.recorder.stop();
      this.isRecording = false;
      this.mail.audioList.push({
        name: getNowFormatDate(),
        blob: this.recorder.getBlob(),
        url: window.URL.createObjectURL(this.recorder.getBlob())
      });
    },
    delOldAudio(index) {
      this.mail.oldAudioList.splice(index, 1);
    },
    delAudio(index) {
      this.mail.audioList.splice(index, 1);
    },
    sendSubmit() {
      if (this.target.length < 1) {
        this.$message({
          showClose: true,
          message: "收件人不能为空",
          type: "warning",
          duration: 1200
        });
        return;
      }
      // 添加到formData前应该根据需求处理数据
      this.target.forEach(item => {
        this.mail.target.push(item.mail);
      });
      this.copy.forEach(item => {
        this.mail.copy.push(item.mail);
      });
      const mailForm = new FormData();
      this.appendToFormData(mailForm, this.mail);
      const mailDTO = mailForm;
      this.loading = true;
      mailSendAPI.sendMail(mailDTO).subscribe({
        next: () => {
          this.$message({
            type: "success",
            message: "发送成功",
            duration: 1200
          });
          this.loading = false;
          this.initMail();
        },
        error: () => {
          this.$message({
            type: "error",
            message: "发送失败",
            duration: 2000
          });
          this.loading = false;
        }
      });
    },
    saveAsDraft() {
      // 添加到formData前应该根据需求处理数据
      this.target.forEach(item => {
        this.mail.target.push(item.mail);
      });
      this.copy.forEach(item => {
        this.mail.copy.push(item.mail);
      });
      const mailForm = new FormData();
      this.appendToFormData(mailForm, this.mail);
      const mailDTO = mailForm;
      this.loading = true;
      mailSendAPI
        .saveAsDraft(mailDTO)
        .subscribe({
          next: () => {
            this.loading = false;
            this.$message("保存成功");
          }
        })
        .catch();
    },
    // 添加到formData，需要符合formData的格式
    appendToFormData(form, data) {
      // 遍历要添加的字段
      Object.keys(data).forEach(field => {
        // 如果该字段的值是对象
        if (typeof data[field] === "object") {
          if (!isEmpty(data[field])) {
            // 且不为空
            debugger;
            if (getType(data[field]) === "Array") {
              // 数组对象
              data[field].forEach((item, index) => {
                if (getType(item) === "Object") {
                  // 数组项如果还是对象
                  // 遍历数组项的属性
                  Object.keys(item).forEach(itemField => {
                    form.append(
                      field + "[" + index + "]." + itemField,
                      item[itemField]
                    );
                  });
                } else {
                  form.append(field + "[" + index + "]", item);
                }
              });
            } else {
              // 非数组的对象
              debugger;
              Object.keys(data[field]).forEach(fieldKey => {
                form.append(field + "." + fieldKey, data[field][fieldKey]);
              });
            }
          }
        } else {
          // 最简单的情况，字段值非对象，直接append
          form.append(field, data[field]);
        }
      });
    },
    initMail() {
      for (const field in this.mail) {
        if (getType(this.mail[field]) === "String") {
          this.mail[field] = "";
        } else if (getType(this.mail[field]) === "Array") {
          this.mail[field] = [];
        }
      }
      this.target = [];
      this.copy = [];
      // 编辑器内容与mail.content是双向绑定，上一步中mail.content = ''不知道为什么并没有将编辑器内容清空
      tinymce.get(this.editorId).setContent("");
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}

audio {
  width: 260px;
}

.tool-bar {
  margin-top: -20px;
  margin-left: -20px;
}

.el-row {
  margin-bottom: 10px;
}

.target-label {
  font-size: 14px;
  padding: 0px 12px;
  margin: 2px 0;
  height: 35px;
  line-height: 35px;
}

.target-label i {
  margin-left: 3px;
}

.upload-file {
  display: inline-block;
  vertical-align: middle;
}

.el-upload-dragger {
  height: 30px;
}

.el-upload-dragger .el-icon-upload {
  font-size: 30px;
  line-height: 20px;
  margin: 3px 0;
}

.audio-name {
  width: 200px;
  vertical-align: 12px;
}

.audio-list >li {
  display: flex;
  align-items: center;
}

.del-audio {
  margin-left: 5px;
  cursor: pointer;
  vertical-align: 10px;
  font-size: 20px;
  color: #00adb5;
}

.send-btn {
  margin-top: 10px;
  margin-right: 60px;
}

.cancel-btn {
  margin-top: 10px;
}

.old-audio-name {
  vertical-align: 10px;
}
</style>

