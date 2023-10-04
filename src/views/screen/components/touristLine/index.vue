<!--
 * 游客折现图
 * @since: 2023-09-27
 * touristLine.vue
-->
<template>
    <div class="box">
        <div class="box_title">未来30天游客量趋势图</div>
        <div ref="echartRef" class="echart_box"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const seriesNum = 30
const minNum = 0
const maxNum = 30000

// 生成未来多少天日期
const setFutureDate = (futureNum: number = seriesNum) => {
    const dateList = [];
    let startDate = new Date();
    let endDate = new Date();
    startDate.setDate(startDate.getDate() + 1)
    endDate.setDate(startDate.getDate() + futureNum - 1);
    while ((endDate.getTime() - startDate.getTime()) >= 0) {
        let month = (startDate.getMonth() + 1).toString().length === 1 ? "0" + (startDate.getMonth() + 1).toString() : (
            startDate.getMonth() + 1);
        let day = startDate.getDate().toString().length === 1 ? "0" + startDate.getDate() : startDate.getDate();
        dateList.push(month + "/" + day);
        startDate.setDate(startDate.getDate() + 1);
    }
    return dateList
}

// 生成随机数字
const setRandomDataList = (minNum: number, maxNum: number, num: number = seriesNum) => {
    const randomData = (min: number = minNum, max: number = maxNum) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    }

    const list = []
    for (let i = 0; i < num; i++) {
        list.push(randomData())
    }
    return list
}

const echartRef = ref()

const dataX = setFutureDate()
const seriesData = setRandomDataList(minNum, maxNum)

onMounted(() => {
    const myChart = echarts.init(echartRef.value)
    myChart.setOption({
        dataZoom: [
            {
                type: 'inside',
                // filterMode: 'filter',
                realtime: true,
                start: 0,
                end: 20
            },
            {
                show: true,
                xAxisIndex: [0],
                realtime: true,
                height: 4,//这里可以设置dataZoom的尺寸
                bottom: '7%',
                backgroundColor: '#1d76e6', // 填充颜色
                textStyle: {
                    color: '#fff' // 左右两边文字颜色
                },
            }
        ],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.63)', //设置背景颜色
            textStyle: {
                color: '#fff'
            },
            borderColor: "rgba(255,255,255, .5)",
            formatter: function (params: any) {
                const nameArr = params[0].name.split('/')
                const name = `${nameArr[0]}月${nameArr[1]}日`
                console.log(name);
                return name + '<br/>' +
                    "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(1, 251, 246, 1)'></span>" +
                    params[0].seriesName + ' : ' + params[0].value.toLocaleString() + ' 位<br/>'

            },
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#26367A'
                }
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: 'rgba(198, 207, 255, 1)',
                fontSize: 12,
                // rotate: 0,
                // margin: 10,
                interval: 0,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: dataX,
            boundaryGap: false
        }],
        grid: {
            top: '35',
            left: '10',
            right: '50',
            bottom: '20',
            containLabel: true
        },
        yAxis: [{
            type: 'value',
            name: '(访问量)',
            nameTextStyle: {
                color: '#fff',
                fontSize: '11px',
                align: 'right',
            },
            min: minNum,
            max: maxNum,
            splitLine: {
                show: true,
                interval: '0',
                lineStyle: {
                    color: ['rgba(38, 54, 122, .58)'],
                    type: 'dashed',
                    width: 1
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                // margin: 10,
                textStyle: {
                    fontSize: 12,
                    color: 'rgba(198, 207, 255, 1)'
                },
                formatter: (param: number) => {
                    return param > 9999 ? (param / 10000) + 'w' : param
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [
            {
                name: '游客量',
                data: seriesData,
                type: 'line',
                areaStyle: {
                    //区域填充样式
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            { offset: 0, color: "rgba(61,234,255, 1)" },
                            { offset: 1, color: "rgba(61,234,255, 0)" },
                        ],
                        false
                    ),
                },
                lineStyle: {
                    show: true,
                    width: 2,
                    color: {
                        type: "linear",
                        colorStops: [
                            {
                                offset: 0,
                                color: "rgba(0, 253, 255, 1)", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "rgba(0, 253, 255, 0.60)", // 100% 处的颜色
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                    },
                    shadowColor: "rgba(72,216,191, 0.3)",
                },
                smooth: true,
            }
        ]
    })
})

defineOptions({
    name: 'TouristLine'
})
</script>

<style scoped lang="scss">
.box {
    position: relative;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
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
            background: url(../../images/line-bg.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .echart_box {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: calc(100% - 50px);
    }
}
</style>