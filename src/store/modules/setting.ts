// 小仓库: layout组件相关配置仓库
import { defineStore } from 'pinia';
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('Setting', () => {

    const isRefresh = ref(false)

    const refreshHandler = () => {
        isRefresh.value = !isRefresh.value
    }

    return {
        isRefresh,
        refreshHandler
    }
})

export default useLayoutSettingStore