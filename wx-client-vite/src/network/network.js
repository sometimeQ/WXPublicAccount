import axios from "axios";
import cache from '@/plugins/cache';
import { saveAs } from 'file-saver';
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus';
import { getToken, diffTokenTime } from '@/utils/token';
import { tansParams, blobValidate } from '@/utils/dtcloud';
import errorCode from '@/utils/errorCode';



// 创建实例
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

const service =  axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 20000,
    headers: {
        'Content-Type' :'application/json;charset=utf-8'}
});

// 拦截器
service.interceptors.request.use((config) => {
    // 是否需要设置token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
        // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers['Authorization'] = 'Bearer ' + getToken() 
        if (diffTokenTime()) {
            store.dispatch('user/layout')
            return Promise.reject(ElMessage('token失效了，请重新登录'));
        }
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }

    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
        const sessionObj = cache.session.getJSON('sessionObj')
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
            cache.session.setJSON('sessionObj', requestObj)
        } else {
            const s_url = sessionObj.url;                // 请求地址
            const s_data = sessionObj.data;              // 请求数据
            const s_time = sessionObj.time;              // 请求时间
            const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = '数据正在处理，请勿重复提交';
                console.warn(`[${s_url}]: ` + message)
                return Promise.reject(new Error(message))
            } else {
                cache.session.setJSON('sessionObj', requestObj)
            }
        }
    }

    return config;
}, error => {
    console.log(error)
    Promise.reject(error)
});


// 响应器
service.interceptors.response.use((res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
}
if (code === 401) {
    if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
        }
        ).then(() => {
            isRelogin.show = false;
            store.dispatch('LogOut').then(() => {
                location.href = '/index';
            })
        }).catch(() => {
            isRelogin.show = false;
        });
    }
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
} else if (code === 500) {
    ElMessage({
        message: msg,
        type: 'error'
    })
    return Promise.reject(new Error(msg))
} else if (code !== 200) {
    ElNotification.error({
        title: msg
    })
    return Promise.reject('error')
} else {
    return Promise.resolve(res.data)
}
});

// 通用下载方法
export function download(url, params, filename) { 
    downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", });
    return service.post(url, params, {
        transformRequest: [(params) => { return tansParams(params) }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
    }).then(async (data) => {
        const isLogin = await blobValidate(data);
        if (isLogin) {
            const blob = new Blob([data])
            saveAs(blob, filename)
        } else {
            const resText = await data.text();
            const rspObj = JSON.parse(resText);
            const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
            ElMessage.error(errMsg);
        }
        downloadLoadingInstance.close();
    }).catch((reason) => {
        console.error(reason)
        ElMessage.error('下载文件出现错误，请联系管理员！');
        downloadLoadingInstance.close();
    })
}

export default service;