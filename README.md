# vue-mail-front
Welcome~~, 这是一个基于Vue2的邮件前端系统

### 使用
克隆或下载到本地：
```
git clone https://github.com/weihomechen/vue-mail-front.git
```
进入项目，安装依赖包：
```
npm install
# 如果不能科学上网，请使用:
npm install --registry=https://registry.npm.taobao.org
```
启动开发：
```
npm run dev
```
如果一切顺利，项目就会在本地 http://localhost:8081 跑起来了

发布到生产环境：
```
npm run build:prod
```

项目预览地址：

http://rulifun.cn/vue-mail

### 邮件主要模块
- 写信（支持附件、录音、文本编辑）
- 邮件列表
- 邮件详情
- 邮件标签
- 通讯录

### 主要实现
- 基于`Vue2`
- `vuex`管理全局状态
- `vue-router`实现spa导航
- 动态的路由表
- UI布局和一些功能组件使用`element-ui`
- 大部分数据使用`Mock.js`模拟
- 使用`Axios`模拟与后台交互
- 异步编程引入`rxjs`
- 项目初始化（环境配置）使用`Vue-cli`的`webpack`模板

### 效果图

![dashboard&write-mail](http://pbhmcc1rw.bkt.clouddn.com/gif1.gif)

![mail-list](http://pbhmcc1rw.bkt.clouddn.com/gif2.gif)

![mail-list2](http://pbhmcc1rw.bkt.clouddn.com/gif3.gif)

![mail-label](http://pbhmcc1rw.bkt.clouddn.com/gif4.gif)

![mail-contact](http://pbhmcc1rw.bkt.clouddn.com/gif5.gif)

PS: 本项目所有的数据都是模拟的，没有与后端做对接，交互上的一些细节可能也没考虑到。



