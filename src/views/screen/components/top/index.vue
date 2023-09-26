<!--
 * 大屏顶部组件
 * @since: 2023-09-14
 * top.vue
-->
<template>
    <div class="top">
        <div class="left">
            <span class="btn_l" @click="$router.push('/home')">首页</span>
        </div>
        <div class="center">
            <div class="title">可视化大屏数据展示</div>
        </div>
        <div class="right">
            <span class="btn_r">统计报告</span>
            <span class="time">当前时间: {{ currentTime }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment'

const currentTime = ref(moment().format("YYYY年MM月DD日 HH:mm:ss"))
const timer = ref()

onMounted(() => {
    timer.value = setInterval(() => {
        currentTime.value = moment().format("YYYY年MM月DD日 HH:mm:ss")
    }, 1000);
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
    timer.value = null
})

const $router = useRouter()

defineOptions({
    name: 'Top'
})
</script>

<style scoped lang="scss">
.top {
    height: 40px;
    width: 100%;
    display: flex;
    color: #29fcff;

    .left,
    .right {
        flex: 1;
    }

    .left {
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .btn_l {
            height: 100%;
            width: 150px;
            font-size: 20px;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            float: right;
            line-height: 40px;
            vertical-align: middle;
            text-align: center;
            cursor: pointer;
            user-select: none;
        }
    }

    .right {
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn_r {
            height: 100%;
            width: 150px;
            font-size: 20px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            float: left;
            line-height: 40px;
            vertical-align: middle;
            text-align: center;
        }

        .time {
            margin-right: 30px;
        }
    }

    .center {
        flex: 1;

        .title {
            height: 74px;
            line-height: 74px;
            width: 100%;
            color: #29fcff;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 30px;
        }
    }
}
</style>