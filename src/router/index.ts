import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/index.vue";
import searchView from "../views/search/index.vue";
import detailView from "../views/Detail/index.vue";
import addCartView from "../views/addCart/index.vue";

import registerView from "../views/Register/index.vue";
import loginView from "../views/Login/index.vue";
import shopCartView from "../views/ShopCart/index.vue";

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

export default router;
