<!--
 * login
 * @since: 2023-08-18
 * login.vue
-->
<template>
    <div class="login_page">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form :model="loginForm" ref="loginFormRef" class="login_form" :rules="loginFormRules">
                    <el-form-item>
                        <h1 class="title">Vue3-Demo</h1>
                    </el-form-item>
                    <el-form-item label="" prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入账号" clearable :prefix-icon="User"
                            :disabled="isLoading" />
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" :prefix-icon="Lock"
                            show-password :disabled="isLoading" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" class="login_btn" auto-insert-space
                            :loading="isLoading" :disabled="isLoading"
                            :style="{ cursor: `${isLoading ? 'not-allowed' : 'default'}` }">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user';
import { ElNotification } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance } from 'element-plus'

const loginForm = reactive({
    username: 'admin',
    password: 'atguigu123'
})

const validatePass = (_rule: any, value: any, callback: any) => {
    if (value === '' || value.length < 3 || value.length > 12) {
        callback(new Error('密码长度不能小于3位字符或者大于12位字符'))
    } else {
        callback()
    }
}

const loginFormRules = {
    username: [
        { required: true, min: 3, max: 12, message: '用户名长度范围为3-12位字符', trigger: 'change' },
    ],
    password: [
        { validator: validatePass, trigger: 'change' }
    ]
}

const isLoading = ref(false)

// 获取 上午|下午|晚上|凌晨
const getTimeScope = () => {
    const hour = new Date().getHours()
    let timeScope = ''
    if (hour >= 6 && hour < 12) {
        timeScope = '上午'
    } else if (hour >= 12 && hour < 18) {
        timeScope = '下午'
    } else if (hour >= 18 && hour < 24) {
        timeScope = '晚上'
    } else {
        timeScope = '凌晨'
    }
    return timeScope
}

const userStore = useUserStore()

const $router = useRouter()
const $route = useRoute()

const loginFormRef = ref<FormInstance>()

// 登录提交事件
const submitForm = async () => {
    if (!loginFormRef.value) return
    await loginFormRef.value.validate((valid) => {
        if (valid) {
            onSubmit()
        }
    })
}

// 登录请求事件
const onSubmit = async () => {
    isLoading.value = true
    // 登录页携带重定向参数, 登录成功后直接跳转到指定路由
    const queryRedirect = $route.query.redirect as string;

    try {
        await userStore.loginHandler(loginForm)
        ElNotification({
            type: 'success',
            title: `Hi, ${getTimeScope()}好`,
            message: '欢迎回来',
            duration: 1000
        })
        $router.push({ path: queryRedirect || '/' })
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message,
            duration: 1000
        })
    }
    isLoading.value = false
}

defineOptions({
    name: 'Login'
})
</script>

<style scoped lang="scss">
.login_page {
    background: url('@/assets/images/background-home.jpg') no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;

    .login_form {
        position: relative;
        width: 45%;
        top: 40vh;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #fff;
        padding: 40px;
        border-radius: 10px;

        .title {
            font-size: 36px;
            text-align: center;
            font-weight: 700;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }

        :deep(.el-input) {
            height: 36px;
            font-size: 20px;
        }

        :deep(.el-input .el-input__icon) {
            font-size: 20px;
        }

        .login_btn {
            height: 40px;
            font-size: 24px;
            width: 100%;
        }
    }
}
</style>