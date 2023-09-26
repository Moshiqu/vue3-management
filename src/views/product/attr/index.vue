<!--
 * 属性管理
 * @since: 2023-08-26
 * attr.vue
-->
<template>
    <div style="height: 100%;">
        <Categories :showAddContent="showAddAttr" :contentLoading="contentLoading" @categoriesChangeCB="categoriesChangeCB"
            ref="categoriesRef" />
        <el-card class="content_card" v-loading="contentLoading">
            <div style="height: 100%;" v-show="!showAddAttr" class="info_box">
                <el-button type="primary" :icon="Plus" class="add_btn"
                    :disabled="!categoriesRef?.categoriesValue.levelThreeValue" @click="addAttr" >添加平台属性</el-button>
                <el-table :data="attrInfoList" border v-show="attrInfoList.length">
                    <el-table-column label="序号" width="80" align="center" type="index" />
                    <el-table-column prop="attrName" label="属性名称" />
                    <el-table-column prop="attrValueList" label="属性值名称">
                        <template #default="scope">
                            <el-tag v-for="tag in scope.row.attrValueList" :key="tag.id" style="margin-right: 10px;">{{
                                tag.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operations" label="操作">
                        <template #default="scope">
                            <el-button size="small"  type="warning" :icon="Edit" title="修改品牌信息" @click="updateAttr(scope.row)" />
                            <el-popconfirm :title='`确定要删除该属性吗?`' cancel-button-text="取消" :icon="InfoFilled" width="220"
                                @confirm="deleteAttr(scope.row)" icon-color="#ff0000">
                                <template #reference>
                                    <el-button size="small"  type="danger" :icon="Delete" title="删除属性" />
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty v-show="!attrInfoList.length && !showAddAttr" class="empty_class"
                    :description="categoriesRef?.categoriesValue.levelThreeValue ? '暂无数据' : '请先选择分类'" />
            </div>
            <div v-show="showAddAttr" class="add_box">
                <div class="attr_name_item">
                    属性名称
                    <el-input v-model.trim="saveAttrObj.attrName" placeholder="请输入属性的名字" class="attr_name_input" />
                </div>
                <div class="attr_info_item">
                    <div class="attr_info_item_top">
                        <div>
                            <el-button size="small"  type="primary" :icon="Plus" @click="addRow"
                                :disabled="!saveAttrObj.attrName">添加属性值</el-button>
                        </div>
                        <el-table :data="saveAttrObj.attrValueList" border>
                            <el-table-column label="序号" width="80" align="center" type="index" />
                            <el-table-column prop="attrName" label="属性值">
                                <template #default="{ row, $index }">
                                    <span v-show="!row.inputVisible" @dblclick="showInputHandler(row, $index)">{{
                                        row.valueName
                                    }}</span>
                                    <el-input v-model.trim="row.valueName"
                                        :ref="(vc: InputInstance) => attrInfoInputRefArr[$index] = vc"
                                        v-show="row.inputVisible" @blur="blurHandler(row, $index)"
                                        @focus="focusHandler(row)" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="operations" label="操作">
                                <template #default="{ $index }">
                                    <el-popconfirm :title='`确定要删除该属性值吗?`' cancel-button-text="取消" :icon="InfoFilled"
                                        @confirm="deleteAttrInfo($index)" width="220" icon-color="#ff0000">
                                        <template #reference>
                                            <el-button size="small"  type="danger" :icon="Delete" title="删除属性值" />
                                        </template>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-button size="small"  type="primary" @click="submit"
                            :disabled="!saveAttrObj.attrName || !saveAttrObj.attrValueList.length">保存</el-button>
                        <el-button size="small"  type="default" @click="showAddAttr = false">取消</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue"
import { reqAttrInfoList, reqSaveAttr, reqDeleteAttr } from '@/api/attr/index'
import { ElMessage } from "element-plus";
import type { AttrData, AttrValueList } from '@/api/attr/type'
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import type { InputInstance } from 'element-plus'
import _cloneDeep from 'lodash/cloneDeep'
import Categories from '@/components/Categories/index.vue'

type CategoriesCtx = InstanceType<typeof Categories>;

// 三级分类 分类变化的回调
const categoriesChangeCB = (type: boolean) => {
    if (type) {
        getAttrList()
    } else {
        attrInfoList.value = []
    }
}

// 三级分类结果
const categoriesRef = ref<CategoriesCtx | null>(null)

// 获取品牌列表
const attrInfoList = ref([] as AttrData[])
const contentLoading = ref(false)

const getAttrList = async () => {
    if (!categoriesRef.value?.categoriesValue.levelOneValue || !categoriesRef.value.categoriesValue.levelTwoValue || !categoriesRef.value.categoriesValue.levelThreeValue) return
    contentLoading.value = true

    try {
        const { code, data, message } = await reqAttrInfoList(categoriesRef.value.categoriesValue.levelOneValue, categoriesRef.value.categoriesValue.levelTwoValue, categoriesRef.value.categoriesValue.levelThreeValue)
        if (code === 200) {
            attrInfoList.value = []
            attrInfoList.value = data
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
    contentLoading.value = false
}

// 新增平台属性
const showAddAttr = ref(false)

const saveAttrObj = reactive<AttrData>({
    attrName: '',
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3,
})

const addAttr = () => {
    showAddAttr.value = true;
    // 打开时 置空表单
    Object.assign(saveAttrObj, {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
    })
}

// 添加一行属性值
const attrInfoInputRefArr = ref<InputInstance[]>([])

const addRow = () => {
    saveAttrObj.attrValueList.push({ valueName: '', inputVisible: true })
    nextTick(() => {
        const length = attrInfoInputRefArr.value.length
        attrInfoInputRefArr.value[length - 1].focus()
    })
}

const blurHandler = (attrInfo: AttrValueList, $index: number) => {
    if (!attrInfo.valueName.trim()) {
        ElMessage.error('属性值不能为空！')
        saveAttrObj.attrValueList.splice($index, 1)
        return
    }

    if (saveAttrObj.attrValueList.some((item, index) => $index !== index && item.valueName === attrInfo.valueName)) {
        ElMessage.error('属性值不能重复！')
        saveAttrObj.attrValueList.splice($index, 1)
        return
    }

    attrInfo.inputVisible = false
}

const focusHandler = (attrInfo: AttrValueList) => {
    attrInfo.inputVisible = true
}

const showInputHandler = (attrInfo: AttrValueList, $index: number) => {
    attrInfo.inputVisible = true
    nextTick(() => {
        attrInfoInputRefArr.value[$index].focus()
    })
}

const deleteAttrInfo = (index: number) => {
    saveAttrObj.attrValueList.splice(index, 1)
}

const submit = async () => {
    saveAttrObj.categoryId = categoriesRef.value?.categoriesValue.levelThreeValue as number
    contentLoading.value = true
    try {
        let saveAttrObj_clone = _cloneDeep(saveAttrObj)
        saveAttrObj_clone.attrValueList = saveAttrObj_clone.attrValueList.filter(item => item.valueName)
        const { code, message } = await reqSaveAttr(saveAttrObj_clone)
        if (code === 200) {
            contentLoading.value = false
            showAddAttr.value = false
            getAttrList()
        } else {
            throw Error(message)
        }
    } catch (error) {
        contentLoading.value = false
        ElMessage.error((error as Error).message)
    }
}

// 修改平台属性
const updateAttr = (attrInfo: AttrData) => {
    Object.assign(saveAttrObj, _cloneDeep(attrInfo))
    showAddAttr.value = true
}

// 删除平台属性
const deleteAttr = async (attrInfo: AttrData) => {
    contentLoading.value = true
    try {
        const { code, message } = await reqDeleteAttr(attrInfo.id as number)
        if (code === 200) {
            getAttrList()
        } else {
            throw Error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
    contentLoading.value = false
}

defineOptions({
    name: 'Atrr'
})
</script>

<style scoped lang="scss">
.content_card {
    height: calc(100% - 72px - 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    :deep(.el-card__body) {
        height: 100%;
        position: relative;
    }

    .info_box {
        height: 100%;

        .add_btn {
            margin-bottom: 20px;
        }

        :deep(.el-table) {
            height: calc(100% - 32px - 20px);
        }

        .empty_class {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .add_box {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .attr_name_item {
            display: flex;
            align-items: center;

            .attr_name_input {
                width: 200px;
                margin-left: 10px;
            }
        }

        .attr_info_item {
            height: calc(100% - 40px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .attr_info_item_top {
                display: flex;
                flex-direction: column;
                height: calc(100% - 32px);
            }

            :deep(.el-table) {
                margin: 10px 0;
                // height: 100%;
            }
        }

    }
}
</style>