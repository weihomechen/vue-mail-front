const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    uid: state => state.user.uid,
    email: state => state.user.email,
    introduction: state => state.user.introduction,
    auth_type: state => state.user.auth_type,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    // mail
    mailId: state => state.mail.mailId,
    draftId: state => state.mail.draftId,
    pageType: state => state.mail.pageType,
    mailType: state => state.mail.mailType,
    target: state => state.mail.target
};
export default getters
