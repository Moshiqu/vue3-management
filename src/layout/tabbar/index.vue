<!--
 * 顶部导航栏
 * @since: 2023-08-26
 * index.vue
-->
<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <!-- 侧边栏收放图标 -->
            <el-icon @click="$emits('collapseHandler')" class="collapse_icon" :title="isCollapse ? '展开' : '收起'">
                <component :is="isCollapse ? 'Expand':'Fold'"></component>
            </el-icon>

            <!-- 面包屑导航 -->
            <el-breadcrumb separator=">" style="margin-left: 10px;">
                <el-breadcrumb-item :to="machedRoute.path" v-for="machedRoute in $route.matched" :key="machedRoute.path"
                    v-show="machedRoute.meta.title">
                    <template #default>
                        <icon class="breadcrumb_icon">
                            <component :is="machedRoute.meta.icon" />
                        </icon>
                        {{ machedRoute.meta.title }}
                    </template>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button :icon="Refresh" circle @click="layoutSettingStore.refreshHandler" />
            <el-button :icon="FullScreen" circle @click="fullScreenHandler" />
            <el-button :icon="Setting" circle />
            <img :src="userStore.userInfo.avatar" class="tabbar_avatar">
            <el-dropdown class="tabbar_dropdown">
                <span class="el-dropdown-link">
                    {{ userStore.userInfo.name }}
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';

// 侧边栏展开与缩放
defineProps(['isCollapse'])
const $emits = defineEmits(['collapseHandler'])

// 面包屑导航
const $route = useRoute()

// 刷新二级路由按钮
const layoutSettingStore = useLayoutSettingStore()

// 全屏按钮
const fullScreenHandler = () => {
    // document的一个属性, 用于判断是否为全屏[全屏:true, 非全屏: null(false)]
    let isFullScreen = document.fullscreenElement
    isFullScreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
}

// 从仓库获取userStore的用户信息 如果没有用户信息,则重新请求用户信息接口
const userStore = useUserStore()
const $router = useRouter()

// 退出登录
const logoutHandler = async () => {
    // 清空userStore
    await userStore.logoutHanddler()
    // 返回登录页面 
    $router.push('/login')
}

defineOptions({
    name: 'tabbar'
})
</script>

<style scoped lang="scss">
.tabbar {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 10px;
    user-select: none;

    .tabbar_left {
        display: flex;
        align-items: center;

        .collapse_icon {
            cursor: pointer;
        }

        .breadcrumb_icon {
            margin-right: 5px;
            width: 20px;
        }

        :deep(.el-breadcrumb__inner) {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .tabbar_right {
        display: flex;

        .tabbar_avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-left: 12px;
        }

        .tabbar_dropdown {
            margin-left: 12px;

            .el-dropdown-link {
                cursor: pointer;
                color: var(--el-color-primary);
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>