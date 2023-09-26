<!--
 * 侧边栏组件
 * @since: 2023-08-25
 * SideBar.vue
-->
<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden">
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                <template #title>
                    {{ item.meta.title }}
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由 但子路由只有一个 -->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                <el-icon>
                    <component :is="item.children[0].meta.icon" />
                </el-icon>
                <template #title>
                    {{ item.children[0].meta.title }}
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由 子路由有多个 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <SideBar :menuList="item.children" />
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import SideBar from '@/layout/sidebar/index.vue';
const props = defineProps(['menuList'])
const menuList = props.menuList

defineOptions({
    name: 'SlideBar'
})
</script>

<style scoped lang="scss"></style>