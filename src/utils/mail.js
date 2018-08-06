// 邮件通用方法

export function reply(isALL) {
    if (isALL) {
        this.$store.commit('SET_PAGE_TYPE', 'replyAll');
    } else {
        this.$store.commit('SET_PAGE_TYPE', 'reply');
    }
    this.$store.commit('SET_MAIL_TYPE', 'receive');
    this.$router.push({ path: '/mail_send/index' });
}

export function forward() {
    const selectedLen = this.multipleSelection.length || 0;
    if (selectedLen !== 1) {
        this.$message('请选择一封邮件进行转发');
        return;
    }
    this.$store.commit('SET_MAIL_ID', this.multipleSelection[0].id);
    this.$store.commit('SET_PAGE_TYPE', 'forward');
    this.$store.commit('SET_MAIL_TYPE', 'receive');
    this.$router.push({ path: '/mail_send/index' });
}