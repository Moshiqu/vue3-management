<!--
 * 热门景区排行
 * @since: 2023-10-04
 * index.vue
-->
<template>
    <div class="box">
        <div class="box_title">热门景区排行</div>
        <div class="box_content">
            <div class="header">
                <el-row>
                    <el-col :span="5">排名</el-col>
                    <el-col :span="5">景区</el-col>
                    <el-col :span="14">预约数量</el-col>
                </el-row>
            </div>
            <div class="body">
                <div class="body_row" v-for="(item, index) in dataList" :key="item.name">
                    <el-row>
                        <el-col :span="5" :style="`background-color:${item.backgroundColor}`">
                            <div class="rank">NO.{{ index + 1 }}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="address">{{ item.name }}</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="num_box">
                                <div class="chart" ref="chartsRef">
                                </div>
                                <div class="num">{{ item.data / 9999 > 1 ? Number(item.data / 10000).toFixed(2) : item.data
                                }}w</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const total = 100000

// 随机数据
const randomNum = (min: number = 20000, max: number = total) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomList: number[] = []
for (let i = 0; i < 5; i++) {
    randomList.push(randomNum())
}

const dataList = [
    {
        name: '峨眉山',
        data: randomList[0],
        total,
        colorList: {
            contentItemStyle1: 'rgba(1, 132, 241, 1)',
            contentItemStyle2: 'rgba(1, 132, 241, 0.5)',
            borderItemStyle1: 'rgba(17, 23, 80, 0.19)',
            borderItemStyle2: 'rgba(1, 132, 241, 1)'
        },
        backgroundColor: '#d0604d'
    },
    {
        name: '稻城亚丁',
        data: randomList[1],
        total,
        colorList: {
            contentItemStyle1: 'rgba(255, 128, 115, 1)',
            contentItemStyle2: 'rgba(255, 128, 115, 0.5)',
            borderItemStyle1: 'rgba(17, 23, 80, 0.19)',
            borderItemStyle2: 'rgba(255, 128, 115, 1)'
        },
        backgroundColor: '#c99755'
    },
    {
        name: '九寨沟',
        data: randomList[2],
        total,
        colorList: {
            contentItemStyle1: 'rgba(73, 198, 228, 1)',
            contentItemStyle2: 'rgba(73, 198, 228, 0.5)',
            borderItemStyle1: 'rgba(17, 23, 80, 0.19)',
            borderItemStyle2: 'rgba(73, 198, 228, 1)'
        },
        backgroundColor: '#166ed5'
    },
    {
        name: '万里长城',
        data: randomList[3],
        total,
        colorList: {
            contentItemStyle1: 'rgba(255, 179, 61, 1)',
            contentItemStyle2: 'rgba(255, 179, 61, 0.5)',
            borderItemStyle1: 'rgba(17, 23, 80, 0.19)',
            borderItemStyle2: 'rgba(255, 179, 61, 1)'
        },
        backgroundColor: '#3565a5'
    },
    {
        name: '北京故宫',
        data: randomList[4],
        total,
        colorList: {
            contentItemStyle1: 'rgba(141, 130, 249, 1)',
            contentItemStyle2: 'rgba(141, 130, 249, 0.5)',
            borderItemStyle1: 'rgba(17, 23, 80, 0.19)',
            borderItemStyle2: 'rgba(141, 130, 249, 1)'
        },
        backgroundColor: '#3565a5'
    },
]

const chartsRef = ref()

const generateOptions = (index: number) => {
    return {
        grid: {
            top: 0,
            bottom: 1,
            left: 0,
            right: 0,
        },
        xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0],
        },
        yAxis: [
            {
                type: 'category',
                data: [''],
                axisLine: { show: false },
                axisTick: [
                    {
                        show: false,
                    },
                ],
            },
        ],
        series: [
            {
                name: '内容',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    borderRadius: 30,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        {
                            offset: 1,
                            color: dataList[index].colorList.contentItemStyle1,
                        },
                        {
                            offset: 0,
                            color: dataList[index].colorList.contentItemStyle2,
                        },
                    ]),
                },
                barWidth: 20,
                data: [randomList[index]],
                label: {
                    show: true,
                    position: 'inside',
                    formatter: function (params: any) {
                        return `${Number(params.value / total * 100).toFixed(2)}%`
                    }
                },
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: 20,
                barGap: '-100%',
                data: [total],
                itemStyle: {
                    color: dataList[index].colorList.borderItemStyle1,
                    borderWidth: 1,
                    borderColor: dataList[index].colorList.borderItemStyle2,
                    borderRadius: 30,
                },
            },
        ],
    }
}

onMounted(() => {
    nextTick(() => {
        const refList = []
        for (let i = 0; i < dataList.length; i++) {
            refList.push(echarts.init(chartsRef.value[i]))
        }
        refList.forEach((item, index) => {
            item.setOption(generateOptions(index))
        })
    })
})

defineOptions({
    name: 'RankView'
})
</script>

<style scoped lang="scss">
.box {
    flex: 83;
    position: relative;
    background: url(../../images/dataScreen-main-rt.png) no-repeat;
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

    .box_content {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: calc(100% - 50px);
        padding: 10px;

        .header {
            height: 36px;
            color: #d8a155;
            font-weight: 700;
            background: url(../../images/rankingChart-bg.png) no-repeat;
            background-size: 100% 36px;
        }

        .body {
            .body_row {
                height: 30px;
                margin: 13px 0;

                .el-row {
                    &>.el-col:first-child {
                        // background-color: #d0604d;
                        text-align: center;
                        position: relative;

                        &::before,
                        &::after {
                            position: absolute;
                            top: 0;
                            content: " ";
                            height: 0;
                            width: 0;
                        }

                        &::before {
                            left: 0;
                            border-bottom: 31px solid #183a70;
                            border-left: 8px solid #0f1750;
                            border-right: 7px solid transparent;
                        }

                        &::after {
                            right: 0;
                            border-bottom: 31px solid #183a70;
                            // border-right: 8px solid #0f1750;
                            border-left: 7px solid transparent;
                        }
                    }

                    .num_box {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .chart {
                            width: 70%;
                            height: 100%;
                        }

                        .num {
                            width: 20%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }

}

.el-row {
    height: 100%;
}

.el-col {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>