<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">公众号后台管理系统</div>
            <el-form ref="loginAction" :model="parameter" :rules="rules.loginRules" label-width="0px" class="ms-content"
                :loading="loading">
                <el-form-item label="" prop="userName">
                    <el-input v-model="parameter.userName" prefix-icon="el-icon-user" autocomplete="off"
                        style="height: 40px;" clearable placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="" prop="userPassword">
                    <el-input v-model="parameter.userPassword" type="password" prefix-icon="el-icon-lock"
                        style="height: 40px;" clearable placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="submitForm()" style="height: 40px;"> 登陆
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 星空效果部分 -->
        <div class="two">
            <div class="three" v-for="(item, index) in array" :key="index"
                :ref="(item, index) => setSkyRef(item, index)" :data-id="index">
            </div>
        </div>
    </div>
</template>

<!-- https://www.cnblogs.com/rich23/p/9322522.html -->
<!-- https://www.cnblogs.com/rich23/p/9322522.html -->

<script setup>
    import { ref, reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { rules } from '@/utils/rule-config';
    import { ElMessage } from 'element-plus';

    // 网络请求
    const vRouter = useRouter();
    const vStore = useStore();
    // 包裹
    const parameter = reactive({
        userName: '',
        userPassword: ''
    })
    // 获取原生的dom元素
    const loading = ref();
    const loginAction = ref(null);

    // 可以直接return
    let array = Array(800);
    // const stkArray = reactive(array);

    let skyRefs = ref([]);
    // 遍历获取元素，然后放在一个数组里
    const setSkyRef = (item, index) => {
        if (item) {
            // console.log(item.dataset['id'], item);
            skyRefs.value.push(item);
            // skyRefs.set(item.dataset['id'], item); 

            // 随机数
            const speed = 0.2 + Math.random() * 1;
            const thisDistance = 800 + Math.random() * 360;
            // 每一项的样式
            item.style.transformOrigin = `0 0 ${thisDistance}px`;
            item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${speed})`;
        }
    }

    // console.log(skyRefs.value[index]);
    // 根据list数据中的id值 获取对应的dom元素 
    // const el = skyRefs;
    // console.log(skyRefs);

    const submitForm = () => {
        loginAction.value.validate((res) => {
            // 不用加模块名称即可调用
            vStore.dispatch('loginNetwork',  { ...parameter }).then((response) => {
                if (response.code === 200) {
                    console.log('没有跳转吗');
                    // 跳转push操作
                    vRouter.push('/');
                } else {
                    vRouter.push('/login');
                }
            })
        })
    }

// return {
//     parameter,
    // loginAction,
//     rules,
//     loading,
//     array,
//     setSkyRef,
//     submitForm,
// }

</script>

<style lang="scss" scoped>
    .login-wrap {
        width: 100%;
        height: 100%;
        /* background: orange; */
        // 星空图的背景渐变色
        background: radial-gradient(260% 67% at bottom center,
                #32cbc6 10%,
                #63baaa 40%,
                #00838f 65%,
                #263238 130%); 
        overflow: hidden;

        .ms-login {
            width: 380px;
            height: 300px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 15px;
            opacity: 0.9;
    
            .ms-title {
                text-align: center;
                border-bottom: 0.5px solid #cccccc;
                font-size: 20px;
                padding: 20px 30px;
                box-sizing: border-box;
            }
    
            .ms-content {
                padding: 30px 30px;
            }
    
            .login-btn {
                width: 100%;
            }
        }

        .two {
            position: absolute;
            left: 50%;
            transform-style: preserve-3d;
            transition: perspective(500deg);
            perspective-origin: 50% 100%;
            -webkit-perspective-origin: 50% 100%;
            -moz-perspective-origin: 50% 100%;
            /* 动画名称 */
            animation: xinkon 90s linear infinite;
            bottom: -100px;

            .three {
                width: 2px;
                height: 2px;
                background: #fff9c4;
                position: absolute;
                top: 0;
                left: 0;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                -moz-backface-visibility: hidden;
                -ms-backface-visibility: hidden;
            }
        }

        // 根据上面取的动画名称进行动画
        @keyframes xinkon {
            0% {
                transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
            }

            100% {
                transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
            }
        }
    }

    

</style>