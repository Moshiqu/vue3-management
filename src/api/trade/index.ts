// 统一管理品牌相关接口
import request from "@/utils/request";
import type { TradeMarkResponse, TradeMark } from './type'

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark',
    SAVE_TRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove'
}

// 获取品牌列表分页
export const reqHasTrademark = (page: number, limit: number) => request.get<string, TradeMarkResponse>(`${API.TRADEMARK_URL}/${page}/${limit}`)

// 新增品牌
export const reqSaveTrademark = (data: TradeMark) => request.post<string, TradeMarkResponse>(API.SAVE_TRADEMARK_URL, data)

// 修改品牌
export const reqUpdateTrademark = (data: TradeMark) => request.put<string, TradeMarkResponse>(API.UPDATE_TRADEMARK_URL, data)

// 删除品牌
export const reqDeleTrademark = (trademarkId: number) => request.delete<string, TradeMarkResponse>(`${API.DELETE_TRADEMARK_URL}/${trademarkId}`)