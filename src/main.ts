import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/assets/reset.css";

import "nprogress/nprogress.css";
import "@/mock/mockServe";
// 全局组件
import typeNavVue from "@/components/type-nav/index.vue";
import pagination from "@/components/pagination/index.vue";

import VueLazyLoad from "vue3-lazyload";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueLazyLoad, {
    loading: "../../assets/loading.png",
});
// 注册全局组件
app.component("typeNavVue", typeNavVue);
app.component("pagination", pagination);
app.mount("#app");
