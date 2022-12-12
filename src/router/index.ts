import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import searchView from "../views/search.vue";
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
            path: "/search/:kw?",
            name: "search",
            component: searchView,
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
});

export default router;
