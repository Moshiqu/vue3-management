import request from '@/utils/request'
import type { UserListResponse, UserFormRequest, UserFormResponse, UserRoleResponse, AssginRolesRequest } from '@/api/permission/user/type'

enum API {
    USER_LIST_URL = '/admin/acl/user',
    USER_SAVE_URL = '/admin/acl/user/save',
    USER_UPDATE_URL = '/admin/acl/user/update',
    USER_DELETE_URL = '/admin/acl/user/remove',
    USER_ROLE_LIST_URL = '/admin/acl/user/toAssign',
    USER_ROLE_ASSIGN_URL = '/admin/acl/user/doAssignRole'
}

// 获取用户列表
export const reqGetUserList = (page: number, limit: number) => request.get<string, UserListResponse>(`${API.USER_LIST_URL}/${page}/${limit}`)

// 新增用户
export const reqSaveUser = (data: UserFormRequest) => request.post<string, UserFormResponse>(API.USER_SAVE_URL, data)

// 删除用户
export const reqDeleteUser = (id: number) => request.delete<string, UserFormResponse>(`${API.USER_DELETE_URL}/${id}`)

// 修改用户
export const reqUpdateUser = (data: UserFormRequest) => request.put<string, UserFormResponse>(API.USER_UPDATE_URL, data)

// 获取用户角色列表
export const reqGetRoleList = (adminId: number) => request.get<string, UserRoleResponse>(`${API.USER_ROLE_LIST_URL}/${adminId}`)

// 提交用户角色
export const reqAssignRole = (data: AssginRolesRequest) => request.post<string, UserFormResponse>(API.USER_ROLE_ASSIGN_URL, data)