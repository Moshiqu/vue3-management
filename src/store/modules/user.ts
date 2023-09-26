import { defineStore } from 'pinia';
import { ref, reactive } from "vue";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user/index";
import { LoginForm, UserInfo } from '@/api/user/type';
import { UserState } from "./types/type"
import { constantRouters } from '@/router/router';

const useUserStore = defineStore("User", (): UserState => {
    const token = ref(localStorage.getItem('TOKEN'))

    const loginHandler = async (data: LoginForm) => {
        const result = await reqLogin(data)
        if (result.code === 200) {
            token.value = (result.data as string)
            localStorage.setItem('TOKEN', token.value)
            return Promise.resolve('success')
        } else {
            return Promise.reject(new Error(result.data))
        }
    }

    // 登录成功 获取用户信息
    const userInfo = ref({} as UserInfo)
    const userInfoHandler = async () => {
        const { code, data, message } = await reqUserInfo()
        if (code === 200) {
            userInfo.value = data
            return Promise.resolve('success')
        } else {
            return Promise.reject(new Error(message))
        }
    }

    // 退出登录 清空用户信息
    const logoutHanddler = async () => {
        const { code, message } = await reqLogout()

        if (code === 200) {
            localStorage.clear()
            token.value = null
            userInfo.value = {} as UserInfo
            return Promise.resolve('success')
        } else {
            return Promise.reject(new Error(message))
        }
    }

    return {
        token,
        userInfo,
        menuRouter: reactive(constantRouters),
        loginHandler,
        userInfoHandler,
        logoutHanddler
    }
})

export default useUserStore