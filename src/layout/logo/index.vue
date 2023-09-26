<!--
 * Logo
 * @since: 2023-08-19
 * Logo.vue
-->
<template>
    <div class="logo">
        <img :src="setting.logo_address" :alt="setting.logo_title">
        <span v-show="!isCollapse">{{ setting.logo_title }}</span>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';

defineProps(['isCollapse'])

defineOptions({
    name: 'Logo'
})
</script>

<style scoped lang="scss">
.logo {
    color: white;
    width: 100%;
    height: $base_slider_logo_height;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 40px;
        width: 40px;
        border-radius: 10px;
    }

    &>span {
        font-size: $base_slider_logo_font_size;
        margin-left: 20px;
        // 超出范围用省略号表示
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>