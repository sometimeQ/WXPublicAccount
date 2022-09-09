import { createApp } from 'vue';
import Cookies from 'js-cookie';
import App from './App.vue';
import ElementPlus from 'element-plus';
// 全局引入中文语言
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import store from './store';
import './assets/styles/index.scss';
import './assets/styles/public.scss';
// 动态路由, 防止刷新无
import './router/permission';


// 拆分
const app = createApp(App);
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 使用i18n,双语
// import i18n from '@/i18n';
app.use(router)
app.use(store)
// app.use(i18n)
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})
app.mount('#app')
