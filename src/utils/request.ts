import axios from 'axios';
import { ElMessage } from 'element-plus';
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径会携带/api
    timeout: 5000, // 请求超时
})

// request实例添加请求,请求拦截器
request.interceptors.request.use((config) => {
    NProgress.start()
    // 配置config对象
    // headers请求头添加token字段
    const token = localStorage.getItem('TOKEN')
    if (token) {
        config.headers.token = token
    }
    return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调
    // 关闭进度条
    NProgress.done()

    return response.data
}, (error) => {
    // 失败回调 处理http网络请求错误
    let errorMsg = ''
    const status = error.response.status
    switch (status) {
        case 401:
            errorMsg = 'Token过期'
            break;
        case 403:
            errorMsg = '无权访问'
            break;
        case 404:
            errorMsg = '地址错误'
            break;
        case 500:
            errorMsg = '服务出错'
            break;

        default:
            errorMsg = '网络出错'
            break;
    }

    ElMessage({
        type: "error",
        message: errorMsg
    })

    // 关闭进度条
    NProgress.done()

    return Promise.reject(error)
})

export default request