import Vue from 'vue';
import Router from 'vue-router';

/* layout */
import Layout from '../views/layout/Layout';

/* login */
import Login from '../views/login/';
const authRedirect = () =>
    import('../views/login/authredirect');
const sendPWD = () =>
    import('../views/login/sendpwd');
const reset = () =>
    import('../views/login/reset');

/* dashboard */
const dashboard = () =>
    import('../views/dashboard/index');

/* Introduction */
const Introduction = () =>
    import('../views/introduction/index');

/* error page */
const Err404 = () =>
    import('../views/error/404');
const Err401 = () =>
    import('../views/error/401');

/* error log */
const ErrorLog = () =>
    import('../views/errlog/index');

// mail page
const Inbox = () =>
    import('../views/inbox/index');
const Outbox = () =>
    import('../views/outbox/index');
const DraftBox = () =>
    import('../views/draftbox/index');
const MailSend = () =>
    import('../views/mail_send/index');
const MailDetail = () =>
    import('../views/mail_detail/index');
const MailLabel = () =>
    import('../views/mail_label/index');
const MailList = () =>
    import('../views/mail_list/index');
const MailGroup = () =>
    import('../views/mail_contacts/group');
const ContactList = () =>
    import('../views/mail_contacts/index');
import * as labelAPI from 'api/mail_label';
import * as groupAPI from 'api/mail_group';

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

// 所有权限通用路由表,如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/sendpwd', component: sendPWD, hidden: true },
    { path: '/reset', component: reset, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        hidden: true,
        children: [{ path: 'dashboard', component: dashboard }]
    },
    {
        path: '/introduction',
        component: Layout,
        redirect: '/introduction/index',
        icon: 'question2',
        noDropdown: true,
        children: [{ path: 'index', component: Introduction, name: '简述' }]
    },
    {
        path: '/mail_send',
        component: Layout,
        redirect: '/mail_send/index',
        icon: 'edit2',
        noDropdown: true,
        children: [{ path: 'index', component: MailSend, name: '写信' }]
    },
    {
        path: '/inbox',
        component: Layout,
        redirect: '/inbox/index',
        icon: 'inbox',
        noDropdown: true,
        children: [{ path: 'index', component: Inbox, name: '收件箱' }]
    },
    {
        path: '/outbox',
        component: Layout,
        redirect: '/outbox/index',
        icon: 'outbox',
        noDropdown: true,
        children: [{ path: 'index', component: Outbox, name: '发件箱' }]
    },
    {
        path: '/draftbox',
        component: Layout,
        redirct: '/draftbox/index',
        icon: 'edit3',
        noDropdown: true,
        children: [{ path: 'index', component: DraftBox, name: '草稿箱' }]
    },
    {
        path: '/mail_list',
        component: Layout,
        redirect: '/mail_list/index',
        icon: 'recycle3',
        noDropdown: true,
        children: [{ path: 'index', component: MailList, name: '回收站', meta: { isDeleted: true } }]
    },
    {
        path: '/mail_detail',
        component: Layout,
        redirect: '/mail_detail/index',
        hidden: true,
        children: [{ path: 'index/:mailId?', component: MailDetail, name: '邮件详情' }]
    },
    {
        path: '/mail_list',
        component: Layout,
        redirect: '/mail_list/index',
        hidden: true,
        children: [{ path: 'index/:labelId?', component: MailList, name: '邮件列表' }]
    },
    {
        path: '/mail_contacts',
        component: Layout,
        redirect: '/mail_contacts/index',
        hidden: true,
        children: [{ path: 'index/:groupId?', component: ContactList, name: '联系人列表' }]
    },
    {
        path: '/mail_label',
        component: Layout,
        redirect: '/mail_label/index',
        icon: 'xinrenzhinan',
        hidden: true,
        children: [{ path: 'index', component: MailLabel }]
    }
]

// 实例化vue的时候只挂载constantRouter
export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

// 异步挂载的路由,动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {
        path: '',
        component: Layout,
        redirect: 'noredirect',
        name: '邮件标签',
        icon: 'label7',
        children: [{ path: 'mail_label/index', component: MailLabel, name: '标签管理' }]
    },
    {
        path: '',
        component: Layout,
        redirect: 'noredirect',
        name: '通讯录',
        icon: 'contact5',
        children: [
            { path: 'mail_contacts/group', component: MailGroup, name: '分组管理' },
            { path: 'mail_contacts/index', component: ContactList, name: '所有联系人' }
        ]
    },
    {
        path: '/errorpage',
        component: Layout,
        redirect: 'noredirect',
        name: '错误页面',
        icon: 'warn1',
        children: [
            { path: '401', component: Err401, name: '401' },
            { path: '404', component: Err404, name: '404' }
        ]
    },
    {
        path: '/errlog',
        component: Layout,
        redirect: 'noredirect',
        name: 'errlog',
        icon: 'bug',
        hidden: true,
        noDropdown: true,
        children: [{ path: 'log', component: ErrorLog, name: '错误日志' }]
    },
    { path: '*', redirect: '/404', hidden: true }

];

labelAPI.fetchList().then(res => {
    const labelList = res.data.labelList;
    const labelMenuIndex = asyncRouterMap.findIndex(item => item.name === '邮件标签');
    labelList.forEach(item => {
        asyncRouterMap[labelMenuIndex].children.push({
            path: 'mail_list/index/' + item.id,
            component: MailList,
            name: item.name,
            meta: {
                labelId: item.id
            }
        })
    });
});

groupAPI.fetchList().then(res => {
    const groupList = res.data.groupList;
    const groupMenuIndex = asyncRouterMap.findIndex(item => item.name === '通讯录');
    groupList.forEach(item => {
        asyncRouterMap[groupMenuIndex].children.push({
            path: 'mail_contacts/index/' + item.id,
            component: ContactList,
            name: item.name,
            meta: {
                groupId: item.id
            }
        })
    });
})