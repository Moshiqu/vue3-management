<!--
 * 年度游客量对比
 * @since: 2023-10-04
 * comparison.vue
-->
<template>
    <div class="box">
        <div class="box_title">年度游客量对比</div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'ComparisonView'
})
</script>

<style scoped lang="scss">
.box {
    flex: 83;
    position: relative;
    background: url(../../images/dataScreen-main-lt.png) no-repeat;
    background-size: cover;

    .box_title {
        position: absolute;
        left: 0;
        top: 0;

        &::after {
            content: '';
            position: absolute;
            width: 68px;
            height: 7px;
            bottom: -15px;
            left: 0;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
        }
    }

}
</style>