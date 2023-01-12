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
export const reqShopCart = () => {
    return requests.get("/cart/cartList");
};
export const reqDelShopCart = (skuId: number) => {
    return requests.delete(`/cart/deleteCart/${skuId}`);
};
export const reqChangeChecked = (skuId: number, isChecked: 0 | 1) => {
    return requests.get(`/cart/checkCart/${skuId}/${isChecked}`);
};
// 请求验证码
export const reqCode = (phone: number) => {
    return requests.get(`/user/passport/sendCode/${phone}`);
};

// 注册
export const reqRegister = (userInfo: {
    phone: number;
    password: string;
    code: number;
}) => {
    return requests.post(`/user/passport/register`, userInfo, {});
};
// 登录
export const reqLogin = (userInfo: { phone: number; password: string }) => {
    return requests.post("/user/passport/login", userInfo);
};
// 获取用户信息
export const reqUserInfo = () => {
    return requests.get("/user/passport/auth/getUserInfo");
};

// 登出接口
export const reqUserLogout = () => {
    return requests.get("/user/passport/logout");
};

// 获取收货地址

export const reqAddress = () => {
    return requests.get("/user/userAddress/auth/findUserAddressList");
};

// 获取订单页信息
export const reqTardeInfo = () => {
    return requests.get("/order/auth/trade");
};
// 提交订单
export const reqSubmitOrder = (
    tradeNo: string,
    data: {
        consignee: string;
        consigneeTel: string;
        deliveryAddress: string;
        paymentWay: string;
        orderComment: string;
        orderDetailList: Array<{}>;
    },
) => {
    return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
};

// 17. 获取订单支付信息
// /payment/eiinwx/createNative/{ orderId };

export const reqPay = (orderId: string) => {
    return requests.get(`/payment/weixin/createNative/${orderId}`);
};
