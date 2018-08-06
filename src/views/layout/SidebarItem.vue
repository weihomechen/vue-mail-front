<template>
    <div>
        <template v-for="item in routes">
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :index="item.path+'/'+item.children[0].path" @click="menuClick(item)">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
                </template>
                <template v-for="child in item.children" v-if='!child.hidden'>
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            {{child.name}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>

export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    },
    methods: {
        menuClick(menu) {
            // todo: 点击写信菜单时要设置store.state.pageType为add，暂时在这里提交变化
            if (menu.path === '/mail_send') {
                this.$store.commit('SET_PAGE_TYPE', 'add');
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.icon {
    margin-right: 10px;
}

.hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
}
</style>

