<!--
 * 年度游客量对比
 * @since: 2023-10-04
 * comparison.vue
-->
<template>
    <div class="box">
        <div class="box_title">年度游客量对比</div>
        <div ref="chartRef" class="chart_box"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 生成数据
const randomNum = (min: number = 0, max: number = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const seriesRandomData = () => {
    const data = []
    for (let i = 0; i < 12; i++) {
        data.push(randomNum())
    }
    return data
}

const chartRef = ref()

onMounted(() => {
    const myChart = echarts.init(chartRef.value)
    myChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params: any) {
                console.log(params, '---');
                const name = `${params[0].name}月`

                let str = `${name}<br/>`
                params.forEach((item: { marker: any; seriesName: any; value: { toLocaleString: () => any; }; }) => {
                    str += `${item.marker}${item.seriesName} : ${item.value.toLocaleString()} 人<br/>`
                })

                return str
            },
        },
        legend: {
            icon: "rect",
            orient: "horizontal",
            left: "right",
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
                color: '#fff',
                fontSize: '12px'
            },
            data: ['2021年', '2022年', '2023年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 30,
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                boundaryGap: false,
                axisTick: {
                    show: false, // 不显示坐标轴刻度线
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    color: 'rgba(230, 247, 255, 0.50)',
                    fontSize: 12,
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: '(人数)',
                nameTextStyle: {
                    align: 'right',
                    color: 'rgba(230, 247, 255, 0.50)',
                },
                //y右侧文字
                axisLabel: {
                    color: 'rgba(230, 247, 255, 0.50)',
                    fontSize: 12,
                },
                // y轴的分割线
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            {
                name: '2021年',
                type: 'line',
                smooth: true,
                symbol: 'none',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                lineStyle: {
                    width: 1,
                    shadowColor: '#6A583A',
                    shadowBlur: 10,
                },
                areaStyle: {
                    opacity: 0.4,
                    //右下左上
                    color: {
                        type: 'linear',
                        x: 0,  //右
                        y: 0,  //下
                        x2: 0,  //左
                        y2: 1,  //上
                        colorStops: [
                            {
                                offset: 0.1,
                                color: '#5090FF' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#1057E5' // 100% 处的颜色
                            }
                        ]
                    },
                },
                data: seriesRandomData(),
            },
            {
                name: '2022年',
                type: 'line',
                smooth: true,
                symbol: 'none',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                lineStyle: {
                    width: 1,
                    shadowColor: '#6A583A',
                    shadowBlur: 10,
                },
                areaStyle: {
                    opacity: 0.8,
                    //右下左上
                    color: {
                        type: 'linear',
                        x: 0,  //右
                        y: 0,  //下
                        x2: 0,  //左
                        y2: 1,  //上
                        colorStops: [
                            {
                                offset: 0.1,
                                color: '#01B3E4' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#DCF300' // 100% 处的颜色
                            }
                        ]
                    },
                },
                data: seriesRandomData(),
            },
            {
                name: '2023年',
                type: 'line',
                smooth: true,
                symbol: 'none',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                lineStyle: {
                    width: 1,
                    shadowColor: '#6A583A',
                    shadowBlur: 10,
                },
                areaStyle: {
                    opacity: 0.5,
                    //右下左上
                    color: {
                        type: 'linear',
                        x: 0,  //右
                        y: 0,  //下
                        x2: 0,  //左
                        y2: 1,  //上
                        colorStops: [
                            {
                                offset: 0.1,
                                color: '#FAC858' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#F7E8C6' // 100% 处的颜色
                            }
                        ]
                    },
                },
                data: seriesRandomData(),
            },
        ],
    })
})

defineOptions({
    name: 'ComparisonView'
})
</script>

<style scoped lang="scss">
.box {
    flex: 83;
    position: relative;
    background: url(../../images/dataScreen-main-lc.png) no-repeat;
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

    .chart_box {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: calc(100% - 57px);
    }
}
</style>