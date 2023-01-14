import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
import HomeView from "../views/HomeView/index.vue";
import searchView from "../views/search/index.vue";
import detailView from "../views/Detail/index.vue";
// 二级路由
import myOrderView from "../views/Center/myOrder.vue";
import groupView from "../views/Center/group.vue";

import { useUserStore } from "@/stores/user/index";

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/search/:keyword?",
            name: "search",
            component: searchView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/detail/:skuId",
            name: "detail",
            component: detailView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/addCart",
            name: "addCart",
            component: () => import("@/views/addCart/index.vue"),
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/shopCart",
            name: "shopCart",
            component: () => import("@/views/ShopCart/index.vue"),
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/trade",
            name: "trade",
            component: () => import("@/views/Trade/index.vue"),

            meta: {
                showFooter: true,
            },
            // 除非购物车来的, 否则不让进入trade
            beforeEnter(to, from, next) {
                if (from.path !== "/shopCart") {
                    next(false);
                } else next();
            },
        },
        {
            path: "/pay",
            name: "pay",
            component: () => import("@/views/Pay/index.vue"),

            meta: {
                showFooter: true,
            },
            beforeEnter(to, from, next) {
                if (from.path !== "/trade") {
                    next(false);
                } else next();
            },
        },
        {
            path: "/paySuccess",
            name: "paySuccess",
            component: () => import("@/views/PaySuccess/index.vue"),

            meta: {
                showFooter: true,
            },
        },
        {
            path: "/center",
            name: "center",
            component: () => import("@/views/Center/index.vue"),

            meta: {
                showFooter: true,
            },
            redirect: "/center/myOrder",
            children: [
                {
                    path: "/center/myOrder",
                    name: "myOrder",
                    component: myOrderView,
                },
                {
                    path: "/center/group",
                    name: "group",
                    component: groupView,
                },
            ],
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/Register/index.vue"),

            meta: {
                showFooter: false,
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login/index.vue"),

            meta: {
                showFooter: false,
            },
            beforeEnter(to, from, next) {
                // 如果登陆了还想登录, 那么就不进行跳转
                const store = useUserStore();
                if (store.token) {
                    next(false);
                    console.log("登陆了还想登录, 那么就不进行路由");
                } else {
                    next();
                }
            },
        },
    ],
    scrollBehavior(to, from, savePostilion) {
        return {
            top: 0,
        };
    },
});
router.beforeEach((to, from, next) => {
    const store = useUserStore();
    console.log(to.path, from.path);

    // 如果未登录且要去有权限的路由, 那么就跳转到登录
    const pattern = /pay|center|trade/;

    if (pattern.test(to.path) && !store.token) {
        // 如果包含了上述关键词, 那么就跳转到登陆界面
        // 注意携带原本要去的地址,
        next(`/login?redirect=${to.path}`);
    } else next();
});
export default router;
