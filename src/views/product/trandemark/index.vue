<!--
 * new page
 * @since: 2023-08-26
 * index.vue
-->
<template>
    <el-card class="main_card" v-loading="loading">
        <div class="main_card_top">
            <el-button type="primary" :icon="Plus" class="add_btn" @click="showDialogHandler('add')">添加品牌</el-button>
            <el-table :data="trademarkArr" border class="main_table" ref="tableRef">
                <el-table-column label="序号" width="80" align="center" type="index" />
                <el-table-column prop="tmName" label="品牌名称" />
                <el-table-column prop="logoUrl" label="品牌LOGO">
                    <template #default="scope">
                        <img :src="scope.row.logoUrl" :alt="scope.row.tmName" :title="scope.row.tmName" class="logo_img">
                    </template>
                </el-table-column>
                <el-table-column prop="operations" label="操作">
                    <template #default="scope">
                        <el-button size="small" type="warning" :icon="Edit" @click="showDialogHandler('edit', scope.row)"
                            title="修改品牌信息" />
                        <!-- 删除弹出确认框 -->
                        <el-popconfirm :title='`确定要删除品牌"${scope.row.tmName}"吗?`' cancel-button-text="取消" :icon="InfoFilled"
                            width="220" icon-color="#ff0000" @confirm="confirmDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger" :icon="Delete" title="删除品牌" />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Pagination @changeCb="getHasTrademark" ref="paginationRef" />
        <!-- 新增修改对话框 -->
        <TrandemarkDialog ref="dialogRef" @refresh="getHasTrademark" />
    </el-card>
</template>

<script setup lang="ts">
import { reqDeleTrademark, reqHasTrademark } from '@/api/trade';
import type { TradeMark, trademarkData } from '@/api/trade/type';
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ref, onMounted, nextTick } from "vue";
import { ElNotification, ElMessage } from "element-plus";
import type { ElTable } from 'element-plus';
import TrandemarkDialog from './Dialog/index.vue'
import Pagination from '@/components/Pagination/index.vue'

type PaginationCtx = InstanceType<typeof Pagination>

const loading = ref(false)

// 获取品牌列表
const trademarkArr = ref([] as TradeMark[])

const tableRef = ref<InstanceType<typeof ElTable>>()

const paginationRef = ref<PaginationCtx | null>(null)

const getHasTrademark = async (pageNum?: number) => {
    if (!paginationRef.value) return

    loading.value = true

    try {
        let { data, message, code } = await reqHasTrademark(pageNum || paginationRef.value.paginationData.currentPage, paginationRef.value.paginationData.pageSize)
        if (code === 200) {
            trademarkArr.value = data.records
            paginationRef.value.paginationData.total = data.total
            paginationRef.value.paginationData.pageSize = data.size
            paginationRef.value.paginationData.currentPage = data.current
        } else {
            ElNotification({
                type: 'error',
                message,
                duration: 1000
            })
        }

    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message,
            duration: 1000
        })
    }

    nextTick(() => {
        tableRef.value!.setScrollTop(0)
    })

    loading.value = false
}

onMounted(() => {
    getHasTrademark()
})

// 新增|修改品牌对话框
const dialogRef = ref()

const showDialogHandler = (type: 'add' | 'edit', trademarkData?: trademarkData) => type === 'add' ? dialogRef.value.open(type) : dialogRef.value.open(type, trademarkData)

// 删除弹出框
const confirmDelete = async (trademarkData?: trademarkData) => {
    if (!paginationRef.value) return
    try {
        const { code } = await reqDeleTrademark(trademarkData?.id as number)
        if (code === 200) {
            ElMessage.success(`品牌"${trademarkData?.tmName}"删除成功`)
            getHasTrademark(trademarkArr.value.length > 1 ? paginationRef.value.paginationData.currentPage : paginationRef.value.paginationData.currentPage - 1)
        } else {
            ElMessage.error(`品牌"${trademarkData?.tmName}"删除失败`)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

defineOptions({
    name: 'Trandemark'
})
</script>

<style scoped lang="scss">
.main_card {
    height: 100%;
    width: 100%;

    .add_btn {
        width: 100px;
    }

    .main_table {
        margin-top: 10px;

        .logo_img {
            width: 100px;
        }
    }

    :deep(.el-card__body) {
        height: 100%;
    }

    .main_card_top {
        height: calc(100% - $pagination_height);
        display: flex;
        flex-direction: column;
    }
}
</style>