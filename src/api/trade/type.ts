// 品牌接口
// 分页列表
export interface TradeMark {
    id?: number;
    tmName: string;
    logoUrl: string;
}

interface TradeMarkResponseData {
    records: TradeMark[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

export interface TradeMarkResponse {
    code: number;
    message: string;
    data: TradeMarkResponseData;
    ok: boolean;
}

export interface trademarkData {
    id: number;
    createTime: string;
    updateTime: string;
    tmName: string;
    logoUrl: string;
}

// 图片上传
export interface LogoUploadResponse {
    code: number;
    message: string;
    data: string;
    ok: boolean;
}