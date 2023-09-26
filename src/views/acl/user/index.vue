<!--
 * 用户管理
 * @since: 2023-08-26
 * user.vue
-->
<template>
    <div style="height: 100%;">
        <el-card shadow="always" class="card_search">
            <el-form :inline="true" :model="userSearchForm" ref="searchFormRef" :disabled="!userList_clone.length">
                <el-form-item label="用户名">
                    <el-input v-model="userSearchForm.searchName" placeholder="请输入用户名" @keyup.enter="searchHandler" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="searchHandler">搜索</el-button>
                    <el-button size="default" @click="resetUserSearchForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="card_content" v-loading="contentLoading">
            <div class="card_content_top">
                <div class="operation_btns">
                    <el-button type="primary" size="default" @click="addHandler">添加</el-button>
                    <el-button type="danger" size="default">批量删除</el-button>
                </div>
                <el-table :data="userList" border style="width: 100%" class="table_view">
                    <el-table-column type="selection" align="center" width="50" />
                    <el-table-column type="index" align="center" width="70">
                        <template #header>
                            #
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" align="center" label="ID" width="70" />
                    <el-table-column prop="name" label="用户名" align="center" show-overflow-tooltip />
                    <el-table-column prop="username" label="用户名称" align="center" show-overflow-tooltip />
                    <el-table-column prop="roleName" label="用户角色" align="center" show-overflow-tooltip />
                    <el-table-column prop="createTime" label="创建时间" width="170" align="center" show-overflow-tooltip />
                    <el-table-column prop="updateTime" label="更新时间" width="170" align="center" show-overflow-tooltip />
                    <el-table-column label="操作" width="270" align="center">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" :icon="User"
                                @click="assignRoleHandler(row)">分配角色</el-button>
                            <el-button type="primary" size="small" @click="editHandler(row)" :icon="Edit">编辑</el-button>
                            <el-popconfirm :title='`确认删除用户"${row.name}"?`' @confirm="deleteUser(row)" width="200">
                                <template #reference>
                                    <el-button type="danger" size="small" :icon="Delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <Pagination ref="paginationRef" @change-cb="getUserList" />
        </el-card>
        <el-drawer v-model="showUserDrawer" :title="`${scene === 1 ? '新增' : '修改'}用户`" direction="rtl" size="30%">
            <el-form :model="userForm" ref="userFormRef" :rules="userFormRules">
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="userForm.name" placeholder="请填写用户名字" />
                </el-form-item>
                <el-form-item label="用户昵称" prop="username">
                    <el-input v-model="userForm.username" placeholder="请填写用户昵称" />
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="scene === 1">
                    <el-input v-model="userForm.password" placeholder="请填写用户密码" />
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button size="default" @click="resetUserForm(userFormRef)">重置</el-button>
                    <el-button type="primary" size="default" @click="submitUser(userFormRef)">确定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <el-drawer v-model="showRoleDrawer" title="分配用户角色" direction="rtl" size="30%">
            <el-form :model="roleForm" ref="roleFormRef" :rules="roleFormRules" v-loading="roleDrawerLoading">
                <el-form-item label="用户姓名" required>
                    <el-input v-model="roleForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="checkedRoleList">
                    <el-checkbox-group v-model="roleForm.checkedRoleList">
                        <el-checkbox v-for="role in allRolesList" :key="role.id" :label="role.roleName" />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button size="default" @click="resetUserForm(roleFormRef)">重置</el-button>
                    <el-button type="primary" size="default" @click="submitRole(roleFormRef)">确定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, toRefs } from 'vue'
import type { FormInstance } from 'element-plus'
import Pagination from '@/components/Pagination/index.vue'
import { reqGetUserList, reqDeleteUser, reqSaveUser, reqUpdateUser, reqGetRoleList, reqAssignRole } from '@/api/permission/user/index'
import type { UserData, UserFormRequest, RoleData } from '@/api/permission/user/type'
import { ElMessage, FormRules } from 'element-plus'
import { Delete, Edit, User } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash'
import useUserStore from '@/store/modules/user';
// import { reqUserInfo } from '@/api/user/index'

const userSearchForm = ref({ searchName: '' })

const searchFormRef = ref<FormInstance | null>(null)

// 提交搜索和重置按钮
const searchHandler = () => {
    userList.value = userList.value.filter(item => item.name.includes(userSearchForm.value.searchName))
}

const resetUserSearchForm = () => {
    userSearchForm.value.searchName = ''
    userList.value = cloneDeep(userList_clone.value)
}

// 获取用户列表
const paginationRef = ref<InstanceType<typeof Pagination> | null>(null);

const userList = ref([] as UserData[])

const userList_clone = ref([] as UserData[])

const contentLoading = ref(false)

