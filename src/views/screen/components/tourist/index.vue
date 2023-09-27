<!--
 * 游客比例
 * @since: 2023-09-14
 * index.vue
-->
<template>
    <div class="box">
        <div class="box_title">实时游客统计</div>
        <div class="box_torist_number">可预约总量 <span>999999</span> 人</div>
        <div class="box_torist_content">
            <div class="content_number">
                <div class="person_img" v-for="(char, index) of currentPersons" :key="index">
                    {{ char }}
                </div>
                <div class="person_img">人</div>
            </div>
            <div class="charts" ref="echartsRef">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import { shape } from '../../utils/tool.ts'

// 人数
const currentPersons = ref('216908')
const timer = ref()

timer.value = setInterval(() => {
    currentPersons.value = (Number(currentPersons.value) + 1).toString()
}, 1000);

onBeforeUnmount(() => {
    clearInterval(timer.value)
    timer.value = null
})

// 水球图
const echartsRef = ref()

onMounted(() => {
    const myEcharts = echarts.init(echartsRef.value)
    myEcharts.setOption({
        series: [{
            type: 'liquidFill',
            data: [0.6, 0.5, 0.4, 0.3],
            radius: '100%',
            shape,
            outline: {
                show: false
            },
            label: {
                position: ['38%', '50%'],
                // formatter: function () {
                //     return 'ECharts\nLiquid Fill';
                // },
            }
        }]
    })
})

defineOptions({
    name: "Tourist"
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

    .box_torist_number {
        position: absolute;
        right: 15px;
        top: 35px;

        &>span {
            font-style: italic;
            font-weight: 700;
            color: #925d46;
        }
    }

    .box_torist_content {
        position: absolute;
        bottom: 20px;
        width: 100%;
        height: 300px;

        .content_number {
            display: flex;
            justify-content: center;

            .person_img {
                background: url(../../images/total.png) no-repeat;
                background-size: contain;
                height: 60px;
                width: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
                color: #70d1f3;
            }
        }

        .charts {
            height: calc(300px - 60px + 20px);
        }
    }
}
</style>