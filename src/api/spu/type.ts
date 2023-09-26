// SPU列表返回类型
export interface CommonInterfaceSPU {
    code: number;
    message: string;
    data: SpuList;
    ok: boolean;
}

export interface SpuList {
    records: SpuData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}

export interface SpuData {
    id: number;
    spuName: string;
    description: string;
    category3Id: number;
    tmId: number;
    spuSaleAttrList?: any;
    spuImageList?: any;
}

// 品牌属性
export interface CommonInterfaceTM {
    code: number;
    message: string;
    data: TrademarkData[];
    ok: boolean;
}

export interface TrademarkData {
    id: number;
    tmName: string;
    logoUrl: string;
}

// 新增SPU 参数
export interface SpuRequestData {
    category3Id: number;
    description: string;
    id?: number;
    spuImageList: SpuImage[];
    spuName: string;
    spuSaleAttrList: SpuSaleAttr[];
    tmId: number;
}

export interface SpuSaleAttr {
    baseSaleAttrId: number;
    id?: number;
    saleAttrName: string;
    spuId?: number;
    spuSaleAttrValueList: SpuSaleAttrValue[];
    showAttrEdit?: boolean;
    showAttrValueEdit?: boolean;
    createTime?: any;
    updateTime?: any;
}

export interface SpuSaleAttrValue {
    baseSaleAttrId: number;
    id?: number;
    isChecked?: boolean;
    saleAttrName: string;
    saleAttrValueName: string;
    spuId?: number;
    createTime?: any;
    updateTime?: any;
}

export interface SpuImage {
    id?: number;
    imgName: string;
    imgUrl: string;
    uid?: number;
    spuId?: number;
}

// 新增SPU 返回
export interface CommonResponse {
    code: number;
    message: string;
    data?: any;
    ok: boolean;
}

// 销售属性
export interface SpuBaseAttrResponse {
    code: number;
    message: string;
    data: SpuBaseAttr[];
    ok: boolean;
}

export interface SpuBaseAttr {
    id: number;
    name: string;
    disabled: boolean;
}

// 单个spu图片列表
export interface SpuImgResponse {
    code: number;
    message: string;
    data: SpuInfoImg[];
    ok: boolean;
}

interface SpuInfoImg {
    id: number;
    createTime: string;
    updateTime: string;
    spuId: number;
    imgName: string;
    imgUrl: string;
}

// 单个spu属性列表
export interface SpuInfoAttrResponse {
    code: number;
    message: string;
    data: SpuInfoAttr[];
    ok: boolean;
}

interface SpuInfoAttr {
    id: number;
    createTime?: any;
    updateTime?: any;
    spuId: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    spuSaleAttrValueList: SpuSaleAttrData[];
}

interface SpuSaleAttrData {
    id: number;
    createTime?: any;
    updateTime?: any;
    spuId: number;
    baseSaleAttrId: number;
    saleAttrValueName: string;
    saleAttrName: string;
    isChecked?: any;
}

// 单个SPU更新
