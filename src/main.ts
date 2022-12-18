import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/assets/reset.css";
import "nprogress/nprogress.css";

// 全局组件
import typeNavVue from "@/components/type-nav/index.vue";
const app = createApp(App);

app.use(createPinia());
app.use(router);
// 注册全局组件
app.component("typeNavVue", typeNavVue);
app.mount("#app");
