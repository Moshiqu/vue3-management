<!--
 * Dialog 品牌添加和修改对话框
 * @since: 2023-08-30
 * Dialog.vue
-->
<template  v-loading="dialogLoading">
    <el-dialog v-model="showDialog" :title="dialogType === 'add' ? '添加品牌' : '修改品牌'">
        <el-form :model="trademarkForm" label-width="120px" :rules="rules" ref="formRef" style="width: 85%;">
            <el-form-item label="品牌名称" prop="tmName">
                <el-input v-model="trademarkForm.tmName" />
            </el-form-item>

            <el-form-item label="品牌LOGO" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleLogoSuccess" :before-upload="beforeLogoUpload" v-loading="imageLoading">
                    <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <UploadFilled />
                    </el-icon>
                </el-upload>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { reqSaveTrademark, reqUpdateTrademark } from "@/api/trade/index"
import type { TradeMark, trademarkData, LogoUploadResponse } from '@/api/trade/type'

const showDialog = ref(false)
const dialogType = ref<'add' | 'edit'>('add')

// 表单
const trademarkForm = reactive<TradeMark>({
    id: 0,
    tmName: '',
    logoUrl: ''
})

const rules = reactive<FormRules<TradeMark>>({
    tmName: [
        { required: true, message: '品牌名称不能为空', trigger: 'change' },
        { min: 2, max: 10, message: '品牌名称不能超过十个字符', trigger: 'change' },
    ],
    logoUrl: [
        { required: true, message: '品牌图片不能为空', trigger: 'change' },
    ],
})

const formRef = ref<FormInstance>()

// 图片处理
const imageLoading = ref(false)

const beforeLogoUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const typeArr = ['image/jpeg', 'image/png', 'image/gif']
    if (!typeArr.includes(rawFile.type)) {
        ElMessage.error('图片格式只能为JPEG|NG|GIF！')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('图片大小不能大于4MB！')
        return false
    }
    imageLoading.value = true
    return true
}

const handleLogoSuccess: UploadProps['onSuccess'] = (response: LogoUploadResponse) => {
    formRef.value?.clearValidate('logoUrl')
    imageLoading.value = false
    trademarkForm.logoUrl = response.data
}

// 对话框按钮事件
const open = (type: 'add' | 'edit', trademarkData: trademarkData) => {
    if (type === 'edit') {
        const { id, logoUrl, tmName } = trademarkData
        trademarkForm.id = id
        trademarkForm.logoUrl = logoUrl
        trademarkForm.tmName = tmName
    } else {
        trademarkForm.id = 0
        trademarkForm.tmName = ''
        trademarkForm.logoUrl = ''
    }
    formRef.value?.clearValidate()

    dialogType.value = type
    showDialog.value = true
}

const close = () => {
    showDialog.value = false
}

const $emits = defineEmits(['refresh'])

const dialogLoading = ref(false)
const submit = async () => {
    dialogLoading.value = true
    try {
        const { code, message } = trademarkForm.id ? await reqUpdateTrademark(trademarkForm) : await reqSaveTrademark(trademarkForm)
        if (code === 200) {
            dialogLoading.value = false
            ElMessage.success(trademarkForm.id ? '修改品牌成功' : '新增品牌成功')
            close()
            $emits('refresh')
        } else {
            dialogLoading.value = false
            ElMessage.error(message)
        }
    } catch (error) {
        dialogLoading.value = false
        ElMessage.error((error as Error).message)
    }
}

const confirm = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            submit()
        } else {
            return
        }
    })
}

defineOptions({
    name: 'TrandemarkDialog'
})

defineExpose({ open })
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

:deep(.avatar-uploader .el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>