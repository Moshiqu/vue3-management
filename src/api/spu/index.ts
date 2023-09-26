import request from '@/utils/request'
import { CommonInterfaceSPU, CommonInterfaceTM, SpuRequestData, CommonResponse, SpuBaseAttrResponse, SpuImgResponse, SpuInfoAttrResponse } from './type'

enum API {
    SPU_LIST_URL = '/admin/product',
    TRADEMARK_LIST_URL = '/admin/product/baseTrademark/getTrademarkList',
    SPU_SAVE_URL = '/admin/product/saveSpuInfo',
    SPU_BASE_ATTR_LIST_URL = '/admin/product/baseSaleAttrList',
    SPU_DETAIL_IMGS_URL = '/admin/product/spuImageList',
    SPU_DETAIL_ATTR_URL = '/admin/product/spuSaleAttrList',
    SPU_UPDATE_URL = '/admin/product/updateSpuInfo',
    SPU_DELETE_URL = '/admin/product/deleteSpu'
}

// 分页获取SPU列表
export const reqGetSpuList = (page: number, limit: number, category3Id: number) => request.get<string, CommonInterfaceSPU>(`${API.SPU_LIST_URL}/${page}/${limit}?category3Id=${category3Id}`)

// 获取全部品牌列表
export const reqGetTradeMarkList = () => request.get<string, CommonInterfaceTM>(API.TRADEMARK_LIST_URL)

// 新增SPU
export const reqSaveSpu = (data: SpuRequestData) => request.post<string, CommonResponse>(API.SPU_SAVE_URL, data)

// 获取基础销售属性列表
export const reqGetBaseAttrList = () => request.get<string, SpuBaseAttrResponse>(API.SPU_BASE_ATTR_LIST_URL)

// 获取单个spu的图片列表
export const reqGetSpuImgList = (spuId: number) => request.get<string, SpuImgResponse>(API.SPU_DETAIL_IMGS_URL + '/' + spuId)

// 获取单个spu的属性列表
export const reqGetSpuAttrList = (spuId: number) => request.get<string, SpuInfoAttrResponse>(`${API.SPU_DETAIL_ATTR_URL}/${spuId}`)

// 更新单个spu数据
export const reqUpdateSpu = (data: SpuRequestData) => request.post<string, CommonResponse>(API.SPU_UPDATE_URL, data)

// 删除单个spu
export const reqDeleteSpu = (spuId: number) => request.delete<string,CommonResponse>(`${API.SPU_DELETE_URL}/${spuId}`)