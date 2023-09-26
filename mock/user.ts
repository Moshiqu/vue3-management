interface UserType {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token: string;
}

function createUserList(): UserType[] {
    return [
        {
            userId: 1,
            avatar: 'https://ts1.cn.mm.bing.net/th/id/R-C.3562db2b97df44ad0a2913367e923bc9?rik=F0gPEgEKbhChlw&riu=http%3a%2f%2fpic.962.net%2fup%2f2016-10%2f14760807179493223.gif&ehk=1QnaRGwQ3oUxW2TtYQHyQM5fm9qkakLLshGCLtGyzE0%3d&risl=&pid=ImgRaw&r=0',
            username: 'admin1',
            password: '123',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token'
        },
        {
            userId: 1,
            avatar: 'https://img.zcool.cn/community/0165ec5da40068a801204cd0cbf59d.gif',
            username: 'system1',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token'
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',
        method: 'post',
        response: ({ body }) => {
            // 获取请求体携带过来的用户名和密码
            const { username, password } = body;
            const checkUser = createUserList().find(item => item.username === username && item.password === password)
            // 没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: "账号或者密码不正确" } }
            }
            const { token } = checkUser
            return { code: 200, data: { token } }
            // 如果有 返回成功信息
        }
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request: { headers: { token: string; } }) => {
            // 获取请求头携带的token
            const token = request.headers.token;
            // 查看用户信息是否包含有此token用户
            const checkUser = createUserList().find(item => item.token === token)
            if (!checkUser) {
                return { code: 201, data: { message: "获取用户信息失败" } }
            }
            // 如果有 返回成功信息
            return { code: 200, data: { checkUser } }
        }
    }
]