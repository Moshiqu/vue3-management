<!--
 * 年龄
 * @since: 2023-09-14
 * index.vue
-->
<template>
    <div class="box">
        <div class="box_title">年龄比例</div>
        <div class="box_age_content" ref="echartsRef">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref()

onMounted(() => {
    const myEcharts = echarts.init(echartsRef.value)
    const option = {
        title: {
            text: '本日总数',
            left: '27%',
            top: '45%',
            itemGap: 10,
            textStyle: {
                color: '#6074a2',
                fontSize: '16',
                fontWeight: 400
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            right: '5%',
            orient: 'vertical',
            textStyle: {
                color: '#fff'
            },
            itemGap: 20,
            itemStyle: {
                borderWidth: 0
            },
            formatter: function (name: string) {
                let total = 0
                let current = 0
                option.series[0].data.forEach(item => {
                    total += item.value
                    if (name === item.name) {
                        current = item.value
                    }
                })

                const currentPercent = Math.round(current / total * 100)

                return `${name} ${currentPercent}%`;
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                left: '-30%',
                label: {
                    show: true,
                    color: "#fff",
                    position: 'inside',
                    formatter: function (params: { percent: number; }) {
                        return `${Math.round(params.percent)}%`
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '10 岁以下' },
                    { value: 735, name: '10 - 18岁' },
                    { value: 580, name: '18 - 30岁' },
                    { value: 484, name: '30 - 40岁' },
                    { value: 300, name: '40 - 60岁' },
                    { value: 258, name: '60 岁以上' }
                ]
            }
        ]
    };
    myEcharts.setOption(option)
})

defineOptions({
    name: "Age"
})
</script>

<style scoped lang="scss">
.box {
    position: relative;
    flex: 60;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
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

    .box_age_content {
        position: absolute;
        bottom: 0;
        height: 220px;
        width: 100%;
    }
}
</style>