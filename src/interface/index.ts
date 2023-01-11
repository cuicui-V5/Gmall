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
    spuSaleAttrList: SpuSaleAttrList[];
    skuInfo: SkuInfo;
}

export interface CategoryView {
    id: number;
    category1Id: number;
    category1Name: string;
    category2Id: number;
    category2Name: string;
    category3Id: number;
    category3Name: string;
}

export interface SpuSaleAttrList {
    id: number;
    spuId: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    spuSaleAttrValueList: SpuSaleAttrValueList[];
}

export interface SpuSaleAttrValueList {
    id: number;
    spuId: number;
    baseSaleAttrId: number;
    saleAttrValueName: string;
    saleAttrName: string;
    isChecked: string;
}

export interface SkuInfo {
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

export interface SkuImageList {
    id: number;
    skuId: number;
    imgName: string;
    imgUrl: string;
    spuImgId: number;
    isDefault: string;
}

export interface SkuAttrValueList {
    id: number;
    attrId: number;
    valueId: number;
    skuId: number;
    attrName: string;
    valueName: string;
}

export interface SkuSaleAttrValueList {
    id: number;
    skuId: number;
    spuId: number;
    saleAttrValueId: number;
    saleAttrId: number;
    saleAttrName: string;
    saleAttrValueName: string;
}
export interface shopCartInfo {
    cartInfoList: CartInfoList[];
    activityRuleList: any;
    createTime: string;
}

export interface CartInfoList {
    id: number;
    userId: string;
    skuId: number;
    cartPrice: number;
    skuNum: number;
    imgUrl: string;
    skuName: string;
    isChecked: number;
    createTime: string;
    operateTime: string;
    isOrdered: number;
    orderTime: any;
    sourceType: string;
    sourceId: number;
    skuPrice: number;
    couponInfoList: any;
}
export interface userInfo {
    id: number;
    loginName: string;
    nickName: string;
    passwd: string;
    name: string;
    phoneNum: string;
    email: any;
    headImg: string;
    userLevel: string;
    status: number;
    birthday: any;
    gender: string;
    createTime: string;
    operateTime: string;
    openId: any;
}

export interface tradeInfoType {
    totalAmount: number;
    userAddressList: UserAddressList[];
    tradeNo: string;
    totalNum: number;
    originalTotalAmount: number;
    couponInfoList: any[];
    detailArrayList: DetailArrayList[];
    activityReduceAmount: number;
    orderDetailVoList: OrderDetailVoList[];
}

export interface UserAddressList {
    id: number;
    userAddress: string;
    userId: number;
    provinceId: number;
    consignee: string;
    phoneNum: string;
    isDefault: string;
    regionId: number;
    fullAddress: string;
}

export interface DetailArrayList {
    id: any;
    orderId: any;
    skuId: number;
    skuName: string;
    imgUrl: string;
    orderPrice: number;
    skuNum: number;
    createTime: any;
    sourceType: string;
    sourceId: number;
    splitTotalAmount: any;
    splitActivityAmount: any;
    splitCouponAmount: any;
    refundStatus: string;
    refundStatusString: string;
    hasStock: any;
    activityRule: any;
    couponInfoList: any;
}

export interface OrderDetailVoList {
    orderDetailList: OrderDetailList[];
    activityRule: any;
}

export interface OrderDetailList {
    id: any;
    orderId: any;
    skuId: number;
    skuName: string;
    imgUrl: string;
    orderPrice: number;
    skuNum: number;
    createTime: any;
    sourceType: string;
    sourceId: number;
    splitTotalAmount: any;
    splitActivityAmount: any;
    splitCouponAmount: any;
    refundStatus: string;
    refundStatusString: string;
    hasStock: any;
    activityRule: any;
    couponInfoList: any;
}
