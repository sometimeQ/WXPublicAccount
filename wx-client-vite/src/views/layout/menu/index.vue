<template>
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        active-text-color="#ffd04b"
        text-color="#ffff"
        :default-active="defaultActive || defaultRouter"
        :collapse="!flag" 
        unique-opened
        router
        >
        <!-- 遍历动态路由菜单栏 -->
        <template v-for="(item, index) in menusList">
            <!-- 含有二级路由的菜单 -->
            <!-- 为什么大于1，因为返回的动态数组里面有多个children, 自己按需处理 -->
            <el-sub-menu v-if="item.children && item.children.length > 1" :index="(index).toString()" :key="index">
                <!-- 标题and图标 等价于 <template v-slot:title> 具名插槽 -->
                <template #title>
                    <el-icon>
                        <!-- 动态组件 component：is='xxx' -->
                        <component :is="iconList[index]"></component>
                    </el-icon>
                    <span>{{ item.meta && item.meta.title }}</span>
                </template>
                <!-- 子标题 -->
                <el-menu-item v-for="(iteny, indey) in item.children" :key="indey" 
                    :index="item.path + '/' + iteny.path" @click="itemClick(item.path, iteny.path)">
                    <!-- 二级标题 -->
                    <template #title>
                        <el-icon>
                            <component :is="twoIcon[indey]"></component>
                        </el-icon>
                        <!--  -->
                        <span>{{ iteny.meta.title }}</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>
            <!-- 只有一级路由的子菜单, 因为里面有很多个子菜单 -->
             <el-menu-item v-else :index="item.children[0].path" :class="{ backgc: defaultActive === '/' + item.children[0].path }" :key="item.children[0].path" @click="itemClick(item.children[0].path)" >
                <!-- 超出文字提示，比如折叠的时候 -->
                <el-tooltip>
                    <el-icon>
                        <component :is="iconList[index]"></component>
                    </el-icon>
                </el-tooltip>
                <span>{{ item.meta.title }}</span>
             </el-menu-item>
        </template>
    </el-menu>
</template>


<script setup> 
    import { computed, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';


    // 一级路由图标列表
    const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart', 'Bell', 'checked', 'chicken', 'coin']);
    // 二级路由图标列表
    const twoIcon = ref(['menu', 'Edit', 'Files', 'folder', 'fold']);
    const vStore = useStore();
    const router = useRouter();
    const menusList = ref([]);
    const defaultActive = ref('');
    // 默认，或者之前点击存入的路由路径
    const defaultRouter = ref(sessionStorage.getItem('path') || '/tool/buid');

    // 菜单数组列表
    const flag = computed(() => {
        return vStore.getters['getCollapse'];
    })
    const routers = vStore.getters['getDefaultRouters'];
    // console.log(routers);
    menusList.value = routers;

    // 观察路由变化
    watch(router, () => {
        defaultActive.value = router.matched && router.matched[1] && router.matched[1].path;
    })
    
    // 保存当前点击的路由路径，设置颜色
    const itemClick = (item, iteny) => {
       if (item && iteny) {
            console.log(item, iteny);
            // 含有二级路由的
           sessionStorage.setItem('path', `${item}/${iteny}`);
        } else {
            console.log(item);
            sessionStorage.setItem('path', `${item}`);
            // 跳转
            router.currentRoute.value.path = '';
            router.push(`/${item}`);
     }
    }

</script>

<style lang="scss" scoped>
    .backgc {
        color: #ffd04b;
    }   
</style>