// 登录请求
export interface LoginForm {
    password: string;
    username: string;
}

export interface LoginResponseData {
    code: number;
    message: string;
    data: string;
    ok: boolean;
}

// 用户信息请求
export interface UserInfo {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
}

export interface UserInfoResponseData {
    code: number;
    message: string;
    data: UserInfo;
    ok: boolean;
}

// 退出登录请求
export interface LogoutResponseData {
    code: number;
    message: string;
    data: UserInfo;
    ok: boolean;
}
