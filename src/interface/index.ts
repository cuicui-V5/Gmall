export interface floorListType {
    id: string;
    name: string;
    keywords: string[];
    imgUrl: string;
    navList: NavList[];
    carouselList: CarouselList[];
    recommendList: string[];
    bigImg: string;
}

interface NavList {
    url: string;
    text: string;
}

interface CarouselList {
    id: string;
    imgUrl: string;
}

export interface searchListType {
    trademarkList: TrademarkList[];
    attrsList: AttrsList[];
    goodsList: GoodsList[];
    total: number;
    pageSize: number;
    pageNo: number;
    totalPages: number;
}

interface TrademarkList {
    tmId: number;
    tmName: string;
}

interface AttrsList {
    attrId: number;
    attrValueList: string[];
    attrName: string;
}

interface GoodsList {
    id: number;
    defaultImg: string;
    title: string;
    price: number;
    createTime: any;
    tmId: any;
    tmName: any;
    category1Id: any;
    category1Name: any;
    category2Id: any;
    category2Name: any;
    category3Id: any;
    category3Name: any;
    hotScore: number;
    attrs: any;
}
export interface getSearchListParamsType {
    category1Id?: string;
    category2Id?: string;
    category3Id?: string;
    categoryName?: string;
    keyword?: string;
    order?: string;
    pageNo?: number;
    pageSize?: number;
    props?: string[];
    trademark?: string;
}

export interface GoodsInfoType {
    valuesSkuJson: string;
    price: number;
    categoryView: CategoryView;
    spuSaleAttrList: any[];
    skuInfo: SkuInfo;
}

interface CategoryView {
    id: number;
    category1Id: number;
    category1Name: string;
    category2Id: number;
    category2Name: string;
    category3Id: number;
    category3Name: string;
}

interface SkuInfo {
    id: number;
    spuId: number;
    price: number;
    skuName: string;
    skuDesc: string;
    weight: string;
    tmId: number;
    category3Id: number;
    skuDefaultImg: string;
    isSale: number;
    createTime: string;
    skuImageList: SkuImageList[];
    skuAttrValueList: SkuAttrValueList[];
    skuSaleAttrValueList: SkuSaleAttrValueList[];
}

interface SkuImageList {
    id: number;
    skuId: number;
    imgName: string;
    imgUrl: string;
    spuImgId: number;
    isDefault: string;
}

interface SkuAttrValueList {
    id: number;
    attrId: number;
    valueId: number;
    skuId: number;
    attrName: string;
    valueName: string;
}

interface SkuSaleAttrValueList {
    id: number;
    skuId: number;
    spuId: number;
    saleAttrValueId: number;
    saleAttrId: number;
    saleAttrName: string;
    saleAttrValueName: string;
}
