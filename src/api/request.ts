import axios from "axios";
import nprogress from "nprogress";
import { useShopCartStore } from "./../stores/shopCart/index";
import { useUserStore } from "./../stores/user/index";

const requests = axios.create({
    baseURL: "/api",
});

// 添加请求拦截器
requests.interceptors.request.use(
    function (config) {
        const shopStore = useShopCartStore();
        const userStore = useUserStore();

        // 在发送请求之前做些什么
        // 添加用户临时id的请求头
        if (shopStore.uuidToken && config.headers) {
            config.headers.userTempId = shopStore.uuidToken;
        }
        // 如果token存在, 就添加token请求头
        if (userStore.token && config.headers) {
            config.headers.token = userStore.token;
        }
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
requests.interceptors.response.use(
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
export default requests;
