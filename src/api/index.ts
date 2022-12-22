// api 统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () =>
    requests.get("/product/getBaseCategoryList");

// banner mock接口

export const reqBanner = () => mockRequests.get("/banner");
export const reqFloor = () => mockRequests.get("/floor");
