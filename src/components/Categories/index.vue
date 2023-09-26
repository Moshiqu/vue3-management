<!--
 * 三级分类选择框
 * @since: 2023-09-04
 * Categories.vue
-->
<template>
    <el-card class="categories_card">
        <div class="categories">
            <div>一级分类</div>
            <el-select v-model="categoriesValue.levelOneValue" placeholder="请选择" @change="categoryChange(1)"
                :disabled="showAddContent">
                <el-option v-for="item in categoriesOptions.levelOne" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>
        <div class="categories">
            <div>二级分类</div>
            <el-select v-model="categoriesValue.levelTwoValue" placeholder="请选择" @change="categoryChange(2)"
                :disabled="showAddContent">
                <el-option v-for="item in categoriesOptions.levelTwo" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>
        <div class="categories">
            <div>三级分类</div>
            <el-select v-model="categoriesValue.levelThreeValue" placeholder="请选择" @change="categoryChange(3)"
                :disabled="contentLoading || showAddContent">
                <el-option v-for="item in categoriesOptions.levelThree" :key="item.id" :label="item.name"
                    :value="item.id" />
            </el-select>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue"
import { reqCategory1, reqCategory2, reqCategory3, } from '@/api/attr/index'
import { ElMessage } from "element-plus";
import type { AttrCategoryData } from '@/api/attr/type'

interface categoriesOptionsType {
    levelOne: AttrCategoryData[],
    levelTwo: AttrCategoryData[],
    levelThree: AttrCategoryData[],
}

interface categoriesValueType {
    levelOneValue: '' | number
    levelTwoValue: '' | number
    levelThreeValue: '' | number
}

defineProps(['showAddContent', 'contentLoading'])

// 分类1
const categoriesOptions = reactive({ levelOne: [], levelTwo: [], levelThree: [] } as categoriesOptionsType)
const categoriesValue = reactive({ levelOneValue: '', levelTwoValue: '', levelThreeValue: '' } as categoriesValueType)

const getCate1 = async () => {
    try {
        const { data, code, message } = await reqCategory1()
        if (code === 200) {
            categoriesOptions.levelOne = data
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

onMounted(() => {
    getCate1()
})

// 分类2
const getCate2 = async () => {
    if (!categoriesValue.levelOneValue) return

    try {
        const { code, data, message } = await reqCategory2(categoriesValue.levelOneValue as number)
        if (code === 200) {
            categoriesOptions.levelTwo = data
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

// 分类3
const getCate3 = async () => {
    if (!categoriesValue.levelOneValue || !categoriesValue.levelTwoValue) return

    try {
        const { code, data, message } = await reqCategory3(categoriesValue.levelTwoValue as number)
        if (code === 200) {
            categoriesOptions.levelThree = data
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

// 分类变化
const $emit = defineEmits(["categoriesChangeCB"])

const categoryChange = (type: 1 | 2 | 3) => {
    if (type === 1) {
        categoriesOptions.levelTwo = []
        categoriesValue.levelTwoValue = ''
        categoriesOptions.levelThree = []
        categoriesValue.levelThreeValue = ''
        $emit('categoriesChangeCB', false)
        getCate2()
    } else if (type === 2) {
        categoriesOptions.levelThree = []
        categoriesValue.levelThreeValue = ''
        $emit('categoriesChangeCB', false)
        getCate3()
    } else if (type === 3) {
        $emit('categoriesChangeCB', true)
    }
}

defineExpose({
    categoriesValue,
})

defineOptions({
    name: 'Categories'
})
</script>

<style scoped lang="scss">
.categories_card {
    margin-bottom: 20px;
    height: 72px;

    :deep(.el-card__body) {
        display: flex;
    }

    .categories {
        display: flex;
        align-items: center;
        margin-right: 20px;

        &>div {
            margin-right: 10px;
        }
    }
}
</style>