import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/index.vue";
import searchView from "../views/search/index.vue";
import detailView from "../views/Detail/index.vue";

import registerView from "../views/register.vue";
import loginView from "../views/login.vue";

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
        },
    ],
    scrollBehavior(to, from, savePostilion) {
        return {
            top: 0,
        };
    },
});

export default router;
