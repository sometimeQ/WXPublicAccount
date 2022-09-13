<template>
    <div class="nav">
        <div class="nav-left">
            <HeaderLeft />
        </div>
        <div class="nav-right">
            <HeaderRight />
        </div>
    </div>
</template>


<script setup>  
    import HeaderLeft from '@/components/header/HeaderLeft.vue';
    import HeaderRight from '@/components/header/HeaderRight.vue';

</script>


<style lang="scss" scoped>
    .nav {
       width: 100%;
       height: 100%;
       line-height: 100%;
       display: flex;
       align-items: center;
       justify-content: space-between;

        .nav-left {
            
            
        }

        .nav-right {
 
        }
    }
</style>