// api 统一管理
import requests from "./request";
import mockRequests from "./mockRequest";
import type { getSearchListParamsType } from "@/interface";

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () =>
    requests.get("/product/getBaseCategoryList");

// banner mock接口

export const reqBanner = () => mockRequests.get("/banner");
export const reqFloor = () => mockRequests.get("/floor");

// 搜索接口
export const reqSearchList = (params: getSearchListParamsType) =>
    requests.post("/list", params, {});

// 获取商品详情
export const reqGoodsInfo = (skuId: number) => requests.get(`/item/${skuId}`);

// 添加购物车
export const reqAddCart = async (skuId: number, skuNum: number) => {
    const res = await requests.post(`/cart/addToCart/${skuId}/${skuNum}`);
    if (res.data.code == 200) {
        return "ok";
    } else {
        return Promise.reject(new Error("添加失败"));
    }
};
export const reqShopCart = async () => {
    return requests.get("/cart/cartList");
};
export const reqDelShopCart = async (skuId: number) => {
    return requests.delete(`/cart/deleteCart/${skuId}`);
};
export const reqChangeChecked = async (skuId: number, isChecked: 0 | 1) => {
    return requests.get(`/cart/checkCart/${skuId}/${isChecked}`);
};
// 请求验证码
export const reqCode = async (phone: number) => {
    return requests.get(`/user/passport/sendCode/${phone}`);
};

// 注册
export const reqRegister = async (userInfo: {
    phone: number;
    password: string;
    code: number;
}) => {
    return requests.post(`/user/passport/register`, userInfo, {});
};
