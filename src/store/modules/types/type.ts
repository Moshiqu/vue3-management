import { LoginForm, UserInfo } from '@/api/user/type';
import { Ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
    token: Ref<string | null>,
    userInfo: Ref<UserInfo>,
    loginHandler: (data: LoginForm) => Promise<string>
    logoutHanddler: () => Promise<string>
    userInfoHandler: () => Promise<string>
    menuRouter: RouteRecordRaw[]
}