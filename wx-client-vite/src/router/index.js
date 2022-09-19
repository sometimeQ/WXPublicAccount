import {createWebHashHistory, createWebHistory, createRouter} from 'vue-router';
import Layout from '@/views/layout';

// 静态路由
export const staticRouter = [
    {
        name: '/',
        path: '/', // 根目录路由
        component: Layout, 
        redirect: '/', // 重定向到home页面
        hiddren: true,
        children: [
            {
                path: '/', // 子路径
                name: 'home',
                component: () => import('@/views/home'),
                meta: {
                    title: '首页',
                    access: 0,
                    affix: true,
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import('@/views/login'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: staticRouter,
    // 使用浏览器的回退或者前进时，重新返回时保留页面滚动位置，跳转页面的话，不触发。
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return {top: 0}
        }
    }
})

export default router;