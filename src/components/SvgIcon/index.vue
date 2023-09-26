<!--
 * svg格式组件
 * @since: 2023-08-17
 * SvgIcon.vue
-->
<template>
    <svg :style="{ width: `${width}px`, height: `${height}px` }" :title="title">
        <use :xlink:href="`#icon-${prefix}`"></use>
    </svg>
</template>

<script setup lang="ts">
interface SvgIconProps {
    prefix: string,
    title: string,
    width?: number,
    height?: number,
}
withDefaults(defineProps<SvgIconProps>(), {
    width: 32,
    height: 32
})

</script>

<style scoped lang="less"></style>
