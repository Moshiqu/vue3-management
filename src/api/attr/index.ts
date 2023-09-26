import request from "@/utils/request";
import type { AttrCategory, AttrInfoList, AttrData } from "./type";

enum API {
    CATEGORY1_URL = '/admin/product/getCategory1',
    CATEGORY2_URL = '/admin/product/getCategory2',
    CATEGORY3_URL = '/admin/product/getCategory3',
    ATTR_INFO_LIST_URL = '/admin/product/attrInfoList',
    ATTR_INFO_UPDATE_URL = '/admin/product/saveAttrInfo',
    ATTR_INFO_DELE_URL = '/admin/product/deleteAttr'
}

// 一级分类
export const reqCategory1 = () => request.get<string, AttrCategory>(API.CATEGORY1_URL)

// 二级分类
export const reqCategory2 = (cate1Id: number) => request.get<string, AttrCategory>(`${API.CATEGORY2_URL}/${cate1Id}`)

// 三级分类
export const reqCategory3 = (cate2Id: number) => request.get<string, AttrCategory>(`${API.CATEGORY3_URL}/${cate2Id}`)

// 商品属性列表
export const reqAttrInfoList = (cate1Id: number, cate2Id: number, cate3Id: number) => request.get<string, AttrInfoList>(`${API.ATTR_INFO_LIST_URL}/${cate1Id}/${cate2Id}/${cate3Id}`)

// 修改和新增商品属性
export const reqSaveAttr = (data: AttrData) => request.post<string, AttrInfoList>(API.ATTR_INFO_UPDATE_URL, data)

// 删除商品属性
export const reqDeleteAttr = (attrId: number) => request.delete<string, AttrInfoList>(`${API.ATTR_INFO_DELE_URL}/${attrId}`)