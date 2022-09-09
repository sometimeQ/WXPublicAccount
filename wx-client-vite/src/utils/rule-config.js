export const rules = {
    // prop就是绑定的这个
    loginRules: {
        userName: [
            {
                validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入用户名'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            },
            {
                min: 4,
                max: 9,
                message: '用户名长度在 4 到 9 个字符',
                trigger: 'blur'
            }
        ],
        // pass跟校验规则里面的pass 一样
        userPassword: [
            {
                validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入密码'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            },
            {
                min: 4,
                max: 9,
                message: '密码长度在 4 到 9 个字符',
                trigger: 'blur'
            }
        ]
    },
    accountRules: {
        keyId: [
            {
                validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入keyId'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            },
            {
                min: 10,
                max: 1000,
                message: 'keyId 大于10个字符',
                trigger: 'blur'
            }
        ],
        // pass跟校验规则里面的pass 一样
        issuerId: [
            {
                validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入issuerId'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            },
            {
                min: 20,
                max: 1000,
                message: 'issuerId 大于20个字符',
                trigger: 'blur'
            }
        ],
        privateKey: [
            {
                validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入privateKey'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            },
            {
                min: 50,
                max: 1000,
                message: 'privateKey 大于50个字符',
                trigger: 'blur'
            }
        ]
    }
}