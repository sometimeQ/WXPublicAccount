
import * as type from './constants';
import { 
    SET_TOKEN
} from './constants'
import { getToken, deleteToken, setToken, setTokenTime } from  '@/utils/token';
import { ElMessage } from "element-plus";
import router from "@/router";
import { login, getUserInfo, layout, testDemo, testUpdate, testUserData } from "@/network/login";


const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permission: [],
        post:  '',
        collapse: true
    },
    mutations: {
        [type.SET_TOKEN](state, token) {
            state.token = token;
        },
        [type.SET_NAME](state, name) {
            state.name = name;
        },
        [type.SET_AVATAR](state, avatart) {
            state.avatar = avatart;
        },
        [type.SET_ROLES](state, roles) {
            state.roles = roles;
        },
        [type.SET_PERMISSION](state, permission) {
            state.permission = permission;
        },
        [type.SET_USERPOST](state, post) {
            state.SET_USERPOST = post;
        },
        [type.SET_COLLAPSE](state, flag) {
            state.collapse = flag;
        }
    },
    actions: {
        // 模拟登陆
        loginNetwork: ({ commit }, paramater) => {
            console.log(paramater);
            const username = paramater.userName.trim();
            const password = paramater.userPassword;
            const code = '1234';
            const uuid = 'userInfo.uuid';
            
            return new Promise((resolve, reject) => {
                // 网络请求
                login({ "username": username, "password": password, "code": code, "uuid": uuid }).then((response) => {
                    console.log(response);
                    if (response.code == 200) {
                        ElMessage({
                            message: response.msg,
                            type: 'success',
                        });

                        setToken(response.data.token);
                        setTokenTime();
                        commit(type.SET_TOKEN, response.data.token);
                        resolve(response);
                    } else {
                        ElMessage({
                            message: response.msg,
                            type: 'error',
                        })
                    }
                })
            })
        },
        // 获取用户信息
        getUserInfo: ({ commit }, parama) => {
            return new Promise((resolve, reject) => {
                // 调取接口
                getUserInfo().then(res => {
                    const user = res.user;
                    const avatar = (user.avatar == "" || user.avatar == null) ? '默认图片' : import.meta.env.VITE_APP_BASE_API + user.avatar;
                    if (res.roles.length > 0 && res.roles) {
                        // 提交
                        commit(type.SET_ROLES, res.roles);
                        commit(type.SET_PERMISSION, res.permission);
                    } else {
                        commit(type.SET_ROLES, ['permission']);
                    }
                    commit(type.SET_NAME, user.username);
                    commit(type.SET_AVATAR, avatar);
                    commit(type.SET_USERPOST, user.userPost);
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                })
            });
        },
        // 退出登录
        LogOut: ({ commit, state }, parama) => {
            return new Promise((resolve, reject) => {
                layout(state.token).then((response) => {
                    // 清空token
                    commit(type.SET_TOKEN, '');
                    deleteToken();
                    localStorage.clear();
                    commit(type.SET_ROLES,  ['']);
                    commit(type.SET_PERMISSION, ['']);
                    resolve(response);
                    // 跳转到登陆也
                    router.push('/login');
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        setCollapse:({ commit, state }, flag) => {
            // console.log(flag);
            commit(type.SET_COLLAPSE, flag);
        },
        testNetwork:({ commit, state }, parama) => {
            return new Promise((resolve, reject) => {
                testDemo().then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        testUpdate:({ commit, state }, parama) => {
            return new Promise((resolve, reject) => {
                testUpdate().then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        testUserData:({ commit, state }, parama) => {
            return new Promise((resolve, reject) => {
                testUserData().then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    },
    getters: {
        roles: (state) => {
            return state.roles
        },
        getToken(state) {
            return state.token;
        },
        getCollapse:(state) => {
            return state.collapse;
        }
    }
}

export default user;