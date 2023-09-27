<!--
 * 地图组件
 * @since: 2023-09-26
 * map.vue
-->
<template>
    <div>
        <div ref="echartRef" style="height: 100%;"></div>
        <div class="echart_title">平台高峰预警信息(2条)</div>
        <div class="echart_subtitle">景区实时客流量</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { planePath } from '../../utils/tool.ts'
import * as china from '../../utils/china.json'

const echartRef = ref()
echarts.registerMap('china', china as any)

onMounted(() => {
    console.log(echartRef.value);
    const myChart = echarts.init(echartRef.value)
    const points = [
        { value: [116.405285, 39.904989], itemStyle: { color: '#FFFA00' } },
        { value: [113.54909, 22.198951], itemStyle: { color: '#00EEFF' } },
        { value: [91.132212, 29.660361], itemStyle: { color: '#00EEFF' } },
        { value: [126.642464, 45.756967], itemStyle: { color: '#00EEFF' } },
        { value: [87.617733, 43.792818], itemStyle: { color: '#00EEFF' } },
    ]
    const option = {
        geo: {
            map: 'china',
            roam: true, // 是否开启放大缩小/拖拽功能
            zoom: 1.2, // 缩放比列
            layoutCenter: ['50%', '60%'], // 地图中心点位置
            layoutSize: '80%',
            label: {
                show: true,
                color: '#fff'
            },
            itemStyle: {
                areaColor: '#12235c',
                borderColor: '#2ab8ff',
                borderWidth: .5,
                shadowColor: 'rgba(0,54,255, 0.4)',
                shadowBlur: 100
            },
            emphasis: { //区域激活时的样式
                itemStyle: {
                    areaColor: '#02102b',
                },
                label: {
                    color: "#fff"
                }
            }
        },
        series: [ // 添加迁移线数据
            {
                type: 'lines',
                data: [ // 配置多个点的数据
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [113.54909, 22.198951],
                        ]
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [91.132212, 29.660361],
                        ]
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [126.642464, 45.756967]
                        ]
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [87.617733, 43.792818]
                        ]
                    }
                ],
                effect: {
                    show: true,
                    period: 5, //箭头指向速度，值越小速度越快
                    trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
                    // symbol: 'arrow', //箭头图标
                    symbol: planePath,
                    symbolSize: 15, //图标大小
                },
                lineStyle: {
                    color: '#00eaff',
                    width: 1, //尾迹线条宽度
                    opacity: .7, //尾迹线条透明度
                    curveness: .3, //尾迹线条曲直度
                },
            },
            { // 带有涟漪特效动画的散点（气泡）图
                type: 'effectScatter',
                coordinateSystem: 'geo',
                showEffectOn: 'render',
                zlevel: 1,
                rippleEffect: {
                    number: 3, // 波纹的数量。
                    period: 5, // 动画的周期，秒数。
                    scale: 17, // 动画中波纹的最大缩放比例。
                    brushType: 'fill', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
                },
                symbolSize: 2,
                data: points,
            }
        ]
    };

    myChart.setOption(option)
})

defineOptions({
    name: 'MapView'
})
</script>

<style scoped lang="scss">
.echart_title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;

    &::after {
        content: '';
        position: absolute;
        width: 68px;
        height: 7px;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        background: url(../../images/dataScreen-title.png) no-repeat;
        background-size: 100% 100%;
    }
}

.echart_subtitle {
    position: absolute;
    top: 50px;
    left: 20px;
    font-size: 20px;
    height: 36px;
    width: 350px;
    line-height: 36px;
    background: url(../../images/map-title-bg.png) no-repeat;
    background-size: 100% 100%;
    padding-left: 34px;
    letter-spacing: 5px;
    font-weight: 700;
}
</style>