<template>

    <div class="app-wrapper">
        <el-container>
            <!-- 左边侧边栏顶部头像以及标题 -->
            <el-aside :width="flag" class="sidebar-container">
                <div class="header-title">
                    <!-- 头像 -->
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <!-- 标题 -->
                    <div v-if="isShow">公众号管理系统</div>
                </div>
                <!-- 左侧菜单栏 -->
                <Menu />
            </el-aside>
            <!-- 顶部导航栏以及内容区域 -->
            <el-container class="container" :class={hidderContainer:!isShow}>
                <!-- 导航栏 -->
                <el-header class="header-container">
                    <Header />
                </el-header>
                <!-- 内容主体 -->
                <el-main>
                    <!-- 暴露入口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Menu from './menu/index.vue';
import Header from './header/index.vue';


import { computed } from 'vue';
import { useStore } from 'vuex';


const vStore = useStore();
const isShow = computed(() => {
    return vStore.getters['getCollapse'];
})
const flag = computed(() => {
    return vStore.getters['getCollapse'] === true ?  '180px' : '67px';
});

</script>

<style lang="scss" scoped>
    @import "@/assets/styles/variables.module.scss";

    .app-wrapper {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        margin: unset;
    }

    .header-title {
        text-align: center;
        width: 100%;
        height: 80px;
        margin-top: 15px;
        color: #FFFFFF;
    }

    .container {
        width: calc(100% - $sideBarWidth);
        /* width: 100%; */
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        transition: all 0.28s;

        .header-container {
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }

        /* 切换的时候 */
        &.hidderContainer {
            width: calc(100% - $hideSideBarWidth);
        }
    }


</style>