<!--
 * SPU管理
 * @since: 2023-08-26
 * spu.vue
 * 添加sku https://www.bilibili.com/video/BV1Xh411V7b5?p=90
-->
<template>
    <div style="height: 100%;">
        <Categories ref="categoriesRef" :showAddContent="showAddSpu" :contentLoading="contentLoading"
            @categoriesChangeCB="categoriesChangeCB" />
        <el-card class="content_card" v-loading="contentLoading">
            <div v-show="!showAddSpu" class="info_box">
                <el-button type="primary" :icon="Plus" class="add_btn" v-if="categoriesRef?.categoriesValue.levelThreeValue"
                    @click="addSpu">添加SPU</el-button>
                <el-table :data="SpuInfoList" border v-show="SpuInfoList.length">
                    <el-table-column label="序号" width="80" align="center" type="index" />
                    <el-table-column prop="spuName" label="SPU名称" />
                    <el-table-column prop="description" label="SPU描述">
                        <template #default="{ row }">
                            {{ row.description }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="operations" label="操作">
                        <template #default="scope">
                            <!-- 添加sku https://www.bilibili.com/video/BV1Xh411V7b5?p=90 -->
                            <!-- <el-button type="primary" size="small" :icon="Plus" title="添加sku"
                                @click="updateAttr(scope.row, 2)" /> -->
                            <el-button type="warning" size="small" :icon="Edit" title="修改该SPU信息"
                                @click="updateAttr(scope.row, 2)" />
                            <el-button type="info" size="small" :icon="InfoFilled" title="查看该SPU信息"
                                @click="updateAttr(scope.row, 3)" />
                            <el-popconfirm :title='`确定要删除"${scope.row.spuName}"吗?`' cancel-button-text="取消"
                                :icon="InfoFilled" width="220" @confirm="deleteSpu(scope.row)" icon-color="#ff0000">
                                <template #reference>
                                    <el-button size="small" type="danger" :icon="Delete" title="删除SPU" />
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty v-show="!SpuInfoList.length && !showAddSpu" class="empty_class"
                    :description="categoriesRef?.categoriesValue.levelThreeValue ? '暂无数据' : '请先选择分类'" />
            </div>
            <div v-show="showAddSpu" class="add_box" v-loading="cardLoading">
                <div style="height: calc(100% - 42px);">
                    <el-scrollbar>
                        <el-form :model="spuAddForm" style="width: 97%;" ref="formRef" :rules="rules" id="addForm"
                            :disabled="scene === 3">
                            <el-form-item label="SPU名称" prop="spuName">
                                <el-input v-model="spuAddForm.spuName" />
                            </el-form-item>
                            <el-form-item label="SPU品牌" prop="tmId">
                                <el-select v-model="spuAddForm.tmId" placeholder="请选择品牌">
                                    <el-option v-for="item in trademarkList" :key="item.id" :label="item.tmName"
                                        :value="item.id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="SPU描述" prop="description">
                                <el-input v-model="spuAddForm.description" type="textarea" />
                            </el-form-item>
                            <el-form-item label="SPU照片" prop="spuImageList" required>
                                <el-upload v-model:file-list="visualSpuImageList" action="/api/admin/product/fileUpload"
                                    list-type="picture-card" :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove" :before-upload="handlePictureCardBefore"
                                    :on-success="() => formRef?.clearValidate('spuImageList')" :disabled="scene !== 3">
                                    <el-icon>
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                                <el-dialog v-model="showImageDetail">
                                    <img w-full :src="imageDetailUrl" alt="Preview Image" />
                                </el-dialog>
                            </el-form-item>
                            <el-form-item label="SPU销售属性" prop="spuSaleAttrList" required>
                                <div>
                                    <el-select v-model="spuBaseAttrIdCurrent" placeholder="请选择销售属性"
                                        @change="addAttrBtnDisabled = false">
                                        <el-option v-for="item in spuBaseAttrList" :key="item.id" :label="item.name"
                                            :value="item.id" :disabled="item.disabled" />
                                    </el-select>
                                    <el-button v-if="scene !== 3" type="primary" :icon="Plus" class="add_btn"
                                        @click="addAttrRow"
                                        :disabled="!spuBaseAttrIdCurrent || addAttrBtnDisabled">添加销售属性</el-button>
                                </div>
                                <el-table :data="spuAddForm.spuSaleAttrList" border style="width: 100%;margin-top: 10px;">
                                    <el-table-column label="序号" width="80" align="center" type="index" />
                                    <el-table-column prop="saleAttrName" label="属性名" width="180">
                                        <template #default="{ row }">
                                            {{ row.saleAttrName }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="属性值">
                                        <template #default="{ row, $index }">
                                            <el-tag v-for="(tag, index) in row.spuSaleAttrValueList" :key="index"
                                                class="mx-1" :closable="scene !== 3" :disable-transitions="false"
                                                style="margin-right: 10px;" @close="tagDelete($index, index)">
                                                {{ tag.saleAttrValueName }}
                                            </el-tag>
                                            <template v-if="scene !== 3">
                                                <el-input v-if="row.showAttrValueEdit" v-model.trim="tempAttrValue"
                                                    class="tag_class" size="small"
                                                    @keyup.enter="handleAttrValueInputConfirm(row, $index)"
                                                    @blur="handleAttrValueInputConfirm(row, $index)"
                                                    :ref="(vc: InputInstance) => attrValueInputRefArr[$index] = vc" />
                                                <el-button v-else size="small" class="tag_class"
                                                    @click="addAttrValue(row, $index)">
                                                    + 添加
                                                </el-button>
                                            </template>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" v-if="scene !== 3">
                                        <template #default="{ $index }">
                                            <el-button size="small" type="danger" :icon="Delete" title="删除该销售属性"
                                                @click="deleteAttr($index)" />
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </el-scrollbar>
                </div>
                <div class="operation_btn">
                    <el-button type="primary" @click="submitForm(formRef)" v-if="scene !== 3">保存</el-button>
                    <el-button @click="showAddSpu = false">{{ scene === 3 ? '返回' : '取消' }}</el-button>
                </div>
            </div>
            <Pagination @changeCb="getSpuList" ref="paginationRef" v-show="SpuInfoList.length && !showAddSpu" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue';
import Categories from '@/components/Categories/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue';
import type { SpuData, TrademarkData, SpuRequestData, SpuImage, SpuBaseAttr, SpuSaleAttr, SpuSaleAttrValue } from '@/api/spu/type';
import { reqGetTradeMarkList, reqGetBaseAttrList, reqSaveSpu, reqGetSpuImgList, reqGetSpuAttrList, reqUpdateSpu, reqDeleteSpu } from '@/api/spu/index';
import { reqGetSpuList } from "@/api/spu/index";
import { ElMessage } from 'element-plus';
import type { UploadProps, InputInstance, UploadUserFile, FormInstance, FormRules } from 'element-plus';

interface UploadUserFile2 extends UploadUserFile {
    response?: {
        data: string;
        code: number;
        message: string;
    }
}

// 三级分类 分类变化的回调
const categoriesChangeCB = (type: boolean) => {
    if (type) {
        getSpuList()
    } else {
        SpuInfoList.value = []
    }
}

// 三级分类结果
const categoriesRef = ref<InstanceType<typeof Categories> | null>(null)

// 获取SPU列表
const contentLoading = ref(false)

const SpuInfoList = ref([] as SpuData[])

const paginationRef = ref<InstanceType<typeof Pagination> | null>(null)

const getSpuList = async () => {
    if (!paginationRef.value) return

    contentLoading.value = true

    const page = paginationRef.value?.paginationData.currentPage as number
    const limit = paginationRef.value?.paginationData.pageSize as number
    const categories3Id = categoriesRef.value?.categoriesValue.levelThreeValue as number
    try {
        const { code, data, message } = await reqGetSpuList(page, limit, categories3Id)
        if (code === 200) {
            SpuInfoList.value = data.records
            paginationRef.value.paginationData.currentPage = data.current
            paginationRef.value.paginationData.total = data.total
            paginationRef.value.paginationData.pageSize = data.size
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }

    contentLoading.value = false
}

// 获取品牌列表
const trademarkList = ref([] as TrademarkData[])

const getTrademarkList = async () => {
    try {
        const { code, data, message } = await reqGetTradeMarkList()
        if (code === 200) {
            trademarkList.value = data
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }

}
// 新增SPU
const showAddSpu = ref(false)
const scene = ref<1 | 2 | 3>(1) // 1: 新增, 2: 修改, 3:查看

watch(showAddSpu, (nv) => {
    if (nv) {
        getTrademarkList()
        getBaseAttrList()
    }
})

// 照片列表
const showImageDetail = ref(false)
const imageDetailUrl = ref('')

// 仅用于页面展示图片墙
const visualSpuImageList = ref<UploadUserFile2[]>([])
let visualCurrentImageInfo = {} as SpuImage

watch(visualSpuImageList, (nv) => {
    let obj = nv.map(item => {
        if (item.response) {
            return {
                imgName: item.name,
                imgUrl: item.response.data
            }
        } else if (scene.value !== 1) {
            return {
                imgName: item.name,
                imgUrl: item.url
            }
        }
    }) as []
    if (obj.length) {
        spuAddForm.spuImageList = obj
    }
}, { deep: true })

const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
    const uid = uploadFile.uid
    const deleteIndex = spuAddForm.spuImageList.findIndex(item => item.uid === uid)
    spuAddForm.spuImageList.splice(deleteIndex, 1)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    imageDetailUrl.value = uploadFile.url!
    showImageDetail.value = true
}

const handlePictureCardBefore: UploadProps['beforeUpload'] = (uploadFile) => {
    const typeArr = ['image/jpeg', 'image/png', 'image/gif']
    if (!typeArr.includes(uploadFile.type)) {
        ElMessage.error('图片格式只能为JPEG|NG|GIF！')
        return false
    } else if (uploadFile.size / 1024 / 1024 > 4) {
        ElMessage.error('图片大小不能大于4MB！')
        return false
    }
    visualCurrentImageInfo = {} as SpuImage
    visualCurrentImageInfo.imgName = uploadFile.name
    visualCurrentImageInfo.uid = uploadFile.uid
    return true
}

// SPU销售属性
const spuBaseAttrList = ref([] as SpuBaseAttr[])
const spuBaseAttrIdCurrent = ref()

const getBaseAttrList = async () => {
    try {
        const { code, data, message } = await reqGetBaseAttrList()
        if (code === 200) {
            spuBaseAttrList.value = data
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

// 添加新的销售属性
const attrValueInputRefArr = ref<InputInstance[]>([])

const addAttrRow = () => {
    spuAddForm.spuSaleAttrList.push({
        baseSaleAttrId: spuBaseAttrIdCurrent.value,
        saleAttrName: spuBaseAttrList.value.find(item => item.id === spuBaseAttrIdCurrent.value)!.name,
        spuSaleAttrValueList: [] as SpuSaleAttrValue[],
        showAttrEdit: true,
        showAttrValueEdit: false
    })
}

const tempAttrValue = ref('')

const addAttrValue = (row: SpuSaleAttr, $index: number) => {
    row.showAttrValueEdit = true
    tempAttrValue.value = ''
    nextTick(() => {
        attrValueInputRefArr.value[$index].focus()
    })
}

const handleAttrValueInputConfirm = (row: SpuSaleAttr, $index: number) => {
    if (!tempAttrValue.value) {
        row.showAttrValueEdit = false
        return
    }

    if (row.spuSaleAttrValueList.some(item => item.saleAttrValueName === tempAttrValue.value)) {
        {
            ElMessage.error('属性值不能重复！')
            row.showAttrValueEdit = false
            return
        }
    }

    row.spuSaleAttrValueList.push({
        baseSaleAttrId: spuAddForm.spuSaleAttrList[$index].baseSaleAttrId,
        isChecked: false,
        saleAttrName: spuAddForm.spuSaleAttrList[$index].saleAttrName,
        saleAttrValueName: tempAttrValue.value,
    })
    row.showAttrValueEdit = false
}

const tagDelete = (rowIndex: number, tagIndex: number) => {
    spuAddForm.spuSaleAttrList[rowIndex].spuSaleAttrValueList.splice(tagIndex, 1)
}

const spuAddForm = reactive<SpuRequestData>({
    spuName: '',
    tmId: '' as unknown as number,
    description: "",
    spuImageList: [] as unknown as SpuImage[],
    spuSaleAttrList: [] as SpuSaleAttr[],
    category3Id: categoriesRef.value?.categoriesValue.levelThreeValue as number,
})

const imagesValidate = (_rule: any, _value: any, callback: any) => {
    if (spuAddForm.spuImageList.length) {
        callback()
    } else {
        callback(new Error('请至少上传一张该SPU图片！'))
    }
}

const saleAttrValidate = (_rule: any, _value: any, callback: any) => {
    if (spuAddForm.spuSaleAttrList.length) {
        callback()
    } else {
        callback(new Error('请至少选择并设置一个销售属性！'))
    }
}

const rules = reactive<FormRules<typeof spuAddForm>>({
    spuName: [
        { required: true, message: '请输入SPU的名称', trigger: 'blur' },
    ],
    tmId: [
        { required: true, message: '请选择品牌分类', trigger: 'change' }
    ],
    description: [
        { required: true, message: "请输入SPU描述", trigger: 'blur' }
    ],
    spuImageList: [
        { validator: imagesValidate }
    ],
    spuSaleAttrList: [
        { validator: saleAttrValidate }
    ],
})

const addAttrBtnDisabled = ref(false)

watch(() => spuAddForm.spuSaleAttrList, (nv) => {
    if (!nv) return
    if (nv.length) {
        // 下拉列表是否可选
        const existAttrIdList: number[] = []
        nv.forEach(item => existAttrIdList.push(item.baseSaleAttrId));
        spuBaseAttrList.value.forEach(item => {
            if (existAttrIdList.includes(item.id)) {
                item.disabled = true
            }
        })

        // 添加按钮是否可点击
        addAttrBtnDisabled.value = existAttrIdList.includes(spuBaseAttrIdCurrent.value)
    } else {
        spuBaseAttrList.value.forEach(item => item.disabled = false)
        addAttrBtnDisabled.value = false
    }
}, { deep: true })

const addSpu = () => {
    scene.value = 1
    showAddSpu.value = true;
    // 打开时 置空表单
    Object.assign(spuAddForm, {
        spuName: '',
        tmId: '' as unknown as number,
        description: "",
        spuImageList: [] as unknown as SpuImage[],
        spuSaleAttrList: [] as SpuSaleAttr[],
        category3Id: categoriesRef.value?.categoriesValue.levelThreeValue as number,
    })
}

// 提交按钮和取消按钮
const formRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
    // 拿不到数据
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            submit()
        } else {
            return false
        }
    })
}

const cardLoading = ref(false)

const submit = async () => {
    cardLoading.value = true
    try {
        const { code, message } = scene.value === 1 ? await reqSaveSpu(spuAddForm) : await reqUpdateSpu(spuAddForm)

        if (code === 200) {
            getSpuList()
            showAddSpu.value = false
            ElMessage.success(`${scene.value === 1 ? '新增' : "修改"}SPU成功`)
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }

    cardLoading.value = false
}

// 获取spu详情
const getSpuInfoImgs = async (spuId: number) => {
    try {
        const { code, data, message } = await reqGetSpuImgList(spuId)
        if (code === 200) {
            spuAddForm.spuImageList = data
            visualSpuImageList.value = data.map(item => {
                return {
                    name: item.imgName,
                    status: 'success',
                    url: item.imgUrl
                }
            })
        } else {
            ElMessage.error(message)

        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }

}

const getSpuInfoAttrs = async (spuId: number) => {
    try {
        const { code, data, message } = await reqGetSpuAttrList(spuId)
        if (code === 200) {
            spuAddForm.spuSaleAttrList = data
            if (data?.length) {
                spuBaseAttrIdCurrent.value = data[0].baseSaleAttrId
            }
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

// 修改|查看SPU
const updateAttr = (attrInfo: SpuData, sceneValue: 2 | 3) => {
    showAddSpu.value = true
    scene.value = sceneValue

    Object.assign(spuAddForm, attrInfo)
    getSpuInfoImgs(attrInfo.id)
    getSpuInfoAttrs(attrInfo.id)
}

// 删除spu销售属性
const deleteAttr = ($index: number) => {
    spuAddForm.spuSaleAttrList.splice($index, 1)
}

// 删除SPU
const deleteSpu = async (attrInfo: SpuData) => {
    try {
        const { code, message } = await reqDeleteSpu(attrInfo.id)
        if (code === 200) {
            ElMessage.success(`删除"${attrInfo.spuName}"成功`)
            getSpuList()
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

defineOptions({
    name: "SPU"
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
        height: calc(100% - $pagination_height);

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

        .add_btn {
            margin-left: 20px;
        }

        .tag_class {
            width: 60px;
        }

        .operation_btn {
            margin-top: 10px;
        }
    }

    :deep(.el-dialog__body) {
        text-align: center;
    }
}
</style>