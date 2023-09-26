<!--
 * 性别比例
 * @since: 2023-09-14
 * index.vue
-->
<template>
    <div class="box">
        <div class="box_title">男女比例</div>
        <div class="box_gender_content">
            <div class="gender_cards">
                <div class="man">
                    <span>男士</span>
                    <div class="icon">
                        <img src="../../images/man.png">
                    </div>
                </div>
                <div class="woman">
                    <span>女生</span>
                    <div class="icon">
                        <img src="../../images/woman.png">
                    </div>
                </div>
            </div>
            <div class="progress">
                <div class="title">
                    <span>男士 {{ manPercentage }}%</span>
                    <span>女士 {{ womanPercentage }}%</span>
                </div>
                <el-progress :stroke-width="24" :percentage="60" :text-inside="true" color="#0075ff">
                    <span></span>
                </el-progress>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const manPercentage = ref(60)
const womanPercentage = computed(() => 100 - manPercentage.value)

defineOptions({
    name: "Gender"
})
</script>

<style scoped lang="scss">
.box {
    flex: 68;
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

    .box_gender_content {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 260px;
        padding: 30px 80px;

        .gender_cards {
            display: flex;
            justify-content: space-between;

            &>div {
                background-size: 100% 100%;
                height: 130px;
                width: 120px;
                position: relative;

                &>span {
                    position: absolute;
                    top: 0;
                    left: 47%;
                    transform: translateX(-50%);
                    font-size: 14px;
                }

                &>.icon {
                    position: absolute;
                    top: 50%;
                    left: 47%;
                    transform: translate(-50%, -50%);
                }
            }

            .man {
                background: url(../../images/man-bg.png) no-repeat;
            }

            .woman {
                background: url(../../images/woman-bg.png) no-repeat;
            }
        }

        .progress {
            .title{
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }

            :deep(.el-progress-bar__outer) {
                background-color: #ff5f79;
            }
        }
    }
}
</style>