<template>
    <div>{{message}}</div>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { computed, ref } from 'vue';


    console.log('没有请求吗');
    const vStore = useStore();
    let message = ref('');
    vStore.dispatch('testNetwork').then((res) => {
        // console.log(res.message);
        // console.log('康康请求成功了吗');
        message.value = res.message;
    }).catch(error => {
        console.log(error);
    })

</script>

<style>
</style> 