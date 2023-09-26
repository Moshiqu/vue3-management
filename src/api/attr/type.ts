// 属性管理
// 分类
export interface AttrCategory {
    code: number;
    message: string;
    data: AttrCategoryData[];
    ok: boolean;
}

export interface AttrCategoryData {
    id: number;
    name: string;
    category1Id?: number
}

// 属性详情
export interface AttrInfoList {
    code: number;
    message: string;
    data: AttrData[];
    ok: boolean;
}

export interface AttrData {
    id?: number;
    attrName: string;
    categoryId: number;
    categoryLevel: number;
    attrValueList: AttrValueList[];
}

export interface AttrValueList {
    id?: number;
    valueName: string;
    inputVisible: boolean;
    attrId?: number;
}

// 新增和修改属性 有id为修改, 没有id为新增
// export interface SaveAttrInfoReq {
//     attrName: string;
//     attrValueList: SaveAttrInfo[];
//     categoryId: number;
//     categoryLevel: number;
//     id?: number;
// }

// export interface SaveAttrInfo {
//     attrId?: number;
//     id?: number;
//     valueName: string;
// }

// export interface SaveAttrInfoResponse {
//     code: number;
//     message: string;
//     data: null;
//     ok: boolean;
// }