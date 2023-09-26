interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

// 获取用户列表接口请求
export interface UserListResponse extends ResponseData {
    data: UserListData;
}

interface UserListData {
    records: UserData[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId?: any;
    maxLimit?: any;
    searchCount: boolean;
    pages: number;
}

export interface UserData {
    id: number;
    createTime: string;
    updateTime: string;
    username: string;
    password: string;
    name: string;
    phone?: any;
    roleName: string;
}

// 添加新用户
export interface UserFormRequest {
    name: string;
    username: string;
    password?: string;
    id?: number;
}

export interface UserFormResponse extends ResponseData {
    data: any;
}

// 获取用户角色列表
export interface UserRoleResponse extends ResponseData {
    data: UserRole;
}

interface UserRole {
    assignRoles: RoleData[];
    allRolesList: RoleData[];
}

export interface RoleData {
    id: number;
    createTime: string;
    updateTime: string;
    roleName: string;
    remark?: any;
    name?: string;
}

// 提交用户角色
export interface AssginRolesRequest {
    userId: number,
    roleIdList: number[]
}
