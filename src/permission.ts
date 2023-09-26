// 路由鉴权
import router from '@/router'
import NProgress from 'nprogress';
import useUserStore from './store/modules/user';
import { ElNotification } from "element-plus";
import setting from './setting';

// 未登录: 只能访问login, 访问其他路由应跳转到login页面
// 已登录: 不能访问login, 访问login页面, 跳转到/home 首页

// 路由前置守卫
router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    const isLogin = userStore.token
    const userInfo = userStore.userInfo

    // 设置标题
    document.title = `${setting.logo_title}-${to.meta.title}`

    if (isLogin) {
        // 已登录
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (Object.keys(userInfo).length) {
                next()
            } else {
                // 没有用户信息 重新获取用户信息
                try {
                    await userStore.userInfoHandler()
                    next()
                } catch (error) {
                    // token过期 或者 用户手动修改本地储存的token
                    ElNotification({
                        type: 'error',
                        message: (error as Error).message
                    })

                    userStore.logoutHanddler()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        // 未登录
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

// 路由后置守卫
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((_to, _from) => {
    NProgress.done()
})
