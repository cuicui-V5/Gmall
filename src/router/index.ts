import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/index.vue";
import searchView from "../views/search/index.vue";
import detailView from "../views/Detail/index.vue";
import addCartView from "../views/addCart/index.vue";

import registerView from "../views/Register/index.vue";
import loginView from "../views/Login/index.vue";
import shopCartView from "../views/ShopCart/index.vue";
import tradeView from "../views/Trade/index.vue";
import payView from "../views/Pay/index.vue";
import paySuccessView from "../views/PaySuccess/index.vue";
import centerView from "../views/Center/index.vue";
// 二级路由
import myOrderView from "../views/Center/myOrder.vue";
import groupView from "../views/Center/group.vue";

import { useUserStore } from "@/stores/user/index";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            component: addCartView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/shopCart",
            name: "shopCart",
            component: shopCartView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/trade",
            name: "trade",
            component: tradeView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/pay",
            name: "pay",
            component: payView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/paySuccess",
            name: "paySuccess",
            component: paySuccessView,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/center",
            name: "center",
            component: centerView,
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
            component: registerView,
            meta: {
                showFooter: false,
            },
        },
        {
            path: "/login",
            name: "login",
            component: loginView,
            meta: {
                showFooter: false,
            },
            beforeEnter(to, from, next) {
                // 如果登陆了还想登录, 那么就重定向到主页
                const store = useUserStore();
                if (store.token) {
                    next("/");
                    console.log("登陆了还想登录, 那么就重定向到主页");
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

    // 如果未登录且要去有权限的路由, 那么就跳转到登录
    const pattern = /pay|center|trade/;

    if (pattern.test(to.path) && !store.token) {
        // 如果包含了上述关键词, 那么就跳转到登陆界面
        next(`/login?redirect=${to.path}`);
    } else next();
});
export default router;
