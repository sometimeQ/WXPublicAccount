import service from "./network";

/**
 * 登陆, 模拟后端返回的登陆 信息
 */
export function login(paramater) {
    console.log(paramater);
    const { username, password, code, uuid } = paramater;
    return new Promise((resolve, reject) => {
        if (username  === 'admin' && password && code === '1234' && uuid) {
            const data = {
                code: 200,
                data: {
                    data: [1, 2, 3, 4],
                    token: '12222223djfkajf',
                },
                msg: "请求成功"
            };
            resolve(data);
        } else {
            const data = {
                code: 0,
                data: {
                    data: [1, 2,],
                    token: 'xxxxxxxxxxxx1111111111',
                },
                msg: "请求失败了吗？"
            };
            resolve(data);
        }
    })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return new Promise((resolve, reject) => {
        const data = {
            code: 200,
            user: {
                avatar: "",
                username: "admin",
                userPost: "未知字段"
            },
            roles: ['admin'],
            permission: ['允许操作'],
            msg: "获取用户信息成功"
        }
        resolve(data);
    })
}

/**
 * 退出登录
 */
export function layout(token) {
    return new Promise((resolve, reject) => {
        if (token) {
            resolve('退出登录成功')
        } else {
            reject('')
        }
    })
};

/**
 * 测试
 */
export function testDemo() {
    // return new Promise((resolve, reject) => {
        return service({
            url: '/test',
            method: 'get',
            params: {}
        })
    // })
}

export function testUpdate() {
    return service({
        url: '/update',
        method: 'get',
        params: {}
    });
}

export function testUserData() {
    return service({
        url: '/user',
        method: 'get',
        params: {}
    });
}
