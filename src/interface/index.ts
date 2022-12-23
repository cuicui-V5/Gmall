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
