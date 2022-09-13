<template>
    <div class="changeIcon" @click="iconCliek()">
        <el-icon color="#000" v-if="flag">
            <!-- 图标 -->
            <IconHomeShou />
        </el-icon>
        <el-icon color="#000" v-else>
            <IconHomeClose />
        </el-icon>
    </div>
</template>

<script setup>
    import IconHomeShou from '~icons/home/shouqi';
    import IconHomeClose from '~icons/home/zhankai';
    import { useStore } from 'vuex';
    import { computed } from 'vue';

    
    const vStore = useStore();
    const flag = computed(() => {
        return vStore.getters['getCollapse'];
    })

    console.log('这是取出来的');
    console.log(flag.value);
    console.log('取出来啦');

    const iconCliek = () => {
        vStore.dispatch('setCollapse', !flag.value);
    }


</script>

<style lang="scss" scoped>
    
</style>