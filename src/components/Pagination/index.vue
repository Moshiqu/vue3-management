<!--
 * 分页器组件
 * @since: 2023-09-04
 * Pagination.vue
-->
<template>
    <el-pagination v-model:current-page="paginationData.currentPage" v-model:page-size="paginationData.pageSize"
        :page-sizes="[5, 10, 20, 50]" layout="prev,pager,next,jumper,->,sizes,total" :total="paginationData.total"
        @size-change="$emits('changeCb')" @current-change="$emits('changeCb')" />
</template>

<script setup lang="ts">
import { reactive } from "vue";

const paginationData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
})

const $emits = defineEmits(['changeCb'])

defineExpose({
    paginationData
})

defineOptions({
    name: 'Pagination'
})
</script>

<style scoped lang="scss">
.el-pagination{
    margin-top: 10px;
}
</style>