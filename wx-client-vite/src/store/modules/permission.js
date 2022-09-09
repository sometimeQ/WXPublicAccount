import { staticRouter } from "@/router";
import Layout from '@/views/layout';
import * as type from './constants';

// 请求后端服务器动态路由
import { getRouters } from '@/network/menu';


// 匹配views文件夹里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const permission = {
    state: {
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRouters: [],
        sidebarRouters: []
    },
    mutations: {
        [type.SET_ROUTES](state, routes) {
            state.addRoutes = routes;
            // 追加到静态路由列表
            state.routes  = staticRouter.concat(routes);
        },
        [type.SET_DEFAULT_ROUTES]: (state, routes) => {
            // 默认路由
            // state.defaultRoutes = staticRouter.concat(routes);
            state.defaultRoutes = routes;
        },
        [type.SET_TOPBAR_ROUTES]: (state, routes) => {
            state.topbarRouters = routes;
        },
        [type.SET_SIDEBAR_ROUTERS](state, routes) {
            state.sidebarRouters = routes;
        }
    },
    actions: {
        // 生成路由
        generateRoutes({commit}, parama) {
            return new Promise((resolve, reject) => {
                // 获取后端请求的路由接口
                getRouters(parama).then((response) => {
                    // const sdata = JSON.parse(JSON.stringify(response));
                    const rdata = JSON.parse(JSON.stringify(response));
                    const defaultData = JSON.parse(JSON.stringify(response));

                    // 处理后端返回的路由
                    const defaultRoutes = filterAsyncRouter(defaultData);
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true);
                    commit(type.SET_ROUTES, rewriteRoutes);
                    commit(type.SET_DEFAULT_ROUTES, defaultRoutes);
                    resolve(rewriteRoutes);
                })
            })
        }
    },
    getters: {
        getRouters: (state) => {
            return state.routes;
        },
        // SET_DEFAULT_ROUTES
        getDefaultRouters: (state) =>{
            return state.defaultRoutes;
        }
    }
}

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 */
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter((route) => {
        // 二级路由
        if (type && route.children) {
            route.children = filterChildren(route.children);
        }
        // 一级路由
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout;
            }
            else if (route.component === 'ParentView') {
                route.component = ParentView;
            }
            else if (route.component === 'InnerLink') {
                route.component = InnerLink;
            }
            else {
                // 引入所有的二级路由
                route.component = loadView(route.component);
            }
        }
        // 递归调用,二级路由 + 
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type);
        } else {
            delete route['children'];
            delete route['redirect'];
        }
        return true;
    })
}

/**
 * 过滤二级路由
 */
function filterChildren(childrenMap, lastRouter = false) {
    let children = [];
    childrenMap.forEach((element, index) => {
        // 三级路由吗？
        if (element.children && element.children.length) {
            if (element.component === 'ParentView' && !lastRouter) {
                element.children.forEach((cc) => {
                    cc.path = element.path + '/' + cc.path;
                    if (cc.children && cc.children.length) {
                        // 继续递归
                        children = children.concat(filterChildren(cc.children, cc))
                        return
                    }
                    children.push(cc);
                })
                return;
            }
        }

        if (lastRouter) {
            element.path = lastRouter.path + '/' + element.path;
        }
        // 追加到数组里面
        children = children.concat(element);
    });
    return children;
}

/**
 * 加载view文件夹下面的页面 ===>  引入() => import("/src/views/tool/build/index.vue");
 */
export const loadView = (view) => {
    let res;
    for (const path in modules) {
        // 获取 "./../../views/appGroup/index.vue"    ==> appGroup/index;
        const dir = path.split('/view')[1].split('.view')[0];
        // view ==>  "tool/build/index"; 后台返回的路由里面的值
        if (dir === view) {
            // modules[path] ========      () => import("/src/views/tool/build/index.vue")
            res = () => modules[path];
        }
    }
    return res;
}


export default permission;

