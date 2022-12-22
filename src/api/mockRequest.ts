import axios from "axios";
import nprogress from "nprogress";

const mockRequests = axios.create({
    baseURL: "/mock",
});

// 添加请求拦截器
mockRequests.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // console.log(config);
        // 开始进度条
        nprogress.start();
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error.message);
        nprogress.done();

        return Promise.reject(error);
    },
);

// 添加响应拦截器
mockRequests.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // console.log(response.data);
        nprogress.done();

        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log(error.message);
        nprogress.done();

        return Promise.reject(error);
    },
);
export default mockRequests;
