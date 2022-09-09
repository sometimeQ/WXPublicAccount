import router from "@/router/";
import store from '@/store/'
import { ElMessage } from "element-plus";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/token';


// 配置进度条
NProgress.configure({ showSpinner: false });

// 白名单 
const whiteList = ['/login', '/register', '/bind', '/auth-redirect'];

// 路由守卫
router.beforeEach((to, from, next) => {
    // 开始进度条
    NProgress.start();

    console.log(getToken());

    if (getToken()) {
        // to.meta.title && store.dispatch('');
        if (to.path  == '/login') {
            next({path: ''});
            NProgress.done();
        } else {
            // 获取角色
            const roles = store.getters["roles"]; 
            // console.log(roles);
            // console.log(store.getters["getToken"] + '阿啦啦啦');

            if (roles.length === 0) {
                // 判断当前的用户是否拉取完成用户信息
                store.dispatch('getUserInfo').then(() => {
                    // 生成动态路由
                    store.dispatch('generateRoutes').then((accessRoutes) => {
                        // console.log(accessRoutes);
                        // 根据roles权限生成可访问的路由表
                        accessRoutes.forEach(route => {
                            // if () {
                                router.addRoute(route);
                            // }
                        })
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                    })
                }).catch((error) => {
                    // 角色信息拉取失败直接返回登陆界面
                    store.dispatch('LogOut').then(() => {
                        ElMessage.error(error);
                        // next({path: '/'})
                    })
                });
            } else {
                // 一旦角色获取完毕就会进入这里直接进去主页
                next();
            }
        }
    }
    else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在白名单，直接进入
            next();
        } else {
            // 重定向到登陆界面
            next('/login');
            NProgress.done();
        }
    }
})