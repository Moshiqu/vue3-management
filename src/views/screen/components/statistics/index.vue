<!--
 * 预约渠道数据统计
 * @since: 2023-10-04
 * index.vue
-->
<template>
    <div class="box">
        <div class="box_title">预约渠道数据统计</div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'StatisticsView'
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