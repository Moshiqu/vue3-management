<!--
 * 页面结构
 * @since: 2023-08-19
 * layout.vue
-->
<template>
    <div class="layout_container">
        <div :class="['layout_slider', isCollapse ? 'is_collapse' : '']">
            <Logo :isCollapse="isCollapse" />
            <el-scrollbar class="sidebar_scroll">
                <el-menu class="sidebar_menu" text-color="#fff" background-color="#001529" :default-active="$route.path"
                    :collapse="isCollapse" :collapse-transition="false" unique-opened router>
                    <SideBar :menuList="userStore.menuRouter" />
                </el-menu>
            </el-scrollbar>
        </div>
        <div :class="['layout_tabbar', isCollapse ? 'is_collapse' : '']">
            <Tabbar :isCollapse="isCollapse" @collapseHandler="collapseHandler" />
        </div>
        <div :class="['layout_main', isCollapse ? 'is_collapse' : '']">
            <Main />
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import SideBar from "@/layout/sidebar/index.vue"
import Tabbar from '@/layout/tabbar/index.vue'
import Main from '@/layout/main/index.vue'
import { ref } from 'vue'
import useUserStore from '@/store/modules/user';
import { useRoute } from 'vue-router'

// 获取用户小仓库的数据
const userStore = useUserStore()

// 获取路由信息
const $route = useRoute()

// 侧边栏展开收起
let isCollapse = ref(false) //侧边栏是否收起
const collapseHandler = () => {
    isCollapse.value = !isCollapse.value
}

defineOptions({
    name: 'LayOut'
})
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base_slider_width;
        height: 100%;
        background-color: $base_slider_background_color;
        user-select: none;
        transition: all .5s;

        .sidebar_scroll {
            width: 100%;
            height: calc(100% - $base_slider_logo_height);

            .sidebar_menu {
                background-color: $base_slider_background_color;
                border-right: none;
            }
        }

        &.is_collapse {
            width: $base_slider_collapse_width;
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base_slider_width;
        height: $base_tabbar_height;
        background-color: $base_tabbar_background_color;
        box-shadow: #00000026 0 3px 3px;
    }

    .layout_main {
        position: absolute;
        height: calc(100% - $base_tabbar_height);
        top: $base_tabbar_height;
        left: $base_slider_width;
        padding: 20px;
        overflow: auto;
    }

    .layout_tabbar,
    .layout_main {
        width: calc(100% - $base_slider_width);
        transition: all .5s;

        &.is_collapse {
            width: calc(100vw - $base_slider_collapse_width);
            left: $base_slider_collapse_width;
        }
    }
}
</style>