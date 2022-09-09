<template>
  
    <div class="app-wrapper">
        <el-container >
            <!-- 左边侧边栏顶部头像以及标题 -->
            <el-aside :width="asideWidth" class="sidebar-container">
                <div class="header-title">
                    <!-- 头像 -->
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <!-- 标题 -->
                    <div v-if="flag">公众号管理系统</div>
                </div>  
                <!-- 左侧菜单栏 -->
                <Menu />
            </el-aside>
    </el-container>
    </div>
</template>

<script setup>
import Menu from './menu/index.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';


const vStore = useStore();
const flag = vStore.getters['getCollapse'];

// 动态绑定宽度,点击隐藏 或者显示
const asideWidth = computed(() => {
    return flag === true ? '180px' : '67px';
})


</script>

<style lang="scss" scoped>
    .app-wrapper {
        width: 100%;
        height: 100%;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important;
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

    


</style>