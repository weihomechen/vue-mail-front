<template>
  <div class="app-container">
    <div class="wrapper">
      <el-row>
        <el-col :span="12" :offset="6">
          <p>Welcome~~这是一个基于Vue2的邮件前端系统</p>
          <p>
            更多信息:
            <a
              href="https://github.com/weihomechen/vue-mail-front"
              target="_blank"
            >https://github.com/weihomechen/vue-mail-front</a>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="6">
          <img
            class="welcome-img"
            src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/vue-mail/welcome.gif"
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
.app-container {
  color: #fff;
  background-color: rgb(102, 202, 255);
}
</style>
