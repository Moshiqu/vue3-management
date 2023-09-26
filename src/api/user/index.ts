// 统一管理用户相关接口
import request from "@/utils/request";
import type { LoginForm, LoginResponseData, UserInfoResponseData, LogoutResponseData } from '@/api/user/type'

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}

// 暴露请求函数
// 登录
export const reqLogin = (data: LoginForm) => request.post<string, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const reqUserInfo = () => request.get<string, UserInfoResponseData>(API.USERINFO_URL)

// 退出登录
export const reqLogout = () => request.post<string, LogoutResponseData>(API.LOGOUT_URL)