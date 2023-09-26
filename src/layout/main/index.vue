<!--
 * layout右侧主显示区域
 * @since: 2023-08-26
 * index.vue
-->
<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" :key="refreshFlag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting';

const layoutSettingStore = useLayoutSettingStore()
let refreshFlag = ref(new Date())
watch(() => layoutSettingStore.isRefresh, () => {
    // 刷新后, 重新生成新的组件
    refreshFlag.value = new Date()
})

defineOptions({
    name: 'MainBox'
})
</script>

<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
    scale: 0;
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    scale: 1;
}
</style>