const getUserList = async (pageNum?: number) => {
    if (!paginationRef.value) return
    const { currentPage: page, pageSize: limit } = paginationRef.value.paginationData

    contentLoading.value = true

    try {
        const { message, code, data } = await reqGetUserList(pageNum || page, limit)
        if (code === 200) {
            userList.value = data.records
            userList_clone.value = data.records
            paginationRef.value.paginationData.pageSize = data.size
            paginationRef.value.paginationData.total = data.total
            paginationRef.value.paginationData.currentPage = data.current
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }

    contentLoading.value = false
}

onMounted(() => {
    getUserList()
})

// 添加用户
const showUserDrawer = ref(false)

const scene = ref<1 | 2>(1) // 1: 新增; 2: 修改

const addHandler = () => {
    Object.assign(userForm, {
        name: '',
        username: '',
        password: ""
    })

    showUserDrawer.value = true
    scene.value = 1
}

const userFormRef = ref<FormInstance | null>(null)

const userForm = reactive<UserFormRequest>({
    name: '',
    username: '',
    password: ""
})

const validatorName = (_rule: any, value: string, callback: any) => {
    if (value.length < 5) {
        callback(new Error('用户姓名不能小于5位'))
    } else {
        callback()
    }
}

const validatorUsername = (_rule: any, value: string, callback: any) => {
    if (value.length < 5) {
        callback(new Error('用户昵称不能小于5位'))
    } else {
        callback()
    }
}

const validatorPassword = (_rule: any, value: string, callback: any) => {
    if (value.length < 5) {
        callback(new Error('密码不能小于6位'))
    } else {
        callback()
    }
}

const userFormRules = reactive<FormRules>({
    name: [
        { required: true, validator: validatorName, trigger: 'blur' }
    ],
    username: [
        { required: true, validator: validatorUsername, trigger: "blur" }
    ],
    password: [
        { required: true, validator: validatorPassword, trigger: "blur" }
    ]
})

const submitUser = async (formEl: FormInstance | null) => {
    if (!formEl) return
    await formEl.validate(valid => {
        if (valid) {
            saveUser()
        } else {
            return
        }
    })
}

// 获取用户小仓库的数据
const userStore = useUserStore()

const saveUser = async () => {
    try {
        const { code, data, message } = scene.value === 1 ? await reqSaveUser(userForm) : await reqUpdateUser(userForm)
        if (code === 200) {
            ElMessage.success(`${scene.value === 1 ? '新增' : '修改'}用户成功`)
            showUserDrawer.value = false
            // 如果修改的是自己 需要重新加载
            if (userStore.userInfo.name === userForm.name) {
                window.location.reload()
            }
            // 新增账号返回第一页
            scene.value === 1 ? getUserList(1) : getUserList()
        } else {
            ElMessage.error(message && data)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

// 重置表单
const resetUserForm = (formEl: FormInstance | null) => {
    if (!formEl) return
    formEl.resetFields()
}

// 修改用户信息
const editHandler = (row: UserData) => {
    const obj = {
        username: row.username,
        name: row.name,
        id: row.id
    }
    Object.assign(userForm, obj)

    showUserDrawer.value = true
    scene.value = 2
}

// 删除用户
const deleteUser = async (row: UserData) => {
    contentLoading.value = true

    try {
        const { code, message } = await reqDeleteUser(row.id)
        if (code === 200) {
            ElMessage.success(`删除用户 "${row.name}" 成功`)
            getUserList()
        } else {
            ElMessage.error(message)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }

    contentLoading.value = false
}

// 分配角色
const showRoleDrawer = ref(false)
const roleDrawerLoading = ref(false)

interface RoleForm {
    id: number;
    name: string;
    checkedRoleList: string[];
}

const roleForm = reactive<RoleForm>({ id: 0, name: '', checkedRoleList: [] })

const validatorRole = (_rule: any, value: any[], callback: any) => {
    if (Array.isArray(value) && value.length) {
        callback()
    } else {
        callback(new Error('请至少选择一个角色！'))
    }
}

const roleFormRules = reactive<FormRules>({
    checkedRoleList: [
        { required: true, validator: validatorRole, trigger: "change" }
    ]
})

const allRolesList = ref<RoleData[]>([])

// 获取角色列表
const getRoleList = async (adminId: number) => {
    try {
        const { code, message, data } = await reqGetRoleList(adminId)
        if (code === 200) {
            allRolesList.value = data.allRolesList
            roleForm.checkedRoleList = data.assignRoles.map(item => item.roleName)
        } else {
            ElMessage.error(message || (data as unknown as string))
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
}

const assignRoleHandler = (row: UserData) => {
    getRoleList(row.id)
    roleForm.id = row.id
    roleForm.name = row.name
    showRoleDrawer.value = true
}

// 提交角色表单
const roleFormRef = ref<FormInstance | null>(null)

const submitRole = async (formEl: FormInstance | null) => {
    if (!formEl) return

    await formEl.validate(valid => {
        if (valid) {
            assignRole()
        }
    })
}

const assignRole = async () => {
    roleDrawerLoading.value = true

    try {
        const { id, checkedRoleList } = toRefs(roleForm)
        const roleId = checkedRoleList.value.map(item => {
            return allRolesList.value.find(roles => roles.roleName === item)?.id
        }) as number[]

        const { code, message, data } = await reqAssignRole({ userId: id.value, roleIdList: roleId })
        if (code === 200) {
            showRoleDrawer.value = false
            getUserList()
        } else {
            ElMessage.error(message || data)
        }
    } catch (error) {
        ElMessage.error((error as Error).message)
    }
    roleDrawerLoading.value = false
}

defineOptions({
    name: 'User'
})
</script>

<style scoped lang="scss">
.card_search {
    height: 72px;
    margin-bottom: 20px;
}

.card_content {
    height: calc(100% - 72px - 20px);

    :deep(.el-card__body) {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card_content_top {
        height: calc(100% - 32px);

        .table_view {
            margin-top: 10px;
            height: calc(100% - 32px - 10px);
        }
    }
}
</style>