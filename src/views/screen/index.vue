<!--
 * 大屏
 * @since: 2023-08-26
 * screen.vue
-->
<template>
    <div class="container">
        <div class="screen" ref="screenRef">
            <div>
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist />
                    <Gender />
                    <Age />
                </div>
                <div class="center">
                    <Map class="map_box" />
                    <TouristLine class="tourist_line_box" />
                </div>
                <div class="right">右</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
import Age from './components/age/index.vue'
import Tourist from './components/tourist/index.vue'
import Gender from './components/gender/index.vue'
import Map from './components/map/index.vue'
import TouristLine from './components/touristLine/index.vue'

const screenRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
    screenRef.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

const getScale = (w = 1920, h = 1080) => {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
}

window.onresize = () => {
    screenRef.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

defineOptions({
    name: 'Screen'
})

</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        height: 1080px;
        width: 1920px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        color: #fff;

        .bottom {
            display: flex;
            padding: 10px 60px;

            .left,
            .right {
                flex: 1;
                height: 1020px;
            }

            .left {
                display: flex;
                flex-direction: column;

                &>div {
                    margin-bottom: 20px;
                }

                &>div:last-child {
                    margin-bottom: 0;
                }
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;
                margin-top: 40px;

                .map_box {
                    background-color: red;
                    flex: 3;
                }

                .tourist_line_box {
                    background-color: yellow;
                    flex: 1;
                }
            }
        }
    }
}
</style